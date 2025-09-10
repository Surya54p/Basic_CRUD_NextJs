"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function MoreActionPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const id = params.id;

  // GET user by ID
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${id}`);
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      } else {
        alert("User not found");
      }
    };
    fetchUser();
  }, [id]);

  // UPDATE user
  const handleUpdate = async () => {
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    if (res.ok) {
      alert("User updated!");
      router.back();
    } else {
      alert("Failed to update user");
    }
  };

  // DELETE user
  const handleDelete = async () => {
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("User deleted!");
      router.back();
    } else {
      alert("Failed to delete user");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">More Actions</h1>

      <div className="mb-4 space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
