import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  Mail,
  User,
  Lock,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [gmail, setGmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const showToast = (message, type = "error") => {
    if (type === "success") {
      setSuccess(message);
      setTimeout(() => setSuccess(""), 3200);
    } else {
      setError(message);
      setTimeout(() => setError(""), 4000);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validasi sederhana di frontend
    if (!gmail.includes("@") || !gmail.includes(".")) {
      showToast("Format email tidak valid");
      setLoading(false);
      return;
    }
    if (username.length < 3) {
      showToast("Username minimal 3 karakter");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      showToast("Password minimal 6 karakter");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/register",
        { gmail, username, password },
        { withCredentials: true } // jika backend pakai cookie/session
      );

      showToast("Pendaftaran berhasil! Silakan login", "success");

      // Delay biar toast terlihat
      setTimeout(() => {
        navigate("/login");
      }, 1400);

    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Pendaftaran gagal, coba lagi";
      showToast(msg);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants (sama seperti di Login biar konsisten)
  const formVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.14 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const inputFocus = {
    focus: { scale: 1.02, transition: { duration: 0.3 } },
  };

  const buttonTap = {
    tap: { scale: 0.96 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100 overflow-hidden relative"
      >
        {/* Toast Success */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute top-4 left-4 right-4 z-50 bg-green-600 text-white px-5 py-4 rounded-xl shadow-xl flex items-center gap-3"
            >
              <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
              <span className="font-medium">{success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              whileHover={{ x: [0, -6, 6, -4, 4, 0] }} // shake subtle
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-4 left-4 right-4 z-50 bg-red-600 text-white px-5 py-4 rounded-xl shadow-xl flex items-center gap-3"
            >
              <AlertCircle className="h-6 w-6 flex-shrink-0" />
              <span className="font-medium">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div variants={childVariants} className="text-center mb-8">
          <div className="mx-auto bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md">
            <UserPlus size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Buat Akun Baru</h1>
          <p className="text-gray-500 mt-2">Isi data untuk mulai bergabung</p>
        </motion.div>

        {/* Form */}
        <motion.form onSubmit={handleRegister} className="space-y-6">
          {/* Email / Gmail */}
          <motion.div variants={childVariants}>
            <label
              htmlFor="gmail"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email / Gmail
            </label>
            <motion.div variants={inputFocus} whileFocus="focus">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  id="gmail"
                  type="email"
                  placeholder="contoh@gmail.com"
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 bg-gray-50"
                  value={gmail}
                  onChange={(e) => setGmail(e.target.value.trim())}
                  required
                  autoFocus
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Username */}
          <motion.div variants={childVariants}>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Username
            </label>
            <motion.div variants={inputFocus} whileFocus="focus">
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  id="username"
                  type="text"
                  placeholder="Pilih username unik"
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 bg-gray-50"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.trim())}
                  required
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Password */}
          <motion.div variants={childVariants}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Password
            </label>
            <motion.div variants={inputFocus} whileFocus="focus">
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  id="password"
                  type="password"
                  placeholder="Minimal 6 karakter"
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 bg-gray-50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={childVariants}
            whileTap="tap"
            variants={buttonTap}
            disabled={loading}
            type="submit"
            className={`
              relative w-full py-3.5 px-6 rounded-xl font-semibold text-white overflow-hidden
              transition-all duration-300 shadow-lg
              ${
                loading
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 active:scale-[0.98]"
              }
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                Memproses...
              </span>
            ) : (
              "Daftar"
            )}
            {!loading && (
              <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}
          </motion.button>
        </motion.form>

        {/* Link ke Login */}
        <motion.p
          variants={childVariants}
          className="mt-8 text-center text-sm text-gray-600"
        >
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
          >
            Masuk sekarang
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Register;