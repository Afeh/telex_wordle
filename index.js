import express from "express";
import axios from "axios";

const app = express();
const port = 4000;

const API_URL = "https://wordle-api-kappa.vercel.app";

app.use(express.json()); // Ensures JSON parsing for incoming requests

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
		res.json(response.data);
	} catch (err) {
		console.error("Error fetching answer:", err.message);
		res.status(500).json({ error: "Failed to fetch Wordle answer" });
	}
});

// Start server
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
