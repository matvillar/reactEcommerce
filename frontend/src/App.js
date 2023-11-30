import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';

import { Outlet } from 'react-router-dom';
const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        {/* Only padding top and bottom */}
        <Container>
          <h1>Welcome to EcommerceTemplate</h1>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
