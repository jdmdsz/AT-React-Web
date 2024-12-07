const USERS_KEY = "users";

const initializeUsers = () => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  if (users.length === 0) {
    users.push({ email: "test@example.com", password: "123456" });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

initializeUsers();

export const login = ({ email, password }) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const userExists = users.some(
    (user) => user.email === email && user.password === password
  );
  if (userExists) {
    localStorage.setItem("isAuthenticated", "true");
    return true;
  }
  return false;
};

export const signup = ({ email, password }) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const userExists = users.some((user) => user.email === email);

  if (!userExists && email && password) {
    users.push({ email, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  }

  return false;
};

export const logout = () => {
  localStorage.removeItem("isAuthenticated");
};

export const isAuthenticated = () => localStorage.getItem("isAuthenticated") === "true";
