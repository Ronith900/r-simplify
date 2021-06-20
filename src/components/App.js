import React from "react";
import NavBar from "./Navbar";
import Shops from "./Shop";
import Cart from "./cart";
import Owner from "./ShopOwner";
import BookingProvider from "../providers/booking";
import Shop from "../providers/shops";
import Booking from "./booking";
import Cycles from "./Cycles";
import Login from "./Login";
import Logout from "./logout";
import About from "./NotFound";
import moment from "moment";
import Task from "../providers/task";
import {
  faBicycle,
  faShoppingCart,
  faCheckCircle,
  faPeopleArrows,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.getToken()[0],
      rentalShops: [],
      user_object: {},
      cart: [],
      userBooking: [],
      booking: 0,
      shopOwner: false,
      shopOB: 0,
    };
  }

  async componentDidMount() {
    const token_object = this.getToken();
    const rentalShops = await new Shop().getRentalShops();
    let cart = await new BookingProvider().getUserCart();
    this.setState({ token: token_object[0], rentalShops, cart });
    this.getComponentsData(token_object[2]);
  }

  setToken = async (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    const token_object = this.getToken();
    const logedInUser = await new Task().getCurrentUser(token_object[1]);
    localStorage.setItem("user_object", JSON.stringify(logedInUser));
    this.setState({ token: token_object[0] });
    this.getComponentsData(token_object[2]);
  };

  async getComponentsData(shopOwner) {
    const userBooking = await new BookingProvider().getUserBookings();
    console.log("booking", userBooking);
    const shopOB = await new BookingProvider().getShopOwnerBookings();

    this.setState({
      booking: userBooking.length,
      userBooking,
      shopOwner,
      shopOB: shopOB.length,
    });
  }

  getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return [userToken?.token, userToken?.id, userToken?.shopOwner];
  };

  getUserName = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.full_name;
  };

  increamentCart = () => {
    const cartValue = this.state.cart;
    this.setState({ cart: cartValue + 1 });
  };
  handleCartChange = (changeType) => {
    const cartValue = this.state.cart;
    const bookingValue = this.state.booking;
    if (changeType === "confirm") {
      this.setState({ cart: cartValue - 1, booking: bookingValue + 1 });
    } else {
      this.setState({ cart: cartValue - 1 });
    }
  };
  handleTotalCount = () => {
    const cartValue = this.state.cart;
    this.setState({ cart: cartValue + 1 });
  };

  handleCartDelete = async ({ id: cartID }) => {
    const cartRemoved = await new BookingProvider().deleteBooking(cartID);
    const cart = this.state.cart.filter((cart) => cart.id !== cartID);
    this.setState({ cart: cart });
  };

  getShop({ match }) {
    const shopID = match.params.id;
    const shop = this.state.rentalShops.filter(
      (shop) => shop.shop_id === shopID
    );
    return shop[0];
  }

  handleNewBooking = (newCartItem) => {
    const cart = [...this.state.cart];
    cart.unshift(newCartItem)
    this.setState({ cart });
  };

  handleConfirmBooking = async (cartBooked) => {
    const cart = this.state.cart.filter((cart) => cart.booking_id !== cartBooked.booking_id);
    const userBooking = [...this.state.userBooking];
    userBooking.unshift(cartBooked);
    //update the availablity
    const rentalShops = await new Shop().getRentalShops();

    this.setState({ cart, rentalShops, userBooking });
  };
  handleCancellBooking = async (booking) => {
    const userBooking = this.state.userBooking.filter(
      (book) => book.id !== booking.id
    );
    const rentalShops = await new Shop().getRentalShops();
    this.setState({ userBooking, rentalShops });
  };

  handleTimeChange = (cart,date) => {
    const cartDuplicate = this.state.cart;
    const cartIndex = cartDuplicate.indexOf(cart);
    cart.time_cycle_picked = moment(date).format("h:mm a D MMMM YYYY")
    cartDuplicate[cartIndex] = cart;
    this.setState({cart:cartDuplicate})
  }

  handleIncrementDecrement = (changeType, cart) => {
    const carts = [...this.state.cart];
    const index = carts.indexOf(cart);

    if (changeType === "D") {
      cart["total_number"] = cart["total_number"] - 1;
      carts[index] = { ...cart };
    } else {
      cart["total_number"] = cart["total_number"] + 1;
      carts[index] = { ...cart };
    }
    this.setState({ cart: carts });
  };

  terminateBooking = () => {
    const bookingValue = this.state.booking;
    this.setState({ booking: bookingValue - 1 });
  };
  cycleReturned = () => {
    const shopOBV = this.state.shopOB;
    this.setState({ shopOB: shopOBV - 1 });
  };

  getNavMenus() {
    var baseMenus = [
      {
        name: "Cycle Kiosk",
        id: 2,
        link: "/shops",
        image: <FontAwesomeIcon icon={faBicycle}></FontAwesomeIcon>,
      },
      {
        name: "Cart",
        id: 3,
        link: "/cart",
        image: <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>,
        badge: this.state.cart.length,
      },
      {
        name: "Booked",
        id: 4,
        link: "/bookings",
        image: <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>,
        badge: this.state.userBooking.length,
      },
    ];
    console.log(this.state.shopOwner);

    if (this.state.shopOwner) {
      baseMenus.push({
        name: "Owner",
        id: 5,
        link: "/owner",
        image: <FontAwesomeIcon icon={faPeopleArrows}></FontAwesomeIcon>,
      });
    }

    return baseMenus;
  }

  logoutUser = () => {
    localStorage.clear();
    const token_obj = this.getToken();
    this.setState({ token: token_obj[0] });
  };

  render() {
    console.log(this.state.rentalShops);
    if (!this.state.token) {
      return <Login />;
    }
    return (
      <div>
        <Router>
          <NavBar
            logout={this.logoutUser}
            username={this.getUserName()}
            menus={this.getNavMenus()}
          />
          <br></br>
          <div className="container-fluid">
            <Switch>
              <Route
                path="/shops/:id"
                render={(props) => (
                  <Cycles
                    {...props}
                    onBookingConfirm={this.handleNewBooking}
                    shop={this.getShop(props)}
                  />
                )}
              />

              <Route exact path="/">
                <Shops rentalShops={this.state.rentalShops} />
              </Route>
              <Route path="/cart">
                <Cart
                  onConfirmBooking={this.handleConfirmBooking}
                  onTimeChange ={this.handleTimeChange}
                  onIncrementDecrement={this.handleIncrementDecrement}
                  onCartDelete={this.handleCartDelete}
                  myCart={this.state.cart}
                />
              </Route>
              <Route path="/bookings">
                <Booking
                  onCancelBooking={this.handleCancellBooking}
                  myBookings={this.state.userBooking}
                />
              </Route>
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/not-found" component={About} />
              <Route path="/owner">
                <Owner cycleReturned={this.cycleReturned} />
              </Route>

              <Redirect exact from="/shops" to="/"></Redirect>
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
