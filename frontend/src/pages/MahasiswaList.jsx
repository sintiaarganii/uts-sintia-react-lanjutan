import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaInfoCircle, FaToggleOn, FaToggleOff, FaPlus } from "react-icons/fa";
import Header from "./Header";

const MahasiswaList = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMahasiswa, setNewMahasiswa] = useState({
    name: "",
    nim: "",
    jurusan: "",
    ipk: "",
    isactive: true
  });

  const API = "http://localhost:3000/api/mahasiswa";

  /* ================= GET DATA ================= */
  const getMahasiswa = async () => {
    try {
      const res = await axios.get(API, { withCredentials: true });
      setMahasiswa(res.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Memuat Data",
        text: err.response?.data?.message || "Terjadi kesalahan pada server",
      });
    }
  };

  useEffect(() => {
    getMahasiswa();
  }, []);

  /* ================= TAMBAH MAHASISWA ================= */
  const addMahasiswa = async () => {
    // Validasi input
    if (!newMahasiswa.name || !newMahasiswa.nim || !newMahasiswa.jurusan || !newMahasiswa.ipk) {
      Swal.fire({
        icon: "warning",
        title: "Lengkapi Data",
        text: "Semua field harus diisi!",
      });
      return;
    }

    if (newMahasiswa.ipk < 0 || newMahasiswa.ipk > 4) {
      Swal.fire({
        icon: "warning",
        title: "IPK Tidak Valid",
        text: "IPK harus antara 0 - 4",
      });
      return;
    }

    try {
      // Tampilkan loading
      Swal.fire({
        title: "Menyimpan...",
        text: "Mohon tunggu sebentar",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await axios.post(API, newMahasiswa, {
        withCredentials: true,
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data mahasiswa berhasil ditambahkan",
        timer: 2000,
        showConfirmButton: true,
      });

      // Reset form dan tutup modal
      setNewMahasiswa({
        name: "",
        nim: "",
        jurusan: "",
        ipk: "",
        isactive: true
      });
      setShowAddModal(false);
      getMahasiswa();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Menambah Data",
        text: err.response?.data?.message || "Terjadi kesalahan pada server",
      });
    }
  };

  /* ================= DELETE ================= */
  const deleteMahasiswa = async (id, name) => {
    const result = await Swal.fire({
      title: "Hapus Mahasiswa?",
      text: `Apakah Anda yakin ingin menghapus ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: "Menghapus...",
          text: "Mohon tunggu sebentar",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await axios.delete(`${API}/${id}`, { withCredentials: true });

        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: `Mahasiswa ${name} berhasil dihapus`,
          timer: 2000,
          showConfirmButton: true,
        });

        getMahasiswa();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal Menghapus",
          text: err.response?.data?.message || "Terjadi kesalahan pada server",
        });
      }
    }
  };

  /* ================= UPDATE ================= */
  const updateMahasiswa = async () => {
    try {
      Swal.fire({
        title: "Menyimpan...",
        text: "Mohon tunggu sebentar",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await axios.put(`${API}/${editData.id}`, editData, {
        withCredentials: true,
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data mahasiswa berhasil diperbarui",
        timer: 2000,
        showConfirmButton: true,
      });

      setEditData(null);
      getMahasiswa();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Memperbarui",
        text: err.response?.data?.message || "Terjadi kesalahan pada server",
      });
    }
  };

  /* ================= TOGGLE STATUS ================= */
  const toggleStatus = async (id, currentStatus, name) => {
    const newStatus = !currentStatus;
    const action = newStatus ? "mengaktifkan" : "menonaktifkan";

    const result = await Swal.fire({
      title: `${newStatus ? "Aktifkan" : "Nonaktifkan"} Mahasiswa?`,
      text: `Apakah Anda yakin ingin ${action} ${name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Lanjutkan!",
      cancelButtonText: "Batal",
      confirmButtonColor: newStatus ? "#10b981" : "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: "Memproses...",
          text: "Mohon tunggu sebentar",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await axios.patch(
          `${API}/${id}/status`,
          { isactive: newStatus },
          { withCredentials: true }
        );

        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: `Status mahasiswa ${name} telah ${action}`,
          timer: 2000,
          showConfirmButton: true,
        });

        getMahasiswa();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengubah Status",
          text: err.response?.data?.message || "Terjadi kesalahan pada server",
        });
      }
    }
  };

  /* ================= LIHAT DETAIL ================= */
  const viewDetail = (m) => {
    Swal.fire({
      title: "Detail Mahasiswa",
      html: `
        <div class="text-left">
          <p><strong>Nama:</strong> ${m.name}</p>
          <p><strong>NIM:</strong> ${m.nim}</p>
          <p><strong>Jurusan:</strong> ${m.jurusan}</p>
          <p><strong>IPK:</strong> ${m.ipk}</p>
          <p><strong>Status:</strong> ${
            m.isactive 
              ? '<span class="text-green-600">Aktif</span>' 
              : '<span class="text-red-600">Tidak Aktif</span>'
          }</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Tutup",
      confirmButtonColor: "#3b82f6",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Daftar Mahasiswa</h1>
            <p className="mt-2 text-sm text-gray-600">
              Total {mahasiswa.length} mahasiswa terdaftar
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => {
                Swal.fire({
                  icon: "info",
                  title: "Informasi",
                  text: "Halaman ini menampilkan data mahasiswa. Klik tombol aksi untuk mengelola data.",
                });
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Bantuan
            </button>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <FaPlus />
              <span>Tambah Mahasiswa</span>
            </button>
          </div>
        </div>

        {/* GRID 3 KOLOM */}
        {mahasiswa.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-gray-500 text-lg mb-4">Belum ada data mahasiswa</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaPlus />
              <span>Tambah Mahasiswa Pertama</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mahasiswa.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100"
              >
                <div className="p-6">
                  {/* Header Card */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="font-bold text-xl text-gray-800">{m.name}</h2>
                      <p className="text-sm text-gray-500 font-mono mt-1">{m.nim}</p>
                    </div>
                    <button
                      onClick={() => toggleStatus(m.id, m.isactive, m.name)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                        m.isactive
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      {m.isactive ? (
                        <>
                          <FaToggleOn className="text-sm" />
                          Active
                        </>
                      ) : (
                        <>
                          <FaToggleOff className="text-sm" />
                          Inactive
                        </>
                      )}
                    </button>
                  </div>

                  {/* Info Tambahan */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Jurusan:</span>
                      <span className="font-medium text-gray-800">{m.jurusan}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">IPK:</span>
                      <span className="font-medium text-gray-800">{m.ipk}</span>
                    </div>
                  </div>

                  {/* ACTION BUTTON */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => viewDetail(m)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <FaInfoCircle className="text-sm" />
                      <span className="text-sm font-medium">Detail</span>
                    </button>

                    <button
                      onClick={() => setEditData(m)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors"
                    >
                      <FaEdit className="text-sm" />
                      <span className="text-sm font-medium">Edit</span>
                    </button>

                    <button
                      onClick={() => deleteMahasiswa(m.id, m.name)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <FaTrash className="text-sm" />
                      <span className="text-sm font-medium">Hapus</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= MODAL TAMBAH MAHASISWA ================= */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Tambah Mahasiswa Baru
                  </h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                      placeholder="Masukkan nama lengkap"
                      value={newMahasiswa.name}
                      onChange={(e) =>
                        setNewMahasiswa({ ...newMahasiswa, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NIM <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                      placeholder="Masukkan NIM"
                      value={newMahasiswa.nim}
                      onChange={(e) =>
                        setNewMahasiswa({ ...newMahasiswa, nim: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Jurusan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                      placeholder="Masukkan jurusan"
                      value={newMahasiswa.jurusan}
                      onChange={(e) =>
                        setNewMahasiswa({ ...newMahasiswa, jurusan: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      IPK <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                      placeholder="Masukkan IPK (0 - 4)"
                      value={newMahasiswa.ipk}
                      onChange={(e) =>
                        setNewMahasiswa({ ...newMahasiswa, ipk: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status Awal
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="status"
                          checked={newMahasiswa.isactive === true}
                          onChange={() =>
                            setNewMahasiswa({ ...newMahasiswa, isactive: true })
                          }
                          className="w-4 h-4 text-green-600"
                        />
                        <span className="text-green-600">Aktif</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="status"
                          checked={newMahasiswa.isactive === false}
                          onChange={() =>
                            setNewMahasiswa({ ...newMahasiswa, isactive: false })
                          }
                          className="w-4 h-4 text-red-600"
                        />
                        <span className="text-red-600">Tidak Aktif</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={addMahasiswa}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Simpan
                  </button>

                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= MODAL EDIT MAHASISWA ================= */}
        {editData && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Edit Mahasiswa
                  </h2>
                  <button
                    onClick={() => setEditData(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NIM
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
                      value={editData.nim}
                      onChange={(e) =>
                        setEditData({ ...editData, nim: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Jurusan
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
                      value={editData.jurusan}
                      onChange={(e) =>
                        setEditData({ ...editData, jurusan: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      IPK
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
                      value={editData.ipk}
                      onChange={(e) =>
                        setEditData({ ...editData, ipk: parseFloat(e.target.value) })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="editStatus"
                          checked={editData.isactive === true}
                          onChange={() =>
                            setEditData({ ...editData, isactive: true })
                          }
                          className="w-4 h-4 text-green-600"
                        />
                        <span className="text-green-600">Aktif</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="editStatus"
                          checked={editData.isactive === false}
                          onChange={() =>
                            setEditData({ ...editData, isactive: false })
                          }
                          className="w-4 h-4 text-red-600"
                        />
                        <span className="text-red-600">Tidak Aktif</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={updateMahasiswa}
                    className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => setEditData(null)}
                    className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MahasiswaList;