'use client';
import LocaleSwitcher from '@/modules/i18n/LocaleSwitcher';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
/**
 *
 */
export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-gradient-primary">
        <Container>
          <Row className="justify-content-center">
            <Col xl={10} lg={12} md={9}>
              <Card className="o-hidden border-0 shadow-lg my-5">
                <Card.Body className="p-0">{children} </Card.Body>
              </Card>
            </Col>
          </Row>
          <LocaleSwitcher />
        </Container>
      </div>
    </>
  );
}
