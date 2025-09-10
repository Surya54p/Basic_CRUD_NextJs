"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // GET users
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // POST new user
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      const newUser = await res.json();
      setUsers((prev) => [...prev, newUser]);
      setName("");
      setEmail("");
    } else {
      alert("❌ Gagal menambah user");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {/* Form Tambah User */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Tambah User
        </button>
      </form>
      {/* List User */}
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="border p-2 rounded flex justify-between items-center">
            <div>
              <strong>{user.name}</strong> <br />
              <span className="text-sm text-gray-600">{user.email}</span>
            </div>

            <div className="flex gap-2">
              {/* Button Edit */}
              <a
                href={`/moreAction/${user.id}`}
                className="bg-indigo-500 hover:bg-indigo-700 text-white px-3 py-1 rounded "
              >
                Action
              </a>
              {/* Button Hapus */}
              {/* <a href={`/moreAction/${user.id}`} className="bg-red-600  px-3 py-1 rounded text-white hover:bg-red-700">
                Hapus
              </a> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
