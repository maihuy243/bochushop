import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getCollection, generateProductMetadata } from "@/lib/data";
import { ProductPageComponent } from "@/components/pages/ProductPage";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return generateProductMetadata(product);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  return <ProductPageComponent handle={handle} />;
}
