import React from 'react';

export default function Display({ value }) {
  return (
    <div className="component-display">
      <div>{value || "0"}</div>
    </div>
  );
}
