import Student from "../index.js";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Control Bar", () => {
	// Unit Test 1
	test("CGPA is present", () => {
		render(<Student />);
		const headingelement=screen.getByText(/Your CGPA/i);
		expect(headingelement).toBeInTheDocument();
	});

    test("CGPA is present", () => {
		render(<Student />);
		const headingelement=screen.getByText(/Your CGPA/i);
		expect(headingelement).toBeInTheDocument();
	});



    test("CGPA is present", () => {
		render(<Student />);
		const headingelement=screen.getByText(/Hello/i);
		expect(headingelement).toBeInTheDocument();
	});


})