import React from "react";
import Input from "../input/input";

class Tasks extends React.Component {
  constructor(props) {
    super(props);

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    this.state = {
      tasks,
      taskId,
      counter: 0
    };
  }

  addNewTask = value => {
    this.setState(
      state => ({
        tasks: [
          ...state.tasks,
          { id: state.taskId, title: value, isCompleted: false, editing: false }
        ],
        taskId: state.taskId + 1
      }),
      () => {
        localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
        console.log(this.state.tasks);
      }
    );
  };

  clickCount = currentId => {
    this.setState(
      state => ({
        counter: state.counter + 1
      }),
      () => {
        if (this.state.counter === 1) {
          // debugger;
          this.index = setTimeout(() => {
            this.setState(
              state => ({
                tasks: state.tasks.map(task =>
                  task.id === currentId
                    ? {
                        ...task,
                        isCompleted: !task.isCompleted,
                        editing: task.editing
                      }
                    : task
                )
              }),

              () => {
                localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
                this.setState({
                  counter: 0
                });
                // console.log(index);
              }
            );
          }, 400);
        } else if (this.state.counter === 2) {
          clearTimeout(this.index);
          console.log("2 click");
          this.setState(
            state => ({
              tasks: state.tasks.map(task =>
                task.id === currentId
                  ? {
                      ...task,
                      editing: !task.editing
                    }
                  : task
              )
            }),
            () => {
              localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
              this.setState({
                counter: 0
              });
              // console.log(index);
            }
          );
        }
      }
    );
  };

  saveChanging = (currentId,event) => {
    debugger;
    if(event.key === "Enter"){
      debugger;
      this.setState(
        state => ({
          tasks: state.tasks.map(task =>
            task.id === currentId
              ? {
                  ...task,
                  editing: !task.editing
                }
              : task
          )
        }),
        () => {
          debugger;
          localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
        })
    }
  }

  handleChanging = (currentId, event) => {
    // console.log(currentId);
    debugger;
    // console.log(event.target.value);
    let value = event.target.value;
    debugger;
    this.setState(
      state => ({
        tasks: state.tasks.map(task =>
          task.id === currentId
            ? {
                ...task,
                title: value,
                isCompleted: task.isCompleted,
                editing: task.editing
              }
            : task
        )
      }),
      () => {
        this.nameInput.focus();
      }
    );
  };

  // handleChanging = (event) => {
  //   let value = event.target.value;
  //   console.log(value)
  //   this.nameInput.focus();
  // };

  render() {
    const currentTasks = this.state.tasks;
    return (
      <>
        <Input addNewTask={this.addNewTask} />
        <ul className="ulContainer">
          {console.log(this.state.tasks)}
          {currentTasks.map(({ title, id, isCompleted, editing }) => (
            <li key={`${title}_${id}`}>
              <div className="divContainer">
                <div className="checkBoxContainer">
                  <input
                    onClick={() => this.clickCount(id)}
                    type="checkbox"
                    className = {editing ? "checkboxNone":"taskCheckbox"}
                    id={`checkbox-${id}`}
                    checked={isCompleted}
                  />
                  <label htmlFor={`checkbox-${id}`}></label>
                  <div className="textContainer">
                    {editing ? (
                      <input
                        ref={input => {
                          this.nameInput = input;
                        }}
                        className="editing"
                        value={title}
                        onChange={event => this.handleChanging(id, event)}
                        onKeyDown={event => this.saveChanging(id,event)}
                      />
                    ) : (
                      <span
                        className={isCompleted ? "checked" : "unchecked"}
                        onClick={() => this.clickCount(id)}
                      >
                        {title}
                      </span>
                    )}
                  </div>
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
