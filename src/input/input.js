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
    // JSON.parse(localStorage.getItem("tasks")).length === 0 ? "displayNone" : "checkAllButton" 
    return (
      <>
      <div className = "title">
      <span>tasker</span>
      </div>
        <div className="inputBox">
          <div className="checkAllDiv">
          <button className={this.props.selectAllClassname}onClick={this.props.selectAll}>&#10003;</button>
          </div>
          <input
            // id ="mainInput"
            value={this.state.value}
            onKeyDown={this.handleKeyDown}
            onChange={e => this.handleChange(e)}
            placeholder="Type your task"
            className="mainInput"
          />
          <button className="addButton" onClick={this.handleSubmit}> Add </button>
        </div>
      </>
    );
  }
}

export default Input;
