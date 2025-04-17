
# TrackEat![Screenshot 2025-04-17 150912](https://github.com/user-attachments/assets/795c6244-53f4-4df4-9eab-3971351d5bff)


TrackEat is a web application designed to help users plan healthy meals based on their daily nutritional needs. The platform offers personalized meal recommendations, a calorie tracker, and a meal scheduler to assist users in maintaining a balanced diet and achieving their health goals.

## Features

- **Calorie & BMI Calculators**: Calculates the user's daily calorie requirements and Body Mass Index (BMI) to offer personalized nutrition recommendations.
- **Meal Finder**: Provides a wide selection of meal options from a database to help users plan their meals.
- **Meal Schedule**: Allows users to create daily or weekly meal schedules, synced with Google Calendar for reminders and tracking.
- **Calorie Tracker**: Tracks the number of calories consumed throughout the day and helps users stay on track with their diet goals.
- **Recipe Maker**: Simplifies meal planning by allowing users to group frequently used ingredients into recipe sets for easier tracking.

## Folder Structure

- **client**: This folder contains the front-end code, built using React. It includes all the user interface components, pages, and state management for interacting with the application.

- **server**: This folder contains the back-end code, built using Node.js. It handles the application logic, database interactions, and API routes for serving data to the front-end.

## How to Use

### Running the Code

1. To view the core features, such as calorie calculation and meal scheduling, navigate to the `client` folder for the React app, and the `server` folder for the back-end code (Node.js). You will need to set up both the front-end and back-end for full functionality.

2. To run the application:
    - First, go to the `server` folder and install the required dependencies with:
      ```bash
      npm install
      ```
    - Then, navigate to the `client` folder, and install the front-end dependencies:
      ```bash
      npm install
      ```
    - After that, you can start the back-end server with:
      ```bash
      nodemon main.js
      ```
    - And run the React front-end with:
      ```bash
      npm start
      ```
    This will run both the client and server locally for development.

3. The application uses PostgreSQL as the database. If you need access to the data or have questions, please request it by sending an email to **jonathantjahjana@gmail.com**.

### Requirements

- **Node.js** and **npm** for setting up the server and dependencies.
- **React** for the front-end development.
- **PostgreSQL** for data storage.
- Required Node.js libraries: `express`, `pg`, `cors`, `dotenv`, etc.
- React libraries: `react`, `react-dom`, `react-router-dom`, etc.
