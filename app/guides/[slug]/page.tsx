import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllGuideSlugs, getGuideBySlug } from "@/lib/guides";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${slug}` },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/guides/${guide.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedDate,
    dateModified: guide.updatedDate ?? guide.publishedDate,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <JsonLd data={jsonLd} />
      <Link href="/guides" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
        ← Guides
      </Link>
      <h1 className="mt-3 text-2xl font-bold">{guide.title}</h1>
      <div
        className="prose prose-gray mt-4 max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
      />
    </main>
  );
}
