import React, { forwardRef } from 'react';
import "./custom.css";

const CustomDatePickerInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  export {CustomDatePickerInput};