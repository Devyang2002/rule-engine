import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Name from "../assets/evotion.webp";
import R from "../assets/R.webp";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { loginUser, isLoggedIn } from "../sessionStorage/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from '../assets/logo.png';

const initialValues = {
  email: "",
  password: "",
};

const userSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const LoginPage = () => {
    const {setUser} = useUser();
    const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const handleSubmit = async (values) => {
    try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
  
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
  
        const user = await response.json();
        console.log(user);
  
        if (user && user.data) {
          loginUser(user.data);
          setUser(user.data);
          sessionStorage.setItem('user_id', user.data.id); 
          toast.success("User logged in successfully");
        window.location.assign("/");
        } else {
          throw new Error("Invalid credentials");
        }
      } catch (error) {
        console.error("Error during login:", error.message);
        toast.error("Invalid credentials. Please try again.");
      }
  };

  const styles = {
    logoContainer: {
      marginTop: '100px',
      marginBottom: '-100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: '65px',
      borderRadius: '30%',
      boxShadow: '0 4px 8px rgba(255, 255, 255, 0.2), 0 6px 20px rgba(51, 192, 203, 0.5)',
    },
  };

  return (
    <>
    <Box mt="100px" mb="-100px">
    <img src={logo} alt="" width="65px" style={styles.logo} />
    </Box>
      <Box display="flex">
        <Box
          display="flex"
          width="900px"
        //   height="280px"
          justifyContent="center"
          alignItems="center"
          marginTop="50px"
        >
          <img
            src={R}
            alt=""
            height="140px"
            style={{
              marginTop: "115px",
              marginRight: "15px",
            }}
          />
          <Box marginTop="150px">
            <img src={Name} alt="" width="500px" height="50px" /><Typography
              fontSize="70px"
              fontWeight="670"
              style={{
                display: "flex",
                color: "#33c0cb",
              }}
            >
              ule Engine
            </Typography>
          </Box>
        </Box>
        <Box
          marginTop="175px"
          width="500px"
          display="flex"
          flexDirection="column"
        >
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={userSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 2",
                    },

                    "& .MuiInputBase-input": {
                      backgroundColor: "#242a33",
                    },
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#242a33",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#242a33",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#242a33",
                      },
                      "&.Mui-error": {
                        backgroundColor: "#242a33",
                      },
                    },
                    "& .MuiFilledInput-root:before": {
                      borderBottomColor: "rgba(0, 0, 0, 0.42)",
                    },
                    "& .MuiFilledInput-root:hover:before": {
                      borderBottomColor: "#33c0cb",
                    },
                    "& .MuiFilledInput-root.Mui-focused:before": {
                      borderBottomColor: "#33c0cb",
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#33c0cb",
                    },
                  }}
                >
                    <Typography mb="10px">
                    Please fill your particulars to Access the rule engine
        </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="email"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    inputProps={{
                      autocomplete: "new-password",
                      form: {
                        autocomplete: "off",
                      },
                    }}
                    sx={{
                      gridColumn: "span 2",
                      width: "100%",
                      marginBottom: "20px",
                      color: "white",
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    inputProps={{
                      autocomplete: "new-password",
                      form: {
                        autocomplete: "off",
                      },
                    }}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ width: "100%", color: "white" }}
                  />
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="end"
                    mt="15px"
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      sx={{
                        backgroundColor: "#33c0cb",
                        "&:hover": {
                          backgroundColor: "#114145",
                        }
                      }}
                    >
                      Login
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
