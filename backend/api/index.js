import express from "express";
import cors from "cors";
import connection from "./database.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { verifyToken } from "./middleware/auth.js";
dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Middleware
app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/* ================= REGISTER ================= */
app.post("/api/register", async (req, res) => {
  const { gmail, username, password } = req.body;

  if (!gmail || !username || !password) {
    return res.status(400).json({ message: "Semua field wajib diisi!" });
  }

  try {
    // Cek apakah user sudah ada
    const checkUser = await connection.query(
      "SELECT * FROM users WHERE username = $1 OR gmail = $2",
      [username, gmail],
    );

    if (checkUser.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Username atau Gmail sudah digunakan!" });
    }

    const hashedPassword = await argon2.hash(password);

    const result = await connection.query(
      "INSERT INTO users (gmail, username, password) VALUES ($1, $2, $3) RETURNING gmail, username",
      [gmail, username, hashedPassword],
    );

    res.status(201).json({
      message: "Registrasi berhasil!",
      user: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= LOGIN ================= */
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await connection.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    const user = result.rows[0];

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      return res.status(401).json({ message: "Password salah!" });
    }

    // Payload token (jangan kirim password!)
    const payload = {
      id: user.id,
      username: user.username,
      gmail: user.gmail,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.json({
      message: "Login berhasil!",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= GET ALL MAHASISWA ================= */
app.get("/api/mahasiswa", verifyToken, async (req, res) => {
  try {
    const result = await connection.query("SELECT * FROM mhs_tb ORDER BY id");

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= TAMBAH MAHASISWA ================= */
app.post("/api/mahasiswa", verifyToken, async (req, res) => {
  const { name, nim, jurusan, ipk, isactive } = req.body;

  try {
    const result = await connection.query(
      "INSERT INTO mhs_tb (name, nim, jurusan, ipk, isactive) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [name, nim, jurusan, ipk, isactive],
    );

    res.status(201).json({
      message: "Mahasiswa berhasil ditambahkan",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= UPDATE MAHASISWA ================= */
app.put("/api/mahasiswa/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, nim, jurusan, ipk, isactive } = req.body;

  try {
    const result = await connection.query(
      "UPDATE mhs_tb SET name=$1, nim=$2, jurusan=$3, ipk=$4, isactive=$5 WHERE id=$6 RETURNING *",
      [name, nim, jurusan, ipk, isactive, id],
    );

    res.json({
      message: "Mahasiswa berhasil diupdate",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= DELETE MAHASISWA ================= */
app.delete("/api/mahasiswa/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await connection.query("DELETE FROM mhs_tb WHERE id=$1", [id]);

    res.json({
      message: "Mahasiswa berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= TOGGLE STATUS ACTIVE ================= */
app.patch("/api/mahasiswa/status/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await connection.query(
      "UPDATE mhs_tb SET isactive = NOT isactive WHERE id=$1 RETURNING *",
      [id],
    );

    res.json({
      message: "Status mahasiswa berhasil diubah",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= LOGOUT ================= */
app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout berhasil!" });
});


app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

export default app;