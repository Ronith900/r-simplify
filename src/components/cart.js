import React from "react";
import BookingProvider from "../providers/booking";
import {Link} from "react-router-dom";
import { Table, Image, Button, ButtonGroup } from "react-bootstrap";

class Cart extends React.Component {

  async confirmBooking(cart) {
    const cartData = {
      id:cart.id,
      user: cart.user_obj.url,
      shop: cart.shop_obj.url,
      cycle: cart.cycle_obj.url,
      total_number: cart.total_number,
      total_cost: this.getTotalCost(
        cart.cycle_obj.cost_per_hour,
        cart.total_number
      ),
      booking_status:'booked'
    };
    const cartBooked = await new BookingProvider().createUpdateBooking(cartData,true);
    this.props.onConfirmBooking(cart,cartBooked)
  }
  checkMinMax(type_in, itemQ, max) {
    if (itemQ === 1 && type_in === "D") {
      return "disabled";
    } else if (itemQ === max && type_in === "I") {
      return "disabled";
    }
  }

  getTotalCost(cycleCost, quantity) {
    return (quantity * parseFloat(cycleCost)).toFixed(2);
  }

  render() {
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Cycle</th>
              <th>Shop Name</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Total Cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.myCart.map((cart) => (
              <tr>
                <td>
                  <Image
                    src={cart.cycle_obj.image}
                    style={{ height: "200px" }}
                  />
                </td>
                <td><Link to={`/shops/${cart.shop_obj.shop_id}`}>{cart.shop_obj.name}</Link></td>
                <td>{cart.cycle_obj.name}</td>
                <td>
                  {" "}
                  <ButtonGroup size="sm">
                    <Button
                      onClick={() => this.props.onIncrementDecrement("D", cart)}
                      disabled={this.checkMinMax("D", cart.total_number)}
                    >
                      -
                    </Button>
                    <Button variant="light">{cart.total_number}</Button>
                    <Button
                      onClick={() => this.props.onIncrementDecrement("I", cart)}
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
                  {this.getTotalCost(
                    cart.cycle_obj.cost_per_hour,
                    cart.total_number
                  )}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => this.props.onCartDelete(cart)}
                  >
                    Remove
                  </Button>
                  &nbsp;
                  <Button
                    variant="success"
                    onClick={() => this.confirmBooking(cart)}
                  >
                    Confirm
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
