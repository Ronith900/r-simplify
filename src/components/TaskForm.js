import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import Task from "../providers/task";

class TaskForm extends React.Component {
  state = {
    task: this.props.taskObject,
    risks: ["High", "Medium", "Low"],
    edit_existing : this.props.edit_existing,
  };

   handleSubmit = async(e) => {
    e.preventDefault();
    const {data: new_task} = await new Task().createUpdateTask(this.state.task,this.props.edit_existing);
    this.props.onTaskSubmit(new_task);
  };

  handleChange = ({ currentTarget: input }) => {
    const task = { ...this.state.task };
    task[input.name] = input.value;
    this.setState({ task });
    this.props.onTitleChange(this.state.task.title);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Col sm="12">
            <Form.Control
              as="input"
              placeholder="Title"
              name="title"
              value={this.state.task.title}
              onChange={this.handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Row>
            <Col>
              <Form.Control
                as="select"
                placeholder="priority"
                name="priority"
                onChange={this.handleChange}
                value={this.state.task.priority}
              >
                {this.state.risks.map((risk) => {
                  return <option>{risk}</option>;
                })}
              </Form.Control>
            </Col>
            <Col>
              <Form.Control
                as="input"
                placeholder="Sequence"
                name="sequence"
                value={this.state.task.sequence}
                onChange={this.handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            placeholder="Description"
            name="description"
            onChange={this.handleChange}
            value={this.state.task.description}
          />
        </Form.Group>
        <hr></hr>
        <Button
          variant="outline-success"
          type="submit"
          size="sm"
          className="float-right"
        >
          Save
        </Button>
      </Form>
    );
  }
}

export default TaskForm;
