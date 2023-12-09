import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import SpinnerLoad from '../components/SpinnerLoad';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const Home = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

  return (
    <>
      {isLoading ? (
        <SpinnerLoad />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            isAdmin={data.isAdmin}
          />
        </>
      )}
    </>
  );
};

export default Home;
