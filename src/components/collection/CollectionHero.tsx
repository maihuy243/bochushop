import { motion } from "motion/react";
import { ArrowLeft, Filter, Grid3x3, List } from "lucide-react";
import { Collection, parentCategories } from "../../data/products";
import { Breadcrumbs } from "../ui/Breadcrumbs";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CollectionHeroProps {
  collection: Collection;
  productCount: number;
}

export function CollectionHero({
  collection,
  productCount,
}: CollectionHeroProps) {
   const router = useRouter();

  const breadcrumbItems = [
    {
      label: "Trang chủ",
      onClick: () => router.push("/"),
    },
    {
      label: collection.title,
      active: true,
    },
  ];

  return (
    <div className="relative">
      <div className="aspect-[21/9] overflow-hidden max-h-[400px]">
        <Image
          src={collection.hero_image}
          alt={collection.title}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-102"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-white">
            {/* Breadcrumbs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4"
            >
              <div className="text-white/80">
                <Breadcrumbs
                  items={breadcrumbItems.map((item) => ({
                    ...item,
                    onClick: item.onClick,
                  }))}
                />
              </div>
            </motion.div>

            {/* Back Button */}
            <Link href="/">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                Về trang chủ
              </motion.button>
            </Link>

            {/* Title and Count */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl mb-4">{collection.title}</h1>
              <p className="text-xl text-white/90">
                {productCount} {productCount === 1 ? "Sản phẩm" : "Sản phẩm"}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
