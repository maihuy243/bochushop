"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AuthPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/check-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.success) {
      const expireAt = Date.now() + 6 * 60 * 60 * 1000; 
      localStorage.setItem("admin-auth", String(expireAt));
      console.log('redirect to admin page !');
      router.push("/admin");
    } else {
      setError("Sai mật khẩu");
    }

    setLoading(false);
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-8 shadow-lg w-[350px] flex flex-col gap-4"
      >
        <h1 className="text-xl font-bold text-center">Nhập mật khẩu</h1>
        <Input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Đang kiểm tra..." : "Đăng nhập"}
        </Button>
      </form>
    </div>
  );
}
