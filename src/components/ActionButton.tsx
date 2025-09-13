"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import Image from "next/image";
import { ZALO_LINK } from "./product/ProductDetailWithVariants";
import { toast } from "sonner";


export default function ActionButtons() {
    const [form, setForm] = useState({ name: "", phone: "" });
    const [loading, setLoading] = useState(false);

    const validatePhone = (value: string) => {
        const phoneRegex = /^(?:\+84|0)(?:\d){9,10}$/;
        return phoneRegex.test(value);
    };

    const handleZaloClick = () => {
        const zaloApp = "zalo://chat";
        window.location.href = zaloApp;
        setTimeout(() => {
            window.open(ZALO_LINK, "_blank");
        }, 1000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validatePhone(form.phone)) {
            toast.error("Số điện thoại không hợp lệ");
            return;
        }

        setLoading(true);
        try {
            await fetch("/api/callme", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            toast.success("Đã gửi thông tin liên hệ thành công!");
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra, thử lại sau!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-4">
            {/* Zalo Button */}
            <button
                onClick={handleZaloClick}
                className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center bg-white animate-shake hover:animate-none hover:scale-110 transition-transform"
            >
                <Image
                    src="/zalo.png"
                    alt="Zalo"
                    width={50}
                    height={50}
                />
            </button>

            {/* Call Me Button */}
            <Dialog>
                <DialogTrigger asChild>
                    <button className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center bg-green-500 text-white animate-shake hover:animate-none hover:scale-110 transition-transform">
                        <Phone size={32} />
                    </button>
                </DialogTrigger>
                <DialogContent className="p-6 bg-white rounded-xl shadow-lg w-[350px]">
                    <DialogTitle className="text-lg font-semibold mb-4">Để lại thông tin</DialogTitle>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <Input
                            placeholder="Tên của bạn"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                        <Input
                            placeholder="Số điện thoại"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            required
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            {loading ? "Đang gửi..." : "Gửi"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
