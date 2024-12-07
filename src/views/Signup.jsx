import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validators";
import { Avatar, Box, Button, Grid, TextField, Typography } from "../components";
import logo from "../assets/logo.png";
import { signup } from "../services/authentication";
import { useAppContext } from '../Context';

const Signup = () => {
  const { t } = useAppContext();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });

    const validation = name === "email"
      ? validateEmail(value, t)
      : validatePassword(value, t);

    setErrors((prev) => ({ ...prev, [name]: validation.helperText }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValidation = validateEmail(formData.email, t);
    const passwordValidation = validatePassword(formData.password, t);

    if (emailValidation.error || passwordValidation.error) {
      setErrors({
        email: emailValidation.helperText,
        password: passwordValidation.helperText,
      });
      return;
    }

    if (signup(formData)) {
      navigate("/signin");
    } else {
      setGlobalError(t("signup_error"));
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh", backgroundColor: "#fdefe6" }}>
      <Grid item xs={12} sm={8} md={5}>
        <Box sx={{ textAlign: "center", p: 3, backgroundColor: "#d3ebeb", borderRadius: 2, boxShadow: 3 }}>
          <Avatar alt="Logo" src={logo} sx={{ width: 100, height: 100, mx: "auto", mb: 2 }} />
          <Typography variant="h5" sx={{ color: "#22535d", mb: 2 }}>
            {t("create_account")}
          </Typography>
          <Typography variant="body2" sx={{ color: "#22535d", mb: 4 }}>
            {t("start_caring")}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label={t("email")}
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label={t("password")}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              fullWidth
              sx={{ mb: 2 }}
            />
            {globalError && (
              <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                {globalError}
              </Typography>
            )}
            <Button type="submit" fullWidth sx={{ backgroundColor: "#22535d", color: "#fff", "&:hover": { backgroundColor: "#183c48" } }}>
              {t("signup")}
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 3, color: "#22535d" }}>
            {t("have_account")}{" "}
            <Button variant="text" onClick={() => navigate("/signin")} sx={{ color: "#22535d" }}>
              {t("signin")}
            </Button>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
