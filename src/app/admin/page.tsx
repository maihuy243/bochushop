"use client";

import { useEffect, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/hooks/useAllProduct";
import { Product } from "@/data/products";
import { useRouter } from "next/navigation";
import { createProduct, deleteProduct, updateProduct } from "@/lib/apis";

// ==================== Product Modal ====================
function ProductModal({
  open,
  onClose,
  form,
  setForm,
  onSubmit,
  title,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  form: Partial<Product>;
  setForm: (p: Partial<Product>) => void;
  onSubmit: () => void;
  title: string;
  loading: boolean;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-2/3 max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
          {/* Header */}
          <div className="mb-6 border-b pb-4">
            <Dialog.Title className="text-2xl font-bold">
              {title}
            </Dialog.Title>
            {form.title && (
              <p className="text-gray-500 mt-1 text-sm italic">
                Đang chỉnh: {form.title}
              </p>
            )}
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="flex flex-col gap-6"
          >
            {/* Thông tin chính */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Thông tin chính</h3>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Tên sản phẩm">
                  <Input
                    value={form.title || ""}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </Field>
                <Field label="Giá">
                  <Input
                    type="number"
                    value={form.price ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, price: Number(e.target.value) })
                    }
                  />
                </Field>
                <Field label="Tiền tệ">
                  <Input
                    value={form.currency || ""}
                    onChange={(e) =>
                      setForm({ ...form, currency: e.target.value })
                    }
                  />
                </Field>
                <Field label="Order hiển thị">
                  <Input
                    type="number"
                    value={form.order ?? 0}
                    onChange={(e) =>
                      setForm({ ...form, order: Number(e.target.value) })
                    }
                  />
                </Field>
                <Field label="SKU">
                  <Input
                    value={form.sku || ""}
                    onChange={(e) =>
                      setForm({ ...form, sku: e.target.value })
                    }
                  />
                </Field>
                <Field label="Tồn kho">
                  <Input
                    type="number"
                    value={form.stock ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, stock: Number(e.target.value) })
                    }
                  />
                </Field>
              </div>
              <Field label="Mô tả">
                <textarea
                  className="border rounded p-3 w-full"
                  rows={3}
                  value={form.description || ""}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </Field>
            </section>

            {/* Ảnh */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Ảnh sản phẩm</h3>
              <div className="flex gap-3 overflow-x-auto mb-4">
                {form.images?.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img}
                      alt="preview"
                      className="h-24 w-24 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          images: form.images?.filter((_, idx) => idx !== i),
                        })
                      }
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-1.5 py-0.5"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <Input
                placeholder="Thêm link ảnh mới (Enter)"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (e.currentTarget.value.trim()) {
                      setForm({
                        ...form,
                        images: [
                          ...(form.images || []),
                          e.currentTarget.value.trim(),
                        ],
                      });
                      e.currentTarget.value = "";
                    }
                  }
                }}
              />
            </section>

            {/* Badges */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Badges</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.badges?.map((badge, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-sm"
                  >
                    {badge}
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          badges: form.badges?.filter((_, idx) => idx !== i),
                        })
                      }
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <Input
                placeholder="Thêm badge mới (Enter)"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (e.currentTarget.value.trim()) {
                      setForm({
                        ...form,
                        badges: [
                          ...(form.badges || []),
                          e.currentTarget.value.trim(),
                        ],
                      });
                      e.currentTarget.value = "";
                    }
                  }
                }}
              />
            </section>

            {/* Specs */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Thông số kỹ thuật (Specs)</h3>
              <div className="flex flex-col gap-3">
                {form.specs?.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      placeholder="Label"
                      value={s.label}
                      onChange={(e) => {
                        const newSpecs = [...(form.specs || [])];
                        newSpecs[i].label = e.target.value;
                        setForm({ ...form, specs: newSpecs });
                      }}
                    />
                    <Input
                      placeholder="Value"
                      value={s.value}
                      onChange={(e) => {
                        const newSpecs = [...(form.specs || [])];
                        newSpecs[i].value = e.target.value;
                        setForm({ ...form, specs: newSpecs });
                      }}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="min-w-[60px]"
                      onClick={() =>
                        setForm({
                          ...form,
                          specs: form.specs?.filter((_, idx) => idx !== i),
                        })
                      }
                    >
                      Xóa
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() =>
                  setForm({
                    ...form,
                    specs: [...(form.specs || []), { label: "", value: "" }],
                  })
                }
              >
                + Thêm thông số
              </Button>
            </section>

            {/* Sizes */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Kích thước (Sizes)</h3>
              <div className="flex flex-col gap-3">
                {form.size?.map((s, i) => (
                  <div key={i} className="grid grid-cols-5 gap-2 items-center">
                    <Input
                      placeholder="Label"
                      value={s.label}
                      onChange={(e) => {
                        const newSize = [...(form.size || [])];
                        newSize[i].label = e.target.value;
                        setForm({ ...form, size: newSize });
                      }}
                    />
                    <Input
                      type="number"
                      placeholder="Giá"
                      value={s.price}
                      onChange={(e) => {
                        const newSize = [...(form.size || [])];
                        newSize[i].price = Number(e.target.value);
                        setForm({ ...form, size: newSize });
                      }}
                    />
                    <Input
                      placeholder="SKU"
                      value={s.sku}
                      onChange={(e) => {
                        const newSize = [...(form.size || [])];
                        newSize[i].sku = e.target.value;
                        setForm({ ...form, size: newSize });
                      }}
                    />
                    <Input
                      type="number"
                      placeholder="Tồn kho"
                      value={s.stock}
                      onChange={(e) => {
                        const newSize = [...(form.size || [])];
                        newSize[i].stock = Number(e.target.value);
                        setForm({ ...form, size: newSize });
                      }}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="min-w-[60px]"
                      onClick={() =>
                        setForm({
                          ...form,
                          size: form.size?.filter((_, idx) => idx !== i),
                        })
                      }
                    >
                      Xóa
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() =>
                  setForm({
                    ...form,
                    size: [...(form.size || []), { label: "", price: 0, sku: "", stock: 0 }],
                  })
                }
              >
                + Thêm size
              </Button>
            </section>


            {/* Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-6"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700 px-6"
                disabled={loading}
              >
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ================ Helper for label + input ================
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      {children}
    </div>
  );
}

// ==================== Admin Page ====================
export default function AdminPage() {
  const { data: products, isLoading } = useProducts();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<Product>>({});
  const [editing, setEditing] = useState<Product | null>(null);

  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const expireAt = localStorage.getItem("admin-auth");

    if (!expireAt) {
      router.replace("/auth");
      return;
    }

    const now = Date.now();
    if (now > Number(expireAt)) {
      localStorage.removeItem("admin-auth");
      router.replace("/auth");
      return;
    }

    // xong hết thì cho render children
    setChecked(true);
  }, [router]);

  const createMutation = useMutation({
    mutationFn: (newProd: Partial<Product>) => createProduct(newProd),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Product> }) =>
      updateProduct(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });


  if (!checked) {
    return null; // chờ check xong rồi mới render
  }
  if (isLoading) return <p className="p-6">Đang tải sản phẩm...</p>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <Button
          onClick={() => {
            setForm({});
            setEditing(null);
            setOpen(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          + Thêm sản phẩm
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">
                Tên
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">
                Giá
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">
                Tồn kho
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">
                Order
              </th>
              <th className="p-3 text-center text-sm font-semibold text-gray-600">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((p: Product) => (
              <tr
                key={p.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{p.title}</td>
                <td className="p-3">
                  {p.price} {p.currency}
                </td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3">{p.order ?? 0}</td>
                <td className="p-3 flex justify-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditing(p);
                      setForm(p);
                      setOpen(true);
                    }}
                  >
                    Sửa
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      if (confirm("Xóa sản phẩm này?")) {
                        deleteMutation.mutate(p.id);
                      }
                    }}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <ProductModal
          open={open}
          onClose={() => setOpen(false)}
          form={form}
          setForm={setForm}
          onSubmit={() => {
            if (editing) {
              updateMutation.mutate({ id: editing.id, updates: form });
            } else {
              createMutation.mutate(form);
            }
          }}
          title={editing ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          loading={updateMutation.isPending  || createMutation.isPending }
        />
      )}
    </div>
  );
}
