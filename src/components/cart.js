import React from "react";
import BookingProvider from "../providers/booking";
import { Link } from "react-router-dom";
import { Table, Image, Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

class Cart extends React.Component {
  async confirmBooking(cart) {
    const cartData = {
      id: cart.id,
      user: cart.user_obj.url,
      shop: cart.shop_obj.url,
      cycle: cart.cycle_obj.url,
      total_number: cart.total_number,
      total_cost: cart.cycle_obj.cost_per_hour,
      time_cycle_picked:cart.time_cycle_picked,
      booking_status: "booked",
    };
    const cartBooked = await new BookingProvider().createUpdateBooking(
      cartData,
      true
    );
    this.props.onConfirmBooking(cart, cartBooked);
  }
  checkMinMax(type_in, itemQ, max) {
    if (itemQ === 1 && type_in === "D") {
      return "disabled";
    } else if (itemQ === max && type_in === "h:mm ") {
      return "disabled";
    }
  }

  formatCost(cycleCost) {
    return parseFloat(cycleCost).toFixed(2);
  }

  handleDateChangeTime(date) {
    console.log(moment(date).format("h:mm a D MMMM YYYY"));
  }

  render() {
    if (this.props.myCart.length === 0) {
      return (
        <div className="text-center align-top">
          <h4>Your cart is empty</h4>
          <Link to="/">Add Cycles to your cart</Link>
        </div>
      );
    }
    return (
      <>
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th className="text-left" style={{ width: 400 }}>
                Item Info
              </th>
              <th>Quantity</th>
              <th>Cost/Hr</th>
              <th>Pick-up Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.myCart.map((cart) => (
              <tr>
                <td className="text-left">
                  <Link to={`/shops/${cart.shop_obj.shop_id}`}>
                    {cart.shop_obj.name}
                  </Link>
                  <div className="m-2">
                    <Image
                      src={cart.cycle_obj.image}
                      style={{ height: "100px" }}
                      rounded
                    />
                    <span className="ml-4">{cart.cycle_obj.name}</span>
                  </div>
                </td>
                <td>
                  {" "}
                  <ButtonGroup size="sm">
                    <Button
                      onClick={() => this.props.onIncrementDecrement("D", cart)}
                      variant="outline-primary"
                      disabled={this.checkMinMax("D", cart.total_number)}
                    >
                      -
                    </Button>
                    &nbsp;
                    <Button variant="light">{cart.total_number}</Button>
                    <Button
                      onClick={() => this.props.onIncrementDecrement("I", cart)}
                      variant="outline-primary"
                      disabled={this.checkMinMax(
                        "I",
                        cart.total_number,
                        cart.cycle_obj.availability
                      )}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </td>
                <td>
                  S$
                  {this.formatCost(cart.cycle_obj.cost_per_hour)}
                </td>
                <td>
                  {" "}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid>
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        value={cart.time_cycle_picked}
                        onChange={(date) => this.props.onTimeChange(cart,date)}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </td>
                <td>
                  <Button
                    variant="outline-success"
                    onClick={() => this.confirmBooking(cart)}
                  >
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </Button>
                  <br />
                  <Button
                    className="mt-2"
                    variant="outline-danger"
                    onClick={() => this.props.onCartDelete(cart)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}

export default Cart;
