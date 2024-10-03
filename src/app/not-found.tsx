import { T } from '@/modules/i18n/T';
import React from 'react';

/**
 *
 */
export default function NotFound() {
  return (
    <>
      <div className="text-center">
        <div className="error mx-auto" data-text="404"></div>
        <p className="lead text-gray-800 mb-5">
          <T t="Page_Not_Found" />
        </p>
        <a href="/">&larr; Back</a>
      </div>
    </>
  );
}
