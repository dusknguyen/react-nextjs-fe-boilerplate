import React from 'react';
import { Container } from 'react-bootstrap';

/**
 *
 */
export function Footer() {
  return (
    <>
      <footer className="sticky-footer bg-white">
        <Container className="my-auto">
          <div className="text-center my-auto">
            <span>Copyright &copy; Your Website 2024</span>
          </div>
        </Container>
      </footer>
    </>
  );
}
