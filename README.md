# laith-ajjan-brainflix-api
# Brainstation Web Development Bootcamp

This is an Express Node.js server for the Brainstation Web Development Bootcamp. The server provides a RESTful API for managing video data.

## API Endpoints

The server provides the following endpoints:

- `GET /`: Returns the Express Homepage
- `GET /videos`: Returns a list of all videos
- `GET /videos/:videoId`: Returns a specific video by ID
- `POST /videos`: Creates a new video

## How to Test Endpoints Using Postman

You can test the endpoints using Postman by following these steps:

1. Install [Postman](https://www.postman.com/downloads/).
2. Open Postman.
3. Select the desired HTTP method (GET or POST) from the dropdown menu.
4. Enter the endpoint URL (e.g., `http://localhost:8080/videos`) in the address bar.
5. For POST requests, click the 'Body' tab, select 'raw' and choose 'JSON' as the format. Then, enter the JSON data for the new video.
6. Click 'Send' to make the request.

## How to Run the Server

To run the server, follow these steps:

1. Install [Node.js](https://nodejs.org/en/download/) if not already installed.
2. Open a terminal or command prompt.
3. Navigate to the project directory containing `index.js`.
4. Run `npm install` to install the required dependencies.
5. Run `node index.js` to start the server.
6. The server should now be running on `http://localhost:8080`.
