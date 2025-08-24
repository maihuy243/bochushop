import { motion } from "motion/react";
import { ParentCategory } from "../../data/products";
import { CollectionCard } from "./CollectionCard";

interface CategoryGridProps {
  category: ParentCategory;
  index: number;
}

export function CategoryGrid({ category, index }: CategoryGridProps) {
  const isEven = index % 2 === 0;

  return (
    <section className={`py-16 ${isEven ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="container mx-auto max-w-7xl px-4">
        {/* Category Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="mb-2">
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
              Danh mục sản phẩm
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl mb-4">{category.title}</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{category.description}</p>
        </motion.div>

        {/* Collections Grid */}
        <div className="mb-8">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xl mb-6"
          >
            Bộ sưu tập nổi bật
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.collections.map((collection, collectionIndex) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                index={collectionIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}