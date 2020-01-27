import React from "react";
import Input from "../input/input";

class Tasks extends React.Component {
  constructor(props) {
    super(props);

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    this.state = {
      tasks,
      taskId
    };
  }

  addNewTask = value => {
    this.setState(
      state => ({
        tasks: [
          ...state.tasks,
          { id: state.taskId, title: value, isCompleted: false }
        ],
        taskId: state.taskId + 1
      }),
      () => {
        localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
        console.log(this.state.tasks);
      }
    );
  };

  toggleStyle = currentId => {
    //   debugger;
    this.setState(
      state => ({
        tasks: state.tasks.map(task =>
          task.id === currentId
            ? { ...task, isCompleted: !task.isCompleted }
            : task
        )
      }),

      () => {
        localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
      }
    );
  };

  render() {
    const currentTasks = this.state.tasks;
    return (
      <>
        <Input addNewTask={this.addNewTask} />
        <ul className="ulContainer">
          {console.log(this.state.tasks)}
          {currentTasks.map(({ title, id, isCompleted }) => (
            <li key={`${title}_${id}`}>
              <div className="divContainer">
                <div className="checkBoxContainer">
                  <input type="checkbox" id={`checkbox-${id}`} />
                  <label htmlFor={`checkbox-${id}`}>
                    <div className="textContainer">
                      <span
                        className={isCompleted ? "checked" : "unchecked"}
                        onClick={() => this.toggleStyle(id)}
                      >
                        {title}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Tasks;
