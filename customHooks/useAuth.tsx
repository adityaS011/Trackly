'use client';
import { useEffect, useState } from 'react';

type User = {
  username: string;
  email: string;
  password: string;
};

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(sessionStorage.getItem('isLoggedIn') === 'true');
    }
  }, []);

  const saveUser = (user: User) => {
    if (typeof window !== 'undefined') {
      const existingUser = getUser();
      if (!existingUser || existingUser.username !== user.username) {
        sessionStorage.setItem('user', JSON.stringify(user));
      } else {
        console.log('User with this username already exists.');
      }
    }
  };

  const getUser = (): User | null => {
    if (typeof window !== 'undefined') {
      const user = sessionStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  };

  const validateLogin = (username: string, password: string): boolean => {
    if (typeof window !== 'undefined') {
      if (username === 'admin' && password === 'admin') {
        setIsLoggedIn(true);
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem(
          'user',
          JSON.stringify({
            username: 'admin',
            password: 'admin',
            email: 'user@admin.user',
          })
        );

        return true;
      }

      const user = getUser();
      if (!user) {
        return false;
      }

      const isValid = user.username === username && user.password === password;

      if (isValid) {
        sessionStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
      }

      return isValid;
    }
    return false;
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('user');
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStorageChange = () => {
        setIsLoggedIn(sessionStorage.getItem('isLoggedIn') === 'true');
      };

      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);

  return { isLoggedIn, saveUser, getUser, validateLogin, logout };
};
