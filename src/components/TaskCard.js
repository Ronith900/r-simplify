import React from "react";
import { Card } from "react-bootstrap";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TaskCard extends React.Component {
  getColor = (risk) => {
    if (risk === "High") {
      return "red";
    } else if (risk === "Medium") {
      return "orange";
    }
    return "green";
  };

  render() {
    return (
      <>
        {this.props.tasks.map((task) => (
          <div className="col-md-3">
            <Card>
              <Card.Body>
                <Card.Title>
                  {task.id}. {task.title}&nbsp;
                  <a href="#">
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      style={{ color: "red" }}
                      className="float-right"
                      onClick={() => this.props.onDelete(task.id)}
                    />
                  </a>
                  <a href="#">
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{ color: "blue" }}
                      onClick={() => this.props.onEdit(task)}
                    />
                  </a>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  &nbsp;&nbsp;Priority:&nbsp;
                  <span style={{ color: this.getColor(task.priority) }}>
                    {task.priority}
                  </span>{" "}
                  |&nbsp; Status : Open
                </Card.Subtitle>
                <hr></hr>
                <Card.Text>{task.description}</Card.Text>
              </Card.Body>
            </Card>
            <br></br>
          </div>
        ))}
      </>
    );
  }
}

export default TaskCard;
