export const validateEmail = (email, t) => {
  if (!email) return { error: true, helperText: t("email_required") };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email)
    ? { error: false, helperText: "" }
    : { error: true, helperText: t("email_invalid") };
};

export const validatePassword = (password, t) => {
  if (!password) return { error: true, helperText: t("password_required") };
  return password.length < 6
    ? { error: true, helperText: t("password_min_length") }
    : { error: false, helperText: "" };
};
