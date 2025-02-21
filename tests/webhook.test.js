const request = require("supertest");
const express = require("express");
const axios = require("axios");
const webhookRoute = require("../routes/webhook.js");

// Mock axios
jest.mock("axios");

const app = express();
app.use(express.json());
app.use(webhookRoute); // Attach the webhook route

describe("POST /webhook", () => {
	// Test case: Correct message triggers Wordle API call
	it("should return the wordle of the day when the correct word is provided", async () => {
		// Mock API response
		axios.get.mockResolvedValueOnce({ data: { word: "GUESS" } });

		// Simulate sending a request with "wordle"
		const res = await request(app)
			.post("/webhook")
			.send({ message: "<p>wordle</p>" });

		expect(res.status).toBe(200);
		expect(res.body).toEqual({
			status: "success",
			message: "The wordle of the day is: GUESS",
		});
	});

	// Test case: Incorrect message
	it("should prompt user to enter 'wordle' if input is different", async () => {
		const res = await request(app)
			.post("/webhook")
			.send({ message: "<p>Hey</p>" });

		expect(res.status).toBe(200);
		expect(res.body).toEqual({
			status: "success",
			message:
				"To see the wordle of the day, enter 'wordle' in the chat box",
		});
	});

	// Test case: API call failure
	it("should return an error if fetching the Wordle answer fails", async () => {
		axios.get.mockRejectedValueOnce(new Error("API Error"));

		const res = await request(app)
			.post("/webhook")
			.send({ message: "<p>wordle</p>" });

		expect(res.status).toBe(500);
		expect(res.body).toEqual({
			error: "Failed to fetch Wordle answer",
		});
	});
});
