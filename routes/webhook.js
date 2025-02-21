const express = require("express");
const axios = require("axios");
const { JSDOM } = require("jsdom");

const router = express.Router();
const API_URL = "https://wordle-api-kappa.vercel.app";

router.post("/webhook", async (req, res) => {
	try {
		const wordle = "wordle";
		const htmlString = req.body.message;

		const dom = new JSDOM(htmlString);

		const textContent = dom.window.document.body.textContent.trim();

		if (textContent === wordle) {
			const response = await axios.get(`${API_URL}/answer`);
			const word = response.data.word;
			res.json({
				status: "success",
				message: `The wordle of the day is: ${word}`,
			});
		} else {
			res.json({
				status: "success",
				message:
					"To see the wordle of the day, enter 'wordle' in the chat box",
			});
		}
	} catch (err) {
		console.error("Error fetching answer:", err.message);
		res.status(500).json({ error: "Failed to fetch Wordle answer" });
	}
});

module.exports = router;
