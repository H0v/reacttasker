import React from "react";
import "../styles/styles.css";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  handleChange = (event) =>  {
    // debugger;
    this.setState({ value: event.target.value });
  }
  
  handleKeyDown = (event) => {
    if(event.key === "Enter"){
      // console.log('it works');
      this.handleSubmit();
    }
  }

  handleSubmit = () => {
    console.log(this.state.value + 1);
    // debugger;
    let currentValue = this.state.value;
        currentValue = currentValue.replace(/\s\s+/g, ' ').trim();

    // currentValue = currentValue.trim();
    // debugger;
    console.log(currentValue);
    if(currentValue !== ""){
      this.props.addNewTask(currentValue);
      this.setState({
        value: ""
      });
    }
  }

  render() {
    return (
      <>
        <div className="inputBox">
          <input
            // id ="mainInput"
            onKeyDown={this.handleKeyDown}
            onChange={e => this.handleChange(e)}
            placeholder="Type your task"
          />
          <button className="addButton" onClick={this.handleSubmit}> Add </button>
        </div>
      </>
    );
  }
}

export default Input;
