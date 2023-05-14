# Expense App

This is a full-stack application that consists of a Laravel-based API backend and a Next.js-based frontend.

## Setup

1. Clone this repository
2. Run `docker compose up` from the root directory of the project
3. The frontend will be accessible on `http://localhost:3000`
4. The backend API will be running on `http://localhost:8000`
5. To access the Swagger API documentation, go to `http://localhost:8000/api/swagger`
6. Sign up to add a user and obtain an access token. You can then use this token to authenticate requests to the API.
7. You can now make requests to the categories and expenses resources.

## Future Modifications

- Add seeds for the user, categories, and expenses
- Add "forgot password" functionality to the login
- Add Google login
- Add unit tests for Laravel and export them in a separate Docker container
- Refactor the controllers and export some of the logic to a utility class