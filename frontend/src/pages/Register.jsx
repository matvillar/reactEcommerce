import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import SpinnerLoad from '../components/SpinnerLoad';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/loginSlice';
import { toast } from 'react-toastify';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
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
    if (password !== confirmPass) {
      toast.error('Passwords do not match');
      return;
    } else {
      try {
        const res = await register({
          name,
          email,
          password,
        }).unwrap(); // .unwrap basically get the data from the promise
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1>REGISTER</h1>
      <Card className="my-3 p-4 rounded">
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
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
          </Form.Group>
          <Form.Group controlId="confirmPass" className="my-3">
            <Form.Label>Re-Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPass}
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="my-3"
            disabled={isLoading}
          >
            Register Now
          </Button>
          {isLoading && <SpinnerLoad />}
        </Form>
        <Row className="py-3">
          <Col>
            Already Registered?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              <strong> Log In</strong>
            </Link>
          </Col>
        </Row>
      </Card>
    </FormContainer>
  );
};

export default Register;
