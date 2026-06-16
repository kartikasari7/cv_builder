import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

function getTokenFromRequest(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.split(" ")[1];
}

function verifyToken(req) {
  const token = getTokenFromRequest(req);

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export async function GET(req) {
  try {
    const decoded = verifyToken(req);

    if (!decoded) {
      return NextResponse.json(
        { error: "Token tidak valid atau belum login." },
        { status: 401 },
      );
    }

    const db = await getDb();
    const users = db.collection("users");

    const user = await users.findOne(
      { _id: new ObjectId(decoded.id) },
      {
        projection: {
          password: 0,
        },
      },
    );

    if (!user) {
      return NextResponse.json(
        { error: "User tidak ditemukan." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
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
    console.error("GET PROFILE ERROR:", error);

    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil profil." },
      { status: 500 },
    );
  }
}

export async function PUT(req) {
  try {
    const decoded = verifyToken(req);

    if (!decoded) {
      return NextResponse.json(
        { error: "Token tidak valid atau belum login." },
        { status: 401 },
      );
    }

    const { name, email, phone, jobTitle, location, about, photo } =
      await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Nama dan email wajib diisi." },
        { status: 400 },
      );
    }

    const db = await getDb();
    const users = db.collection("users");

    const userId = new ObjectId(decoded.id);

    const existingEmail = await users.findOne({
      email,
      _id: { $ne: userId },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email sudah digunakan oleh akun lain." },
        { status: 409 },
      );
    }

    const updateData = {
      name,
      email,
      phone: phone || "",
      jobTitle: jobTitle || "",
      location: location || "",
      about: about || "",
      photo: photo || "",
      updatedAt: new Date(),
    };

    await users.updateOne({ _id: userId }, { $set: updateData });

    const updatedUser = await users.findOne(
      { _id: userId },
      {
        projection: {
          password: 0,
        },
      },
    );

    return NextResponse.json(
      {
        message: "Profil berhasil diperbarui.",
        user: {
          id: updatedUser._id.toString(),
          name: updatedUser.name || "",
          email: updatedUser.email || "",
          phone: updatedUser.phone || "",
          jobTitle: updatedUser.jobTitle || "",
          location: updatedUser.location || "",
          about: updatedUser.about || "",
          photo: updatedUser.photo || "",
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    return NextResponse.json(
      { error: "Terjadi kesalahan saat memperbarui profil." },
      { status: 500 },
    );
  }
}
