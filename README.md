# Expense App

This is a full-stack application that consists of a Laravel-based API backend and a Next.js-based frontend.

## Setup

-  Clone this repository
-  make sure you have php and composer installed on your machine
- Run `cd backend && composer install`
- go to the root and run `cd frontend && npm install && npm run build` 
- Run `docker compose up --build` from the root directory of the project
- The frontend will be accessible on `http://localhost:3000`
- The backend API will be running on `http://localhost:8000`
- To access the Swagger API documentation, go to `http://localhost:8000/api/swagger`
- Sign up to add a user and obtain an access token. You can then use this token to authenticate requests to the API.
- You can now make requests to the categories and expenses resources.

## Future Modifications

- Add seeds for the user, categories, and expenses
- Add "forgot password" functionality to the login
- Add Google login
- Add unit tests for Laravel and export them in a separate Docker container
- Refactor the controllers and export some of the logic to a utility class