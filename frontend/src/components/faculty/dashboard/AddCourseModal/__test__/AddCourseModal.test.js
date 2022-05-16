import AddCourseModal from "../index.js";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

describe("AddCourseModal", () => {
	// Unit Test 1
	test("should be able to type course code", () => {
		render(<AddCourseModal />);
        const inputElement=screen.getByPlaceholderText(/Enter course code/i)
        fireEvent.change(inputElement,{target:{value:"19CSE314"}})
		expect(inputElement.value).toBe("19CSE314");
	});


    test("should be able to type course name", () => {
		render(<AddCourseModal />);
        const inputElement=screen.getByPlaceholderText(/Enter course name/i)
        fireEvent.change(inputElement,{target:{value:"Software Engineering"}})
		expect(inputElement.value).toBe("Software Engineering");
	});


    test("should be able to type department", () => {
		render(<AddCourseModal />);
        const inputElement=screen.getByPlaceholderText(/Enter department/i)
        fireEvent.change(inputElement,{target:{value:"CSE"}})
		expect(inputElement.value).toBe("CSE");
	});

    test("should be able to enter Min. cap", () => {
		render(<AddCourseModal />);
        const inputElement=screen.getByPlaceholderText(/Enter Minimum cap/i)
        fireEvent.change(inputElement,{target:{value:"30"}})
		expect(inputElement.value).toBe("30");
	});
    
    test("should be able to Enter max. cap", () => {
		render(<AddCourseModal />);
        const inputElement=screen.getByPlaceholderText(/Enter Maximum cap/i)
        fireEvent.change(inputElement,{target:{value:"40"}})
		expect(inputElement.value).toBe("40");
	});
    
    test("should be able to type credits", () => {
		render(<AddCourseModal />);
        const inputElement=screen.getByPlaceholderText(/Enter credits/i)
        fireEvent.change(inputElement,{target:{value:"3"}})
		expect(inputElement.value).toBe("3");
	});
    
    test("should be able to enter minimum cgpa", () => {
		render(<AddCourseModal />);
        const inputElement=screen.getByPlaceholderText(/Enter minimum CGPA/i)
        fireEvent.change(inputElement,{target:{value:"7"}})
		expect(inputElement.value).toBe("7");
	});

    

   


});
