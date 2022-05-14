import ControlBar from "../index.js";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Control Bar - student ", () => {
	// Unit Test 1 - Positive test case
	test("Checks if Logout Button is present", () => {
		render(<ControlBar />);
		expect(screen.getByText("Logout")).toBeInTheDocument();
	});
	// Unit Test 2 - Negative test case
	test("Checks if Login Button is not present", () => {
		render(<ControlBar />);
		expect(screen.queryByText("Login")).not.toBeInTheDocument();
	});

	// Unit Test 3 - Positive test case
	test("Checks if student's cgpa is displayed", () => {
		render(<ControlBar user={{ cgpa: 8 }} />);
		expect(screen.getByTestId("cgpa").textContent).toEqual(
			"Your CGPA: 8"
		);
	});
});
