# MyPhotoProfile

## Description

**MyPhotoProfile** is a full-stack web application designed for managing personal profiles with secure login, photo sharing, and interactive features. The project was developed as part of a full-stack development learning journey, focusing on JWT authentication, responsive design, and cloud deployment.

The project is divided into two main phases:

**Phase I:** Implementation of authentication and authorization with JWT on the back-end and integration with the front-end built in React.  

**Phase II:** Validation, centralized error handling, cloud deployment, and secure domain configuration with HTTPS.

## Technologies & Tools

### Back-End

- **Node.js** – JavaScript runtime environment for server-side development.  
- **Express.js** – Minimalist web framework for building routes and middleware.  
- **MongoDB** – NoSQL database used for storing users and photos.  
- **Mongoose** – ODM for MongoDB, simplifying data modeling.  
- **dotenv** – Loads environment variables from a `.env` file.  
- **bcryptjs** – Library for hashing passwords securely.  
- **jsonwebtoken (JWT)** – Creation and verification of authentication tokens.  
- **cors** – Middleware to enable Cross-Origin Resource Sharing.  
- **validator** – Validation of fields like emails and URLs.

### Front-End

- **React.js** – JavaScript library for building interactive UIs.  
- **React Router DOM** – Front-end routing management.  
- **Context API** – Sharing data such as JWT tokens across components.  
- **localStorage** – Storing JWT tokens in the browser.  
- **Fetch API** – Making requests to the back-end API.  
- **React Hooks (useState, useEffect, etc.)** – State and lifecycle management.

## Features

- Secure JWT authentication and authorization  
- Profile login and personal information management  
- Photo uploading, liking, and deletion  
- Responsive design for desktop and mobile devices  
- Centralized error handling and validation

## Future Improvements

-Adding comments on photos
-Real-time notifications
-Advanced performance optimization and security enhancements

## Installation

Follow these steps to run the project locally:

### 1. Clone the repository

bash
git clone https://github.com/crislaineandrade/web_project_api_full.git
cd web_project_api_full

Back-End
cd backend
npm install

Front-End
cd ../frontend
npm install

### 2. Run the project

### Back-End

cd backend
npm start

### Front-End

cd frontend
npm start

## Link

https://web-project-api-full-5pzkxm71a-crislaineandrades-projects.vercel.app
