import React, { Component } from 'react';
import "../Style/style.css"

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            value :""
         }
    }

    handleChange(e){
        this.setState(state => { value : e.target.value});
        console.log(this.state.value)
    }

    render() { 
        return (  
            <>
            <div className="inputBox">
                <input onChange={e => this.handleChange(e)} placeholder="Type your task"/>
            <div className="addButton">Add</div>
            </div>
            </>               
        );
    }
}
 
export default Input;