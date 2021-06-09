import React from "react";
import { Link } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

class NavBar extends React.Component {
  state = {
    menu_id: 2,
    user: "",
  };

  getNavState = (menu_id) => {
    if (this.state.menu_id === menu_id) {
      return "nav-link active";
    } else {
      return "nav-link";
    }
  };

  handleNavClick = (key_id) => {
    this.setState({ menu_id: key_id });
  };

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home">Simplify</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {this.props.menus.map((menu) => (
                <Link
                  className={this.getNavState(menu.id)}
                  to={menu.link}
                  onClick={() => this.handleNavClick(menu.id)}
                >
                  {menu.image}&nbsp;{menu.name} {menu.badge}{" "}
                  <span className="sr-only">(current)</span>
                </Link>
              ))}
            </Nav>
            <Navbar.Text>
              Signed in as: <a href="#login">{this.props.username}</a>
            </Navbar.Text>
            &nbsp;&nbsp;
            <Link to="/logout">
              {" "}
              <Button
                className="text-right"
                variant="outline-danger"
                size="sm"
                onClick={() => this.props.logout()}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                &nbsp; Logout
              </Button>
            </Link>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default NavBar;
