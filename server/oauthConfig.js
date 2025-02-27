import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.CALLBACK_URL,
);

const scope = [
    `https://www.googleapis.com/auth/userinfo.email`,
    `https://www.googleapis.com/auth/userinfo.profile`,
    `https://www.googleapis.com/auth/calendar`, // Scope untuk Google Calendar API
    `https://www.googleapis.com/auth/calendar.events`,
];

const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scope,
    include_granted_scopes: true,
});

export { oauth2Client, authorizationUrl };