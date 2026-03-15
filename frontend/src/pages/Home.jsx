import Header from "./Header";
import { FaUserGraduate, FaBook, FaChartLine, FaUsers } from "react-icons/fa";

const Home = () => {
  // Data statistik contoh (bisa diganti dengan data real nantinya)
  const stats = [
    {
      icon: <FaUsers className="text-3xl text-blue-600" />,
      label: "Total Mahasiswa",
      value: "150",
      color: "bg-blue-50",
    },
    {
      icon: <FaUserGraduate className="text-3xl text-green-600" />,
      label: "Mahasiswa Aktif",
      value: "142",
      color: "bg-green-50",
    },
    {
      icon: <FaBook className="text-3xl text-purple-600" />,
      label: "Total Jurusan",
      value: "8",
      color: "bg-purple-50",
    },
    {
      icon: <FaChartLine className="text-3xl text-orange-600" />,
      label: "Rata-rata IPK",
      value: "3.45",
      color: "bg-orange-50",
    },
  ];

  const features = [
    {
      title: "Kelola Data Mahasiswa",
      description:
        "Tambahkan, edit, dan hapus data mahasiswa dengan mudah melalui antarmuka yang intuitif.",
      icon: "📝",
    },
    {
      title: "Informasi Lengkap",
      description:
        "Lihat detail lengkap mahasiswa termasuk NIM, jurusan, IPK, dan status aktif.",
      icon: "ℹ️",
    },
    {
      title: "Responsive Design",
      description:
        "Akses website dengan nyaman dari berbagai perangkat, baik desktop maupun mobile.",
      icon: "📱",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Selamat Datang di
              <span className="text-blue-600"> Siakad Mahasiswa</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sistem Informasi Akademik untuk mengelola data mahasiswa dengan
              mudah, cepat, dan efisien
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/mahasiswa"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <FaUsers className="mr-2" />
                Lihat Data Mahasiswa
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors border border-gray-300 shadow-lg hover:shadow-xl"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Statistics Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Statistik Mahasiswa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.color} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className="bg-white/50 p-3 rounded-full">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Fitur Unggulan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 md:px-12 text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">
                Siap untuk memulai?
              </h3>
              <p className="text-blue-100 text-lg">
                Kelola data mahasiswa Anda sekarang juga
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
              <a
                href="/mahasiswa"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Mulai Kelola Data
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>
            Website ini digunakan untuk mengelola data mahasiswa seperti
            menambahkan, mengubah, dan menghapus data mahasiswa dengan mudah dan
            efisien.
          </p>
          <p className="mt-2 text-gray-500">
            © 2024 Siakad Mahasiswa. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;