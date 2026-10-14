import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {
  Inicio,
  Catalogo,
  Carrito,
  Login,
  Registro,
  Admin,
  Perfil,
  Seguimiento,
} from './pages';
import { AuthContext } from './context/AuthContext';
import './App.css';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 container mt-4">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/seguimiento" element={<Seguimiento />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
