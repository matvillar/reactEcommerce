import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import SpinnerLoad from '../components/SpinnerLoad';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/loginSlice';
import { toast } from 'react-toastify';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.login);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap(); // .unwrap basically get the data from the promise
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <FormContainer>
      <h1>LOGIN</h1>
      <Card className="my-3 p-4 rounded">
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Control>

            <Button
              type="submit"
              variant="primary"
              className="my-3"
              disabled={isLoading}
            >
              Login
            </Button>
            {isLoading && <SpinnerLoad />}
          </Form.Group>
        </Form>
        <Row className="py-3">
          <Col>
            New Here?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              <strong>Register</strong>
            </Link>
          </Col>
        </Row>
      </Card>
    </FormContainer>
  );
};

export default Login;
