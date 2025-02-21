# Telex Wordle

This is a Node.js/Express application that integrates with Telex. Telex Wordle provides the wordle of the day on user's request.

## Prerequisites

- Node.js 
- npm (Node Package Manager)

## Installation

1. Fork the repository.
2. Clone the repository.
  ```bash
  git clone https://github.com/your_username/telex_wordle.git
  ```
3. Install dependencies:

   ```bash
   npm install
   ```


## Running the Application

To run the application:

```bash
  node index.js
```

The server will start on the port specified.

## API Endpoints

### POST /webhook

Receives messages from Telex channels. The endpoint expects a JSON payload with the following structure:

```json
{
  "channel_id": "string",
  "settings": [
   {
        "label": "Provide Answer",
        "type": "text",
        "required": true,
        "default": "No"
  }
  ],
  "message": "string"
}
```
User's input is contained in "message". If the user sends a random text, they would get a reply saying 'To see the wordle of the day, enter 'wordle' in the chat box'.
If they input 'wordle', they would receive a response saying 'The wordle of the day is: word'

#### Process
A request is made to the Wordle API hitting the API's endpoint /answer and the word is extracted from the response, then sent back to telex
```json
  {
    "status": "success",
    "message": "The wordle of the day is: ${word}"
  }
```
or 
```json
  {
    "status": "success",
    "message": "To see the wordle of the day, enter 'wordle' in the chat box"
  }
```
Depending on user input.



### GET /integration

Returns the integration configuration for Telex. Use this configuration to set up your integration in the Telex dashboard.

## Features
- **Integration with Wordle API:** Gets wordle of the day from https://wordle-api-kappa.vercel.app
- **CORS Support:** Allows cross-origin requests to ease integration.


## Testing

+ Tested the integration on Telex App

![Screenshot from 2025-02-21 20-35-32](https://github.com/user-attachments/assets/79af92e4-8c61-420c-94e1-387897ec8f20)

![Screenshot from 2025-02-21 20-35-36](https://github.com/user-attachments/assets/fcc7ed9b-2e56-491f-b2bd-c7830e5133ee)

![Screenshot from 2025-02-21 20-35-40](https://github.com/user-attachments/assets/1fa82bf1-a981-4f0b-aacc-31392d7a66dc)

+ Wrote unit tests
![Screenshot from 2025-02-21 22-20-48](https://github.com/user-attachments/assets/e033a0ea-165a-4940-9438-0155d59acc85)




## Deployment
The Integration was deployed on Vercel and Telex




