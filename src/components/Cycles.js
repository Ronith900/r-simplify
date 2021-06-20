import React from "react";
import BookingProvider from "../providers/booking";
import { Link } from "react-router-dom";
import { Card, Button, Alert,Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
class Cycles extends React.Component {
  state = {
    user_obj: "",
    showState: { show: false, cycle: "" },
  };

  async componentDidMount() {
    const userObject = this.getUserID();
    this.setState({ user_obj: userObject.url });
  }

  getUserID = () => {
    const tokenString = localStorage.getItem("user_object");
    const userObject = JSON.parse(tokenString);
    return userObject;
  };

  handleCartItem = async (cycle) => {
    const data = {
      user: this.state.user_obj,
      cycle: cycle.url,
      shop: this.props.shop.url,
    };
    const newCartItem = await new BookingProvider().createUpdateBooking(data, false);
    console.log(newCartItem)
    this.alert(cycle.name);
    this.props.onBookingConfirm(newCartItem);
  };

  getAddButton(cycle) {
    if (cycle.availability !== 0)
      return (
        <Button
          className="float-right"
          variant="outline-success"
          size="sm"
          onClick={() => this.handleCartItem(cycle)}
        >
          <FontAwesomeIcon icon="plus" />
          &nbsp;Add
        </Button>
      );
  }

  getBadgeVariant(cycle){
    if(cycle.availability === 0) return 'warning';
    return 'success'
  }

  alert(name) {
    this.setState({ showState: { show: true, cycle: name } });
  }

  formatCost(cycleCost) {
    return parseFloat(cycleCost).toFixed(2);
  }

  render() {
    return (
      <div>
        <Link to="/shops" className="float-right">
          <Button variant="outline-secondary" size="sm">
            <FontAwesomeIcon icon={faBackspace} />
            &nbsp;Back to Kiosk
          </Button>
        </Link>
        <h2>{this.props.shop.name} </h2>
        <br />
        <Alert
          variant="success"
          dismissible
          show={this.state.showState.show}
          onClose={() =>
            this.setState({ showState: { show: false, cycle: "" } })
          }
        >
          {this.state.showState.cycle} has been added to your cart
        </Alert>
        <div className="row">
          {this.props.shop.cycles.map((cycle) => (
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={cycle.image}
                  style={{ height: "200px" }}
                />
                <Card.Body>
                  <Card.Title>
                    {cycle.name}
                    {this.getAddButton(cycle)}
                  </Card.Title>
                  <hr></hr>
                  <Card.Subtitle className="mb-2 text-muted">
                    Cost: S$ {this.formatCost(cycle.cost_per_hour)}
                  </Card.Subtitle>
                  <Card.Text>Availability: <Badge variant={this.getBadgeVariant(cycle)} pill size="lg">{cycle.availability}</Badge></Card.Text>
                </Card.Body>
              </Card>
              <br></br>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Cycles;
