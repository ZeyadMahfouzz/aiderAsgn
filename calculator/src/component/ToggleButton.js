import React from 'react';
import PropTypes from 'prop-types';

const ToggleButton = ({ onClick }) => {
  return (
    <button className="toggle-button" onClick={onClick}>
      Toggle Dark Mode
    </button>
  );
};

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ToggleButton;
