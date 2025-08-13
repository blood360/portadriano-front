import React from 'react';

export default function Notification({ show, message, type }) {
  if (!show) {
    return null;
  }

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
}
