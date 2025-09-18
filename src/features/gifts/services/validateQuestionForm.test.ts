import { validateQuestionForm } from "./validateQuestionForm";
import { describe, it, expect } from "vitest";

describe("Validate question form", () => {
	it("returns success when input is ok", () => {
		const okInput = "this is an ok input";

		const result = validateQuestionForm(okInput);
		expect(result.success).toBe(true);
	});

	it("returns false when input is no ok", () => {
		const badInput = "th";
		const result = validateQuestionForm(badInput);

		expect(result.success).toBe(false);

		if (!result.success) {
			expect(result.errors).toBeDefined();
		}
	});
});
