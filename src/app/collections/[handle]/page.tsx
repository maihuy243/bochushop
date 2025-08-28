import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCollection, generateCollectionMetadata } from '@/lib/data';
import { CollectionPageComponent } from '@/components/pages/CollectionPage';

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);
  
  if (!collection) {
    return {
      title: 'Không có sản phẩm nào !',
    };
  }
  
  return generateCollectionMetadata(collection);
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { handle } = await params;

  return (
   <CollectionPageComponent handle={handle} />
  );
}