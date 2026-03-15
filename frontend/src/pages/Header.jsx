import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaHome, FaUserGraduate, FaInfoCircle, FaEnvelope, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token"); // hapus token
    navigate("/login"); // redirect ke login
  };

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome className="text-lg" /> },
    { to: "/mahasiswa", label: "Mahasiswa", icon: <FaUserGraduate className="text-lg" /> },
    { to: "/about", label: "About", icon: <FaInfoCircle className="text-lg" /> },
    { to: "/contact", label: "Contact", icon: <FaEnvelope className="text-lg" /> },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <FaUserGraduate className="text-2xl" />
            </div>
            <h1 className="font-bold text-xl tracking-tight">
              <span className="text-white">Siakad</span>
              <span className="text-blue-200">Mahasiswa</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors group"
              >
                <span className="text-blue-200 group-hover:text-white transition-colors">
                  {link.icon}
                </span>
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}

            {/* Logout Button Desktop */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 ml-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="font-medium">Logout</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-600 border-t border-blue-400/20">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-blue-200 text-xl">{link.icon}</span>
                <span className="font-medium text-lg">{link.label}</span>
              </Link>
            ))}

            {/* Logout Button Mobile */}
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 mt-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="font-medium text-lg">Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* User Status Indicator (Opsional) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </header>
  );
};

export default Header;