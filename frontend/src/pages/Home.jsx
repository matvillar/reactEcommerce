import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import SpinnerLoad from '../components/SpinnerLoad';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import SlideShow from '../components/SlideShow';

const Home = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <SlideShow />
      ) : (
        <Link to="/" className="btn btn-light my-2">
          {' '}
          <FaLongArrowAltLeft />{' '}
        </Link>
      )}
      {isLoading ? (
        <SpinnerLoad />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1
            style={{
              color: '#306068',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
            className="my-2 center"
          >
            Products
          </h1>
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
            keyword={keyword ? keyword : ''}
            isAdmin={data.isAdmin}
          />
        </>
      )}
    </>
  );
};

export default Home;
