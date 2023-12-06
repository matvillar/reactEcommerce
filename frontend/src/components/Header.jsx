import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  return (
    <header>
      <Navbar bg="light" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={logo}
                alt="Logo eCommerce"
                className="navbar-brand p-0 m-0" //remove padding and margin
                style={{ width: '120px', height: 'auto' }}
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ backgroundColor: '#D4AA7D' }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {' '}
              {/*ms-auto aligns items to the right  */}
              <LinkContainer to="/cart">
                <Nav.Link className="position-relative">
                  {/* Make cart icon bigger and padding between icon and "cart" */}
                  <FaShoppingCart
                    size={30}
                    style={{ marginRight: '5px' }}
                    className="icon"
                  />
                  {cartItems.length > 0 && (
                    // Rounded pill should be top right of cart icon
                    <span className="position-absolute top-0 translate-middle p-1">
                      <Badge className="rounded-pill bg-info  text-white p-1">
                        {cartItems.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}
                      </Badge>
                    </span>
                  )}

                  {/* Show amount of items in the cart with a circle red top right of cart icon */}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser
                    size={28}
                    style={{ marginRight: '5px' }}
                    className="icon"
                  />
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
