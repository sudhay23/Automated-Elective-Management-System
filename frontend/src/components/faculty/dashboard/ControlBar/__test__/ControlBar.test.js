import ControlBar from "../index.js";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Control Bar", () => {
	// Unit Test 1
	test("Checks if Add Course Button is present", () => {
		render(<ControlBar />);
		expect(screen.getByText("Add New Course")).toBeInTheDocument();
	});

	// Unit Test 2
	test("Checks if User's name is being greeted", () => {
		render(<ControlBar user={{ name: "Sudhay" }} />);
		expect(screen.getByTestId("user-greeting").textContent).toEqual(
			"Hello, Sudhay"
		);
	});

	test("Checks if Logout Button is present", () => {
		render(<ControlBar />);
		expect(screen.getByText("Logout")).toBeInTheDocument();
	});

	test("Checks if Login Button is not present", () => {
		render(<ControlBar />);
		expect(screen.queryByText("Login")).not.toBeInTheDocument();
	});

});
