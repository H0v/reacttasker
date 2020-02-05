import React from "react";
import Input from "../input/input";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    const filter = JSON.parse(localStorage.getItem("filter")) || "all";
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    this.state = {
      tasks,
      taskId,
      counter: 0,
      isAllSelected: false,
      filter
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
      }
    );
  };

  clickCount = currentId => {
    this.setState(
      state => ({
        ...state,
        counter: state.counter + 1
      }),
      () => {
        if (this.state.counter === 1) {
          this.index = setTimeout(() => {
            this.setState({ counter: 0 });
            this.changeStyle(currentId);
          }, 400);
        } else if (this.state.counter === 2) {
          clearTimeout(this.index);
          this.setState({ counter: 0 });
          this.taskEdit(currentId);
        }
      }
    );
  };

  taskEdit = currentId => {
    this.setState(state => ({
      tasks: state.tasks.map(task =>
        task.id === currentId ? { ...task, editing: true } : task
      )
    }));

    setTimeout(() => {
      this.nameInput.focus();
    });
  };

  changeStyle = currentId => {
    this.setState(
      state => ({
        tasks: state.tasks.map(task =>
          task.id === currentId
            ? {
                ...task,
                isCompleted: !task.isCompleted
              }
            : task
        )
      }),
      () => localStorage.setItem("tasks", JSON.stringify(this.state.tasks))
    );
  };

  handleChanging = (currentId, event) => {
    const value = event.target.value;

    this.setState(state => ({
      tasks: state.tasks.map(task =>
        task.id === currentId ? { ...task, title: value } : task
      )
    }));
  };

  saveChanging = (currentId, event) => {
    if (event.key === "Enter") {
      const value = event.target.value.replace(/\s\s+/g, " ").trim();
      console.log(value);
      if (value === "") {
        this.deleteTask(currentId);
      }

      this.setState(
        state => ({
          tasks: state.tasks.map(task =>
            task.id === currentId
              ? {
                  ...task,
                  editing: false
                }
              : task
          )
        }),
        () => localStorage.setItem("tasks", JSON.stringify(this.state.tasks))
      );
    }
  };

  deleteTask = currentId => {
    this.setState(
      state => ({
        ...state,
        tasks: state.tasks.filter(task => task.id !== currentId)
      }),
      () => {
        localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
      }
    );
  };

  selectAll = () => {
    this.setState(
      state => ({
        ...state,
        isAllSelected: !state.isAllSelected
      }),
      () => {
        this.setState(
          state => ({
            ...state,
            tasks: state.tasks.map(task => ({
              ...task,
              isCompleted: state.isAllSelected
            }))
          }),
          () => localStorage.setItem("tasks", JSON.stringify(this.state.tasks))
        );
      }
    );
  };

  clearCompletedTasks = () => {
    this.setState(
      state => ({
        ...state,
        tasks: state.tasks.filter(task => task.isCompleted !== true)
      }),
      () => localStorage.setItem("tasks", JSON.stringify(this.state.tasks))
    );
  };

  showCompleted = () => {
    this.setState(state => ({
      ...state,
      filter: "completed"
    }));
  };

  showAll = () => {
    this.setState(state => ({
      ...state,
      filter: "all"
    }));
  };
  showActives = () => {
    this.setState(state => ({
      ...state,
      filter: "active"
    }));
  };

  render() {
    localStorage.setItem("filter", JSON.stringify(this.state.filter));
    let currentTasks = this.state.tasks;
    if (this.state.filter === "completed") {
      currentTasks = this.state.tasks.filter(task => task.isCompleted === true);
    } else if (this.state.filter === "all") {
      currentTasks = this.state.tasks;
    } else if (this.state.filter === "active") {
      currentTasks = this.state.tasks.filter(
        task => task.isCompleted === false
      );
    }
    return (
      <>
        <div className="contentBox">
          <Input selectAllClassname={this.state.tasks.length === 0 ? "displayNone" : "checkAllButton" } selectAll={this.selectAll} addNewTask={this.addNewTask} />
          <ul className="ulContainer">
            {currentTasks.map(({ title, id, isCompleted, editing }) => (
              <li key={`key-${id}`}>
                <div className="divContainer">
                  <div className="checkBoxContainer">
                    <input
                      onClick={() => this.clickCount(id)}
                      type="checkbox"
                      checked={isCompleted}
                      className={editing ? "checkboxNone" : "taskCheckbox"}
                      id={`checkbox-${id}`}
                    />
                    <label htmlFor={`checkbox-${id}`}></label>
                    </div>
                      {editing ? (
                    <div className="textContainer">
                        <input
                          ref={input => {
                            this.nameInput = input;
                          }}
                          className="editing"
                          value={title}
                          onChange={event => this.handleChanging(id, event)}
                          onKeyDown={event => this.saveChanging(id, event)}
                        />
                        </div>
                      ) : (
                        <>
                    <div className="textContainer">
                          <span
                            className={isCompleted ? "checked" : "unchecked"}
                            onClick={() => this.clickCount(id)}
                          >
                            {title}
                          </span>
                     </div>     
                          <div className="delButtonContainer">
                            <span
                              className="delButton"
                              onClick={() => this.deleteTask(id)}
                            >
                              &times;
                            </span>
                          </div>
                        </>
                      )}
                </div>
              </li>
            ))}
          </ul>
          <div className={this.state.tasks.length === 0 ? "displayNone" : "filterFooter"}>
            <div className="leftItems">
              <p>
                {
                  this.state.tasks.filter(task => task.isCompleted === false).length === 1 ? ("1 item left") : (this.state.tasks.filter(task => task.isCompleted === false).length + " items left")
                } 
              </p>
            </div>
            <div className="filters">
              <button className={"filterButton" + ( this.state.filter === "all"?" filterFocus": "")} onClick={() => this.showAll()}>
                All
              </button>
              <button
                className={"filterButton" + ( this.state.filter === "active"?" filterFocus": "")}
                onClick={() => this.showActives()}
              >
                Active
              </button>
              <button
                className={"filterButton" + ( this.state.filter === "completed"?" filterFocus": "")}
                onClick={() => this.showCompleted()}
              >
                Completed
              </button>
            </div>
            <button
              className={ this.state.tasks.filter(task =>task.isCompleted === true).length >= 1 ? "filterButtonClear":"displayNone"}
              onClick={() => this.clearCompletedTasks()}
            >
              Clear Completed
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Tasks;
