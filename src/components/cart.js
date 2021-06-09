import React from "react";
import BookingProvider from "../providers/booking";
import { Link } from "react-router-dom";
import { Table, Image, Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faCheckCircle } from "@fortawesome/free-solid-svg-icons";

class Cart extends React.Component {
  async confirmBooking(cart) {
    const cartData = {
      id: cart.id,
      user: cart.user_obj.url,
      shop: cart.shop_obj.url,
      cycle: cart.cycle_obj.url,
      total_number: cart.total_number,
      total_cost: cart.cycle_obj.cost_per_hour,
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
    } else if (itemQ === max && type_in === "I") {
      return "disabled";
    }
  }

  formatCost(cycleCost) {
    return (parseFloat(cycleCost)).toFixed(2);
  }

  render() {
    if(this.props.myCart.length === 0){return <div className="text-center align-top"> 
      <h4 >Your cart is empty</h4>
      <Link to='/'>Add Cycles to your cart</Link>
    </div>}
    return (
      <>
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th className="text-left" style={{width:400}}>Item Info</th>
              <th>Quantity</th>
              <th>Cost/Hr</th>
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
                  S$
                  {this.formatCost(
                    cart.cycle_obj.cost_per_hour
                  )}
                </td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => this.confirmBooking(cart)}
                  >
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                    />
                  </Button>
                  <br/>
                  <Button
                    className="mt-2"
                    variant="danger"
                    onClick={() => this.props.onCartDelete(cart)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                    />
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
