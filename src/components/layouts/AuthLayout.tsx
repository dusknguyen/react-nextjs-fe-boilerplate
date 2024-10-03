import { Footer } from '@/components/ui/Footer';
import { Sidebar } from '@/components/ui/navbar/Sidebar';
import { TopBar } from '@/components/ui/navbar/Topbar';
import React from 'react';
import { Container } from 'react-bootstrap';

/**
 *
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div id="page-top">
        <div id="wrapper" className="d-flex">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column flex-grow-1">
            <div id="content">
              <TopBar />
              <Container fluid>{children}</Container>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
