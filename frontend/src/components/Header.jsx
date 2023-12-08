import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/loginSlice';
import logo from '../assets/logo.png';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutCall().unwrap();
      dispatch(logout()); // clearing local storage
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
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
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  title={
                    <span style={{ color: '#D4AA7D' }}>{userInfo.name}</span>
                  }
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link href="/login">
                    <FaUser
                      size={28}
                      style={{ marginRight: '5px' }}
                      className="icon"
                    />
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title={<span style={{ color: '#D4AA7D' }}>Admin</span>}
                  id="adminmenu"
                >
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
