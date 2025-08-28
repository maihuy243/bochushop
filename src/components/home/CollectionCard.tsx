import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Collection } from "../../data/products";
import Link from "next/link";
import Image from "next/image";

interface CollectionCardProps {
  collection: Collection;
  index: number;
}

export function CollectionCard({ collection, index }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.id}`} className="block h-full">
      <motion.article
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="group h-full"
      >
        <div className="h-full flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 py-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={collection.hero_image}
              alt={collection.title}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-102"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={index < 2}
            />
          </div>

          <div className="flex flex-col gap-3 p-6 grow">
            <h3
              className="leading-tight text-ld font-semibold group-hover:text-blue-600 transition-colors
                         line-clamp-2 min-h-[2.75rem]"
            >
              {collection.title}
            </h3>

            <div className="mt-auto flex items-center justify-end">
              <motion.span
                className="inline-flex items-center text-gray-500 group-hover:text-blue-600 transition-colors"
                whileHover={{ x: 4 }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
