# DuckMail Frontend

Below are instructions on how to properly configure and run the frontend for DuckMail.

## Development
For running the frontend for development purposes, run the following commands:
```bash
cd ./frontend
npm install
npm run dev
```
Then edit line 1 of ./src/services/api.ts to set the proper port that you have the backend express server running on:
```js
const API_URL = 'http://localhost:BACKEND_PORT_HERE/api';
```

## Production
To build a production version of the frontend for deployment, run the following command:
```bash
npm run build
```
Then edit line 1 of ./src/services/api.ts to set the proper url that you have the backend express server running on:
```js
const API_URL = 'http://BACKEND_URL_HERE:BACKEND_PORT_HERE/api';
```
