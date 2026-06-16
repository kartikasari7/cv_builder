import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password harus diisi." },
        { status: 400 },
      );
    }

    const db = await getDb();
    const users = db.collection("users");

    const user = await users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Email atau password salah." },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Email atau password salah." },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return NextResponse.json(
      {
        message: "Login berhasil.",
        token,
        user: {
          id: user._id.toString(),
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          jobTitle: user.jobTitle || "",
          location: user.location || "",
          about: user.about || "",
          photo: user.photo || "",
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("LOGIN API ERROR:", error);

    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }
}
