import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 4000;

app.use(cors());

const API_URL = "https://wordle-api-kappa.vercel.app";

app.use(express.json()); // Ensures JSON parsing for incoming requests

let word = "";

const integrationSpec = {
	"data": {
	  "date": {
		"created_at": "2025-02-20",
		"updated_at": "2025-02-20"
	  },
	  "descriptions": {
		"app_name": "Telex Wordle",
		"app_description": "A wordle integration for Telex",
		"app_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRRVxPRCAc6HBRl_tR-aMkrCUHZq45ChY_RiwkzwqdF0T8IO52m3Yb9yvp1jjlpyyzVS0&usqp=CAU",
		"app_url": "https://telex-wordle.vercel.app/",
		"background_color": "#fff"
	  },
	  "is_active": true,
	  "integration_type": "modifier",
	  "integration_category": "Communication & Collaboration",
	  "key_features": [
		"Retrieves Today's Wordle"
	  ],
	  "author": "Afebu Balogun",
	  "settings": [
		{
		  "label": "Provide Answer",
		  "type": "text",
		  "required": true,
		  "default": "No"
		}
	  ],
	  "target_url": "https://telex-wordle.vercel.app/webhook",
	  "endpoints": [
		{
			"path": "/webhook",
			"method": "POST",
			"description": "Default endpoint"
		},
		{
			"path": "/test",
			"method": "POST",
			"description": "test endpoint"
		}
	  ]
	}
  }

// Endpoint to check a Wordle guess
app.post("/wordle", async (req, res) => {
	try {
		const { guess } = req.body;

		if (!guess || typeof guess !== "string") {
			return res
				.status(400)
				.json({ error: "Invalid guess. Must be a string." });
		}

		const targetUrl = `${API_URL}/${guess}`;

		const response = await axios.post(
			targetUrl,
			{},
			{
				// Empty body (API expects guess in URL)
				headers: { "Content-Type": "application/json" },
			}
		);

		res.json(response.data); // Send back the Wordle API response
	} catch (err) {
		console.error("Error making request:", err.message);
		res.status(500).json({ error: "Failed to fetch Wordle API" });
	}
});

// Get today's Wordle answer
app.get("/wordle/answer", async (req, res) => {
	try {
		const response = await axios.get(`${API_URL}/answer`);
		word = response.data.word;
		res.json(response.data);
	} catch (err) {
		console.error("Error fetching answer:", err.message);
		res.status(500).json({ error: "Failed to fetch Wordle answer" });
	}
});

app.post('/webhook', async (req, res) => {
	try {
		const prompt = req.body.message;
		console.log(prompt);
		const response = await axios.get(`${API_URL}/answer`);
		word = response.data.word;
		res.json({ status:"success", message:`The wordle of the day is: ${word}` });
	} catch (err) {
		console.error("Error fetching answer:", err.message);
		res.status(500).json({ error: "Failed to fetch Wordle answer" });
	}
});

app.post("/test", async (req, res) => {
	res.json ({ status:"success", message:`${req.body}`});
});

app.get("/integration", async (req, res) => {
	res.json(integrationSpec);
});

// Start server
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
