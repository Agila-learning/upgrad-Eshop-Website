import React, { useState, useContext } from 'react';
import { Link, Navigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/Lock';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { doSignup } from "../../api/userAuthAPIs";
import useAuthentication from "../../hooks/useAuthentication";
import useServices from "../../hooks/useServices";

const SignUp = () => {
  const initialState = {
    firstName: { value: "", error: false, errorMessage: null },
    lastName: { value: "", error: false, errorMessage: null },
    email: { value: "", error: false, errorMessage: null },
    password: { value: "", error: false, errorMessage: "Please enter a valid password." },
    confirmPassword: { value: "", error: false, errorMessage: null },
    contactNumber: { value: "", error: false, errorMessage: null },
  };

  const [formData, setFormData] = useState(initialState);
  const [busy, setBusy] = useState(false);
  const { ServicesCtx } = useServices();
  const { broadcastMessage } = useContext(ServicesCtx);
  const { AuthCtx } = useAuthentication();
  const { loggedInUser } = useContext(AuthCtx);

  const validateData = async () => {
    setBusy(true);
    let data = { ...formData };
    let requestJson = {};
    let valid = true;

    for (let field in formData) {
      let { valid: fieldValid, message } = getValidity(field, formData[field].value);
      data[field] = {
        value: formData[field].value,
        error: !fieldValid,
        errorMessage: message,
      };
      valid = valid && fieldValid;
      if (fieldValid) requestJson[field] = formData[field].value;
    }

    setFormData(data);

    if (valid) {
      try {
        const json = await doSignup(requestJson);
        broadcastMessage(json.message, "success");
        setFormData(initialState);
      } catch (error) {
        broadcastMessage(error.message, "error");
      }
    }
    setBusy(false);
  };

  const matchRegex = (value, re) => {
    let regex = new RegExp(re);
    return regex.test(value);
  };

  const getValidity = (field, value) => {
    let valid = true;
    let message = null;

    if (!value || value.length === 0) {
      valid = false;
      message = "This field is required.";
    } else {
      switch (field) {
        case "firstName":
        case "lastName":
          valid = matchRegex(value, "^([A-Za-z]+)$");
          message = valid ? null : `Please enter a valid ${field === "firstName" ? "first" : "last"} name.`;
          break;
        case "email":
          valid = matchRegex(value, "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$");
          message = valid ? null : "Please enter a valid email.";
          break;
        case "password":
          valid = matchRegex(value, "^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,40}$");
          message = valid ? null : "Password must contain at least a symbol (!@#$%^&*), upper and lower case letters, and a number.";
          break;
        case "confirmPassword":
          valid = value === formData.password.value;
          message = valid ? null : "Passwords do not match.";
          break;
        case "contactNumber":
          valid = matchRegex(value, "^([7-9]{1}[0-9]{9})$");
          message = valid ? null : "Please enter a valid contact number.";
          break;
        default:
          break;
      }
    }

    return { valid, message };
  };

  const saveOnChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: { ...formData[field], value },
    });
  };

  if (loggedInUser) {
    return <Navigate to="/home" />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "10%" }}>
              <LockOutlinedIcon style={{
                display: 'inline-block',
                borderRadius: '60px',
                padding: '0.6em 0.6em',
                color: '#ffffff',
                background: "#f50057"
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="subtitle1" noWrap sx={{ fontSize: "25px", color: 'inherit' }}>
                Sign up
              </Typography>
            </div>
            {["firstName", "lastName", "email", "password", "confirmPassword", "contactNumber"].map((field, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
                <TextField
                  id={field}
                  label={field === "confirmPassword" ? "Confirm Password *" : field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim() + " *"}
                  variant="outlined"
                  fullWidth
                  type={field.includes("password") ? "password" : "text"}
                  value={formData[field].value}
                  onChange={(event) => saveOnChange(field, event.target.value)}
                  onBlur={(event) => {
                    const { valid, message } = getValidity(field, event.target.value);
                    setFormData({
                      ...formData,
                      [field]: { value: event.target.value, error: !valid, errorMessage: message },
                    });
                  }}
                  error={formData[field].error}
                  helperText={formData[field].error && formData[field].errorMessage}
                />
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <Button variant="contained" color="primary" fullWidth onClick={validateData}>
                SIGN UP
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'right', marginTop: "30px" }}>
              <Link to="/login">
                <Typography variant="body1">
                  Already have an account? Sign in
                </Typography>
              </Link>
            </div>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </Grid>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={busy}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default SignUp;
