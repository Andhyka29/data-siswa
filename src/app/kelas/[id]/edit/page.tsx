"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditStudentPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [namaKelas, setNamaKelas] = useState("");
    const [waliKelas, setWaliKelas] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/kelas/${id}`)
        .then((r) => r.json())
        .then((data) => {
            setNamaKelas(data.namaKelas);
            setWaliKelas(data.waliKelas);
            setLoading(false);
        });
    }, [id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        const res = await fetch(`/api/kelas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ namaKelas, waliKelas }),
        });

        if (!res.ok) {
        const data = await res.json();
        setError(data.error);
        return;
        }

        router.push("/kelas");
    }

    if (loading) return <p>Memuat...</p>;

    return (
        <div>
        <div className="nav">
            <Link href="/kelas">← Kembali</Link>
        </div>

        <h1>Edit Kelas</h1>
        <br />

        <form onSubmit={handleSubmit}>
            <label>Nama</label>
            <input
            type="text"
            value={namaKelas}
            onChange={(e) => setNamaKelas(e.target.value)}
            />
            <label>Kelas</label>
            <input
            type="text"
            value={waliKelas}
            onChange={(e) => setWaliKelas(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Simpan Perubahan</button>
        </form>
        </div>
    );
}