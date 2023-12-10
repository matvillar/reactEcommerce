import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import SpinnerLoad from './SpinnerLoad';
import Message from './Message';
import { useGetTop3ProductsQuery } from '../slices/productsApiSlice';

const SlideShow = () => {
  const { data: products, isLoading, error } = useGetTop3ProductsQuery();
  return isLoading ? (
    <SpinnerLoad />
  ) : error ? (
    <Message variant="warning">Error</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {/* Add "sale to the other half of the carousel" */}
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default SlideShow;
