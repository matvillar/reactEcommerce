import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaChevronRight } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
const AllCheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>
              Login <FaChevronRight />
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            Login <FaChevronRight />
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>
              Shipping <FaChevronRight />
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            Shipping <FaChevronRight />
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>
              Payment <FaChevronRight />
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            Payment <FaChevronRight />
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>
              Place Order <FaCircleCheck />{' '}
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default AllCheckoutSteps;
