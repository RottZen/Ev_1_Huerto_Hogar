import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (email, password) => {
    // Mock login
    if (email === 'admin@huertohogar.cl' && password === 'admin123') {
      setUser({ email, role: 'admin' });
      return { success: true };
    } else if (email && password) {
      setUser({ email, role: 'user' });
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const register = (email, password) => {
    if (email && password) {
      setUser({ email, role: 'user' });
      return { success: true };
    }
    return { success: false, message: 'Invalid data' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
