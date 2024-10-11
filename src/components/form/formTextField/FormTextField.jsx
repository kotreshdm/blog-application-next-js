import React from "react";
import { TextField } from "@mui/material";

const FormTextField = React.memo(
  ({
    name,
    label,
    type = "text",
    value,
    onChange,
    autoComplete,
    autoFocus,
  }) => {
    return (
      <TextField
        margin='normal'
        required
        fullWidth
        id={name}
        label={label}
        name={name}
        type={type}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
      />
    );
  }
);

export default FormTextField;
