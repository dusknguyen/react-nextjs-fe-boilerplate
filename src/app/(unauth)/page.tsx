'use client';
import LoginForm from '@/modules/auth/LoginForm';
import Link from 'next/link';
import React from 'react';
import { Nav } from 'react-bootstrap';
/**
 * Main Page Layout
 */
function Login() {
  return (
    <>
      <div className="p-5">
        <div className="text-center">
          <h1 className="h4 text-gray-900 mb-4">Welcome!</h1>
        </div>
        <LoginForm />
        <div className="text-center">
          <Link href="/forgot-password">
            <Nav.Link as="div" className="small">
              Forgot Password?
            </Nav.Link>
          </Link>
        </div>
        <div className="text-center">
          <Link href="/register">
            <Nav.Link as="div" className="small">
              Create an Account!
            </Nav.Link>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
