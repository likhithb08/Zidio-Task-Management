# Zidio Task Management

## Description

Zidio Task Management is a web application designed to help users efficiently manage their tasks. This project is built using Node.js and follows a structured MVC architecture.

## Features

- User authentication (Sign-in & Sign-out functionality)
- Task creation, update, and deletion
- Middleware for security and validation
- Database integration

## Project Structure

```
├── config/            # Configuration files
├── controllers/       # Controller functions handling requests
├── database/          # Database connection setup
├── middlewares/       # Custom middleware for authentication & validation
├── models/            # Database models
├── routes/            # API routes
├── .gitignore         # Files ignored by Git
├── README.md          # Project documentation
├── app.js             # Main application entry point
├── eslint.config.js   # ESLint configuration
├── package-lock.json  # Dependency lock file
├── package.json       # Project dependencies & metadata
```

## Installation

1. Clone the repository:
   ```sh
  (https://github.com/likhithb08/Zidio-Task-Management.git)
   ```
2. Navigate to the project directory:
   ```sh
   cd Zidio-Task-Management
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up the environment variables in `config/Env.js`.

## Usage

1. Start the server:
   ```sh
   npm run dev
   ```
2. The application runs on `http://localhost:3000/` by default.

## Contributing

If you want to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any queries, reach out to:

- **GitHub:** [likhithb08](https://github.com/likhithb08)

