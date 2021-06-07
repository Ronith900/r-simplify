import React from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import Task from "../providers/task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_condition: false,
      user_id: null,
      tasks: [],
      task_title: "Title",
      taskObject: {},
      edit_existing_task: false,
    };
  }

  async componentDidMount() {
    const userObject = this.getUserID();
    const tasks = await new Task().getTasks(userObject.id);
    this.setState({ tasks: tasks, user_id: userObject });
  }

  getUserID = () => {
    const tokenString = localStorage.getItem("user_object");
    const userObject = JSON.parse(tokenString);
    return userObject
  };

  setShow = (value, task_obj, edit_existing) => {
    this.setState({
      modal_condition: value,
      taskObject: task_obj,
      edit_existing_task: edit_existing,
    });
  };

  handleClose = () => this.setShow(false);

  setNewTask = () => {
    const taskObj = {
      title: "",
      description: "",
      owner: this.state.user_id.url,
      priority: "High",
      sequence: 0,
      status: "Open",
    };
    return taskObj;
  };

  handleNewTask = (newTask) => {
    if (this.state.edit_existing_task) {
      const tasks = [...this.state.tasks];
      const index = tasks.indexOf(this.state.taskObject);
      tasks[index] = { ...newTask };
      this.setState({ tasks: tasks, task_title: "Title" });
    } else {
      const tasksUpdate = this.state.tasks;
      tasksUpdate.push(newTask);
      this.setState({ tasks: tasksUpdate, task_title: "Title" });
    }

    this.handleClose();
  };

  handleTitle = (title) => {
    this.setState({ task_title: title });
  };

  handleDelete = async (task_id) => {
    await new Task().deleteTask(task_id);
    const tasks = this.state.tasks.filter((task) => task.id !== task_id);
    this.setState({ tasks: tasks });
  };

  handleEdit = (task) => {
    this.setShow(true, task, true);
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <h1>Today's Tasks</h1>
          <span>
            <h4 className="badge badge-info">
              Total: {this.state.tasks.length}
            </h4>
          </span>
        </div>
        <div className="col-md-8 text-right" style={{ paddingRight: "25px" }}>
          <button
            type="button"
            class="btn btn-success text-right"
            onClick={() => {
              this.setShow(true, this.setNewTask(), false);
            }}
          >
            <FontAwesomeIcon icon="plus" /> New Task
          </button>
        </div>
        <Modal
          show={this.state.modal_condition}
          onHide={this.handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.task_title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TaskForm
              onTaskSubmit={this.handleNewTask}
              onTitleChange={this.handleTitle}
              taskObject={this.state.taskObject}
              edit_existing={this.state.edit_existing_task}
            />
          </Modal.Body>
        </Modal>
        <TaskCard
          tasks={this.state.tasks}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
      </div>
    );
  }
}

export default Home;
