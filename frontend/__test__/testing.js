import { render, screen, fireEvent } from '@testing-library/react';
import login from "../login"
import { BrowserRouter } from "react-router-dom"

const MockTodo = () => {
    return (
        <BrowserRouter>
          <dashboard/>
        </BrowserRouter>
    )
}
//Integration tests
const addTask = (tasks) => {
    const inputElement = screen.getByPlaceholderText(/Email/i);
    const inputElement2 = screen.getByPlaceholderText(/Password/i);
    const buttonElement = screen.getByRole("button", { name: /Sign In/i} );
    tasks.forEach((task) => {
        fireEvent.change(inputElement, { target: { value: task } });
        fireEvent.click(buttonElement);
        fireEvent.change(inputElement2, { target: { value: task } });
        fireEvent.click(buttonElement);
        expect(screen.getByRole('alert')).toHaveTextContent('Invalid Credentials!')
    })


    const buttonElement2= screen.getByRole("button", { name: /Log Out/i} );
    tasks.forEach((task) => {
        fireEvent.change(inputElement, { target: { value: task } });
        fireEvent.click(buttonElement2);
       
    })
    class StopWatch extends React.Component {
        state = {lapse: 0, running: false}
        handleRunClick = () => {
          this.setState(state => {
            if (state.running) {
              clearInterval(this.timer)
            } else {
              const startTime = this.timer.now() - this.state.lapse
              this.timer = setInterval(() => {
                this.setState({lapse: this.timer.now() - startTime})
              })
            }
            return {running: !state.running}
          })
        }

      }
      

    
}

