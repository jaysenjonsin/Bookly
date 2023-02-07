export const validateRegister = (
  username: string,
  email: string,
  name: string,
  password: string
): { errorMessage: null | string } => {
  let errorMessage = null;

  if (!username || !email || !name || !password) {
    errorMessage = 'please enter all required fields';
  }

  else if (username.includes('@')) {
    errorMessage = 'username cannot include @ symbol';
  }

  else if (!email.includes('@')) {
    errorMessage = 'please enter a valid email';
  }

  else if (password.length <= 3) {
    errorMessage = 'password must contain 3 characters';
  }

  return { errorMessage };
};
