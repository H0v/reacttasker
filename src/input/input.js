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
      this.handleSubmit();
    }
  }

  handleSubmit = () => {
    let currentValue = this.state.value;
        currentValue = currentValue.replace(/\s\s+/g, ' ').trim();
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
        <button onClick={this.props.selectAll}>&#10540;</button>
          <input
            // id ="mainInput"
            value={this.state.value}
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
