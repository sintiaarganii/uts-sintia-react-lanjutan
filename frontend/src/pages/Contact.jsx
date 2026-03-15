import Header from "./Header";
import { FaUser, FaCalendarAlt, FaLaptopCode, FaChalkboardTeacher, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const personalInfo = [
    {
      icon: <FaUser className="text-indigo-600" />,
      label: "Nama Lengkap",
      value: "Sintia Dwi Argani",
      bgColor: "bg-indigo-50",
    },
    {
      icon: <FaCalendarAlt className="text-pink-600" />,
      label: "Tempat, Tanggal Lahir",
      value: "Jakarta, 16 Agustus 2005",
      bgColor: "bg-pink-50",
    },
    {
      icon: <FaLaptopCode className="text-green-600" />,
      label: "Pelatihan",
      value: "React Lanjutan",
      bgColor: "bg-green-50",
    },
    {
      icon: <FaChalkboardTeacher className="text-purple-600" />,
      label: "Instruktur",
      value: "Ikmal Fao",
      bgColor: "bg-purple-50",
    },
  ];

  const contactMethods = [
    {
      icon: <FaEnvelope className="text-xl" />,
      label: "Email",
      value: "sintia.dwi@example.com",
      link: "mailto:sintia.dwi@example.com",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <FaPhone className="text-xl" />,
      label: "Telepon",
      value: "+62 812-3456-7890",
      link: "tel:+6281234567890",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <FaMapMarkerAlt className="text-xl" />,
      label: "Alamat",
      value: "Jakarta, Indonesia",
      link: "#",
      color: "bg-blue-100 text-blue-600",
    },
  ];

  const socialMedia = [
    {
      icon: <FaGithub className="text-2xl" />,
      name: "GitHub",
      username: "@sintiadwi",
      link: "https://github.com/sintiadwi",
      color: "bg-gray-800 hover:bg-gray-900",
    },
    {
      icon: <FaLinkedin className="text-2xl" />,
      name: "LinkedIn",
      username: "in/sintiadwi",
      link: "https://linkedin.com/in/sintiadwi",
      color: "bg-blue-600 hover:bg-blue-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur rounded-full mb-6 border-4 border-white/20">
              <FaUser className="text-4xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Person
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Hubungi saya untuk informasi lebih lanjut tentang pelatihan React Lanjutan
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12 transform hover:scale-[1.02] transition-all duration-300">
          <div className="md:flex">
            {/* Left Column - Photo */}
            <div className="md:w-1/3 bg-gradient-to-br from-indigo-600 to-purple-600 p-8 flex flex-col items-center justify-center">
              <div className="w-40 h-40 bg-white/10 backdrop-blur rounded-full mb-4 flex items-center justify-center border-4 border-white/20">
                <span className="text-6xl text-white font-bold">S</span>
              </div>
              <h2 className="text-2xl font-bold text-white text-center">
                Sintia Dwi Argani
              </h2>
              <p className="text-indigo-200 text-center mt-2">
                Peserta React Lanjutan
              </p>
            </div>

            {/* Right Column - Info */}
            <div className="md:w-2/3 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Informasi Pribadi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {personalInfo.map((info, index) => (
                  <div
                    key={index}
                    className={`${info.bgColor} rounded-xl p-4 hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{info.icon}</div>
                      <div>
                        <p className="text-sm text-gray-600">{info.label}</p>
                        <p className="font-semibold text-gray-900">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Kontak Saya
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {method.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">
                    {method.label}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{method.value}</p>
                  <span className="text-indigo-600 text-sm font-medium group-hover:text-indigo-700">
                    Hubungi →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Media Sosial
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group`}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 p-3 rounded-lg group-hover:scale-110 transition-transform">
                    {social.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{social.name}</h3>
                    <p className="text-white/80 text-sm">{social.username}</p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Message Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Kirim Pesan
          </h2>
          <form className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="Masukkan nama Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="Masukkan email Anda"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subjek
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="Masukkan subjek pesan"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pesan
              </label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="Tulis pesan Anda di sini..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Kirim Pesan
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="bg-gray-900 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Lokasi</h2>
              <p className="text-gray-300 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-400" />
                Jakarta, Indonesia
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Tersedia untuk kolaborasi dan diskusi
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-sm text-gray-300">
                Waktu Respons: 24-48 jam
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2024 Sintia Dwi Argani. All rights reserved.</p>
          <p className="mt-2">
            Dibuat dengan ❤️ untuk pelatihan React Lanjutan bersama Instruktur Ikmal Fao
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;