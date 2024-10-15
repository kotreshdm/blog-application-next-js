import React from "react";
import { TextField } from "@mui/material";

const FormTextField = React.memo((props) => {
  return (
    <TextField
      margin='normal'
      id={props.name}
      type={props.type || "text"}
      autoComplete={props.autoComplete}
      autoFocus={props.autoFocus}
      {...props}
      sx={{ mr: 2 }}
    />
  );
});

FormTextField.displayName = "FormTextField";

export default FormTextField;
