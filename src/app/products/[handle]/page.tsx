
import { Metadata } from "next";
import { generateProductMetadata } from "@/lib/data";
import { ProductPageComponent } from "@/components/pages/ProductPage";
import { getProductByHandle } from "@/data/seed";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const foundProduct = getProductByHandle(handle, []);
  
  if (!foundProduct) {
    return {
      title: "foundProduct Not Found",
    };
  }

  return generateProductMetadata(foundProduct);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  return <ProductPageComponent handle={handle} />;
}
