import express from 'express';
import pool from '../db.js';
import axios from 'axios';
import accessValidation from './middleware.js';
import { oauth2Client } from '../oauthConfig.js';
import {google} from 'googleapis';

const router = express.Router();

async function createCalendar(refreshToken, calendarName) {
    try {
        // Set credentials menggunakan refresh_token
        oauth2Client.setCredentials({
            refresh_token: refreshToken
        });

        // Refresh token akses jika diperlukan
        const newTokens = await oauth2Client.refreshAccessToken();
        oauth2Client.setCredentials(newTokens.credentials);

        // Buat kalender baru
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        const response = await calendar.calendars.insert({
            requestBody: {
                summary: calendarName, // Nama kalender (TrackEat)
                timeZone: 'Asia/Jakarta', // Sesuaikan dengan timezone yang diinginkan
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error creating calendar:', error);
        throw error;
    }
}

async function getCalendarId(refreshToken, calendarName) {
    try {
        // Set credentials menggunakan refresh_token
        oauth2Client.setCredentials({
            refresh_token: refreshToken
        });

        // Refresh token akses jika diperlukan
        const newTokens = await oauth2Client.refreshAccessToken();
        oauth2Client.setCredentials(newTokens.credentials);

        // Dapatkan daftar kalender pengguna
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        const response = await calendar.calendarList.list();

        // Cari kalender dengan nama yang sesuai
        const trackEatCalendar = response.data.items.find(
            (cal) => cal.summary === calendarName
        );

        if (trackEatCalendar) {
            return trackEatCalendar.id; // Kembalikan calendarId jika ditemukan
        } else {
            // Jika kalender tidak ditemukan, buat kalender baru
            const newCalendar = await createCalendar(refreshToken, calendarName);
            return newCalendar.id; // Kembalikan calendarId dari kalender baru
        }
    } catch (error) {
        console.error('Error getting calendar ID:', error);
        throw error;
    }
}

async function addEventToCalendar(refreshToken, calendarId, event) {
    try {
        // Set credentials menggunakan refresh_token
        oauth2Client.setCredentials({
            refresh_token: refreshToken
        });

        // Refresh token akses jika diperlukan
        const newTokens = await oauth2Client.refreshAccessToken();
        oauth2Client.setCredentials(newTokens.credentials);

        // Tambahkan acara ke kalender
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        const response = await calendar.events.insert({
            calendarId: calendarId, // Gunakan calendarId dari TrackEat
            resource: event,
        });

        return response.data;
    } catch (error) {
        console.error('Error adding event to calendar:', error);
        throw error;
    }
}

async function addScheduleEventsToCalendar(refreshToken, schedule) {
    try {
        const calendarName = 'TrackEat';
        const calendarId = await getCalendarId(refreshToken, calendarName);

        const days = [
            { name: 'monday', code: 'MO' },
            { name: 'tuesday', code: 'TU' },
            { name: 'wednesday', code: 'WE' },
            { name: 'thursday', code: 'TH' },
            { name: 'friday', code: 'FR' },
            { name: 'saturday', code: 'SA' },
            { name: 'sunday', code: 'SU' },
        ];

        // Loop melalui setiap hari
        for (const day of days) {
            if (schedule[day.name]) { // Cek apakah hari ini aktif
                // Loop melalui setiap section di schedule
                for (const section of schedule.sections) {
                    if (section.active) {
                        const formattedTime = section.time.split(':').slice(0, 2).join(':');

                        // Hitung tanggal mulai berdasarkan hari yang aktif
                        const today = new Date();
                        const targetDay = days.findIndex(d => d.name === day.name); // Index hari target (0 untuk Senin, 1 untuk Selasa, dst)
                        const currentDay = today.getDay() - 1; // getDay() mengembalikan 0 untuk Minggu, 1 untuk Senin, dst
                        const daysToAdd = (targetDay - currentDay + 7) % 7; // Hitung selisih hari

                        const startDate = new Date(today);
                        startDate.setDate(today.getDate() + daysToAdd); // Set tanggal mulai ke hari yang benar

                        const event = {
                            summary: section.name,
                            description: `Makanan: ${section.foods.map(food => food.name).join(', ')}`, // Deskripsi tanpa section.id
                            start: {
                                dateTime: `${startDate.toISOString().split('T')[0]}T${formattedTime}:00`,
                                timeZone: 'Asia/Jakarta',
                            },
                            end: {
                                dateTime: `${startDate.toISOString().split('T')[0]}T${formattedTime}:30`,
                                timeZone: 'Asia/Jakarta',
                            },
                            recurrence: [
                                `RRULE:FREQ=WEEKLY;BYDAY=${day.code}`,
                            ],
                            extendedProperties: {
                                private: {
                                    sectionId: section.id.toString(), // Simpan section.id di extendedProperties
                                },
                            },
                            reminders: {
                                useDefault: false, // Nonaktifkan reminder default
                                overrides: [
                                    { method: 'popup', minutes: 30 }, // Notifikasi popup 30 menit sebelum event
                                ],
                            },
                        };

                        await addEventToCalendar(refreshToken, calendarId, event);
                    }
                }
            }
        }

        console.log('Events added to Google Calendar successfully.');
    } catch (error) {
        console.error('Error adding events to Google Calendar:', error);
        throw error;
    }
}

router.post('/add-meal', accessValidation, async (req, res) => {
    try {
        const userId = req.userData.id; // Dapatkan ID pengguna dari token JWT
        const { scheduleId, token } = req.body; // Ambil scheduleId dari request body

        // Dapatkan refresh_token dari database
        const user = await pool.query(
            `SELECT refresh_token FROM users WHERE id = $1`, [userId]
        );

        if (user.rowCount === 0 || !user.rows[0].refresh_token) {
            return res.status(404).json({ error: 'User not found or refresh token not available' });
        }

        const refreshToken = user.rows[0].refresh_token;

        // Ambil data schedule dari endpoint /schedule/detail/:id
        const scheduleResponse = await axios.get(`http://localhost:3000/schedule/detail/${scheduleId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const schedule = scheduleResponse.data;

        // Tambahkan event ke Google Calendar
        await addScheduleEventsToCalendar(refreshToken, schedule);

        res.status(200).json({ message: 'Meal events created successfully' });
    } catch (error) {
        console.error('Error adding meal events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function deleteScheduleEventsFromCalendar(refreshToken, schedule) {
    try {
        const calendarName = 'TrackEat';
        const calendarId = await getCalendarId(refreshToken, calendarName);

        const days = [
            { name: 'monday', code: 'MO' },
            { name: 'tuesday', code: 'TU' },
            { name: 'wednesday', code: 'WE' },
            { name: 'thursday', code: 'TH' },
            { name: 'friday', code: 'FR' },
            { name: 'saturday', code: 'SA' },
            { name: 'sunday', code: 'SU' },
        ];

        // Loop melalui setiap hari
        for (const day of days) {
            if (schedule[day.name]) { // Cek apakah hari ini aktif
                // Loop melalui setiap section di schedule
                for (const section of schedule.sections) {
                    // Cari event berdasarkan section.id di extendedProperties
                    const events = await google.calendar({ version: 'v3', auth: oauth2Client }).events.list({
                        calendarId: calendarId,
                        privateExtendedProperty: `sectionId=${section.id}`, // Cari event berdasarkan section.id
                        singleEvents: false, // Cari parent event (bukan instance recurrence)
                    });

                    // Hapus parent event
                    for (const event of events.data.items) {
                        if (event.recurrence) { // Pastikan event ini memiliki recurrence rule
                            await google.calendar({ version: 'v3', auth: oauth2Client }).events.delete({
                                calendarId: calendarId,
                                eventId: event.id,
                            });
                        }
                    }
                }
            }
        }

        console.log('Events deleted from Google Calendar successfully.');
    } catch (error) {
        console.error('Error deleting events from Google Calendar:', error);
        throw error;
    }
}
// POST PUT DELETE GET
router.delete('/remove-meal', accessValidation, async (req, res) => {
    try {
        const userId = req.userData.id; // Dapatkan ID pengguna dari token JWT
        const { scheduleId, token } = req.body; // Ambil scheduleId dari request body

        // Dapatkan refresh_token dari database
        const user = await pool.query(
            `SELECT refresh_token FROM users WHERE id = $1`, [userId]
        );

        if (user.rowCount === 0 || !user.rows[0].refresh_token) {
            return res.status(404).json({ error: 'User not found or refresh token not available' });
        }

        const refreshToken = user.rows[0].refresh_token;

        // Ambil data schedule dari endpoint /schedule/detail/:id
        const scheduleResponse = await axios.get(`http://localhost:3000/schedule/detail/${scheduleId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const schedule = scheduleResponse.data;

        // Hapus event dari Google Calendar
        await deleteScheduleEventsFromCalendar(refreshToken, schedule);

        res.status(200).json({ message: 'Meal events deleted successfully' });
    } catch (error) {
        console.error('Error deleting meal events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;