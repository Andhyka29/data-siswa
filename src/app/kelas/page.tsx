"use client"

import { useEffect, useState } from "react";
import Link from "next/link"

type Kelas = {
    id:             number,
    namaKelas:      string,
    waliKelas:      string,
} 

export default function KelasPage() {
    const [kelas, setKelas] = useState<Kelas[]>([]);
    const [namaKelas, setNamaKelas] = useState("");
    const [waliKelas, setWaliKelas] = useState("");
    const [error, setError] = useState("");

    async function loadKelas() {
        const res = await fetch("/api/kelas");
        const data = await res.json();
        setKelas(data);
    }
    
    useEffect(() => {
        const loadKelas = async () => {
            try {
            const res = await fetch("/api/kelas");
            const data = await res.json();
            setKelas(data);
            } catch (error) {
            console.error("Gagal mengambil data:", error);
            }
        };

        loadKelas();
    }, []); 

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/kelas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ namaKelas, waliKelas }),
        });

        if (!res.ok) {
        const data = await res.json();
        setError(data.error);
        return;
        }

        setNamaKelas("");
        setWaliKelas("");
        loadKelas();
    }

    async function handleDelete(id: number) {
        if (!confirm("Yakin ingin menghapus siswa ini?")) return;
        await fetch(`/api/kelas/${id}`, { method: "DELETE" });
        loadKelas();
    }

    return (
        <div>
        <div className="nav">
            <Link href="/">← Beranda</Link>
        </div>
        
        <h1>Data Kelas</h1>
        <br />

        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Nama Kelas</th>
                <th>Wali Kelas</th>
                <th>Aksi</th>
            </tr>
            </thead>
            <tbody>
            {kelas.length === 0 && (
                <tr>
                <td colSpan={4}>Belum ada data siswa.</td>
                </tr>
            )}
            {kelas.map((s) => (
                <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.namaKelas}</td>
                <td>{s.waliKelas}</td>
                <td className="actions">
                    <Link href={`/students/${s.id}/edit`}>
                    <button>Edit</button>
                    </Link>
                    <button className="danger" onClick={() => handleDelete(s.id)}>
                    Hapus
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        <br />
        <h2>Tambah Siswa</h2>
        <br />

        <form onSubmit={handleSubmit}>
            <label>Nama</label>
            <input
            type="text"
            value={namaKelas}
            onChange={(e) => setNamaKelas(e.target.value)}
            placeholder="Contoh: Ahmad"
            />
            <label>Kelas</label>
            <input
            type="text"
            value={waliKelas}
            onChange={(e) => setWaliKelas(e.target.value)}
            placeholder="Contoh: A"
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Simpan</button>
        </form>
        </div>
    );
}
