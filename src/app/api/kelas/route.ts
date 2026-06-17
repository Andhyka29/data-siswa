import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { pool } from "@/lib/db";

export async function GET() {
    const kelas = await prisma.kelas.findMany({ orderBy: { id: "asc"} });
    return Response.json(kelas);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { namaKelas, waliKelas } = body;

    if (!namaKelas || !waliKelas) {
        return Response.json({ error: "Nama Kelas dan Wali Kelas harus diisi!"}, { status: 400 })
    }

    const [result]: any = await pool.execute(
        `INSERT INTO Kelas (namaKelas, waliKelas) VALUES (?, ?)`,
        [namaKelas, waliKelas]
    );

    const kelas = await prisma.kelas.findUnique({where: { id: result.insertId }});
    return Response.json(kelas, { status: 201 })
}
