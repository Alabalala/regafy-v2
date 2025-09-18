import { validateAnswerForm } from "./validateAnswerForm";
import { describe, it, expect } from "vitest";

describe("validateAnswerForm", () => {
	it("returns success true for valid input", () => {
		const okValue = "This is a correct input";

		const result = validateAnswerForm(okValue);

		expect(result.success).toBe(true);
	});

	it("returns success false for invalid input", () => {
		const badValue = "a";

		const result = validateAnswerForm(badValue);

		expect(result.success).toBe(false);

		if (!result.success) {
			expect(result.errors).toBeDefined();
		}
	});
});
