# My Backend Server

This project is a backend server built with Node.js and Express that utilizes the Google Generative AI service to generate content based on user prompts.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-backend-server
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Google Generative AI API key:
   ```
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

## Usage

To start the server, run the following command:
```
npm start
```
The server will run on `http://localhost:5000`.

## API Endpoints

- **POST** `/api/generate`
  - Generates content based on the provided prompt.
  - Request body:
    ```json
    {
      "prompt": "Your prompt here"
    }
    ```
  - Response:
    ```json
    {
      "result": "Generated content here"
    }
    ```

- **GET** `/api/models`
  - Lists available models from the Google Generative AI service.
  - Response:
    ```json
    {
      "models": ["model1", "model2", ...]
    }
    ```

## Environment Variables

Make sure to set the following environment variable in your `.env` file:
- `GOOGLE_GENAI_API_KEY`: Your API key for Google Generative AI.

## License

This project is licensed under the MIT License.