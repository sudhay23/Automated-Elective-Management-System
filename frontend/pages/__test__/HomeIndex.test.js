import HomeIndex from "../index.js";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Control Bar", () => {
	// Unit Test 1
	test("Checks if title is present", () => {
		render(<HomeIndex />);
		const headingelement=screen.getByText(/Automated Elective Management - CSE-F/i);
		expect(headingelement).toBeInTheDocument();
	});

	test("Checks if main container is present", () => {
		render(<HomeIndex />);
		const role=screen.getByRole("main");
		expect(role).toBeInTheDocument();
	});


	test("testing with testid", () => {
		render(<HomeIndex />);
		const role=screen.getByTestId("header");
		expect(role).toBeInTheDocument();
	});

	test("using async", async() => {
		render(<HomeIndex />);
		const headingelement=await screen.findByText(/Automated Elective Management - CSE-F/i);
		expect(headingelement).toBeInTheDocument();
	});

	test("Checks if text is not present", () => {
		render(<HomeIndex />);
		const headingelement=screen.queryByText(/signup/i);
		expect(headingelement).not.toBeInTheDocument();
	});




});
