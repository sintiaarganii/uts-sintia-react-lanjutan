import Header from "./Header";
import { FaReact, FaNodeJs, FaDatabase, FaGithub } from "react-icons/fa";
import { SiExpress, SiPostgresql, SiTailwindcss } from "react-icons/si";

const About = () => {
  const technologies = [
    {
      name: "React",
      icon: <FaReact className="text-4xl text-blue-500" />,
      description: "Library JavaScript untuk membangun antarmuka pengguna",
      color: "bg-blue-50",
    },
    {
      name: "Express.js",
      icon: <SiExpress className="text-4xl text-gray-700" />,
      description: "Framework Node.js untuk backend API",
      color: "bg-gray-50",
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql className="text-4xl text-blue-600" />,
      description: "Database relasional yang handal dan scalable",
      color: "bg-blue-50",
    },
    {
      name: "Node.js",
      icon: <FaNodeJs className="text-4xl text-green-600" />,
      description: "Runtime JavaScript untuk server-side",
      color: "bg-green-50",
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="text-4xl text-teal-500" />,
      description: "Framework CSS untuk desain yang responsif",
      color: "bg-teal-50",
    },
  ];

  const features = [
    {
      title: "CRUD Operations",
      description:
        "Create, Read, Update, Delete data mahasiswa dengan mudah",
    },
    {
      title: "Authentication",
      description: "Sistem login yang aman dengan JWT tokens",
    },
    {
      title: "Responsive Design",
      description: "Tampilan yang optimal di semua perangkat",
    },
    {
      title: "RESTful API",
      description: "Backend API yang terstruktur dan efisien",
    },
  ];

  const teamMembers = [
    {
      name: "Tim Pengembang",
      role: "Full Stack Developer",
      description: "Pengembang utama aplikasi ini",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tentang Aplikasi
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Sistem Informasi Akademik untuk mengelola data mahasiswa dengan
              teknologi modern dan antarmuka yang user-friendly
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Deskripsi Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Apa itu Siakad Mahasiswa?
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Siakad Mahasiswa adalah aplikasi manajemen data mahasiswa yang 
            dibangun dengan teknologi modern. Aplikasi ini memungkinkan 
            pengguna untuk melakukan operasi CRUD (Create, Read, Update, Delete) 
            pada data mahasiswa dengan mudah dan efisien.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg mt-4">
            Dibangun menggunakan React untuk frontend, Express.js untuk backend,
            dan PostgreSQL sebagai database, aplikasi ini menawarkan performa
            yang cepat, keamanan yang baik, dan pengalaman pengguna yang optimal.
          </p>
        </div>

        {/* Technologies Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Teknologi yang Digunakan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className={`${tech.color} rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200`}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {tech.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Fitur Aplikasi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 flex items-start space-x-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <span className="text-indigo-600 font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Arsitektur Aplikasi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-semibold text-indigo-600 mb-2">Frontend</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• React.js</li>
                <li>• Tailwind CSS</li>
                <li>• Axios</li>
                <li>• React Router</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-semibold text-indigo-600 mb-2">Backend</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Node.js</li>
                <li>• Express.js</li>
                <li>• JWT Auth</li>
                <li>• REST API</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-semibold text-indigo-600 mb-2">Database</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• PostgreSQL</li>
                <li>• SQL</li>
                <li>• Data Relations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Tim Pengembang
          </h2>
          <div className="flex justify-center">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all text-center max-w-sm"
              >
                <div className="w-24 h-24 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl text-indigo-600 font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {member.name}
                </h3>
                <p className="text-indigo-600 text-sm mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Section */}
        <div className="bg-gray-900 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Open Source</h2>
              <p className="text-gray-300">
                Aplikasi ini bersifat open source. Lihat kode sumbernya di GitHub!
              </p>
            </div>
            <a
              href="https://github.com/yourusername/siakad-mahasiswa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <FaGithub className="text-2xl" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2024 Siakad Mahasiswa. All rights reserved.</p>
          <p className="mt-2">
            Version 1.0.0 | Dibuat dengan ❤️ menggunakan React, Express, dan PostgreSQL
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;