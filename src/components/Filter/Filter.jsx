import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
  return (
    <div className="formWrapper">
      <label>
        Find contacts by name
        <input
          type="text"
          name="filter"
          className="form-control"
          onChange={onChange}
          value={value}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Filter;
