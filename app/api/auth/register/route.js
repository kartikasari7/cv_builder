import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan password harus diisi." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password minimal 8 karakter." },
        { status: 400 },
      );
    }

    const db = await getDb();
    const users = db.collection("users");

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar." },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      phone: "",
      jobTitle: "",
      location: "",
      about: "",
      photo: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await users.insertOne(newUser);

    return NextResponse.json(
      {
        message: "Registrasi berhasil. Silakan login.",
        user: {
          id: result.insertedId.toString(),
          name,
          email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("REGISTER API ERROR:", error);

    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }
}
