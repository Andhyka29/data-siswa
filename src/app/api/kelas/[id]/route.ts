import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { pool } from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const kelas = await prisma.kelas.findUnique({ where: { id: Number(id) } });
    if (!kelas) return Response.json({ error: "Tidak ditemukan" }, { status: 404 });
    return Response.json(kelas);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await req.json();
    const { name, class: cls } = body;

    if (!name || !cls) {
        return Response.json({ error: "Name dan class wajib diisi" }, { status: 400 });
    }

    const kelas = await prisma.kelas.update({
        where: { id: Number(id) },
        data: { name, class: cls },
    });
    return Response.json(kelas);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await pool.execute("DELETE FROM Kelas WHERE id = ?", [id]);
    return Response.json({ message: "Kelas dihapus" });
}