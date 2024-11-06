export type User = {
  username: string;
  email: string;
  password: string;
};

export const saveUser = (user: User) => {
  const existingUser = getUser();
  if (!existingUser || existingUser.username !== user.username) {
    sessionStorage.setItem('user', JSON.stringify(user));
  } else {
    console.log('User with this username already exists.');
  }
};

export const getUser = (): User | null => {
  const user = sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const validateLogin = (username: string, password: string): boolean => {
  const user = getUser();
  if (!user) {
    return false;
  }
  const isValid =
    user && user.username === username && user.password === password;
  if (isValid) {
    sessionStorage.setItem('isLoggedIn', 'true');
  }
  return isValid;
};

export const isLoggedIn = (): boolean =>
  sessionStorage.getItem('isLoggedIn') === 'true';

export const logout = () => {
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('user');
};
