import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data/blog";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Calendar } from "lucide-react";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-cream pb-24 pt-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumbs 
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title }
            ]} 
          />
        </div>
        
        <article className="rounded-3xl bg-white p-8 md:p-12 shadow-soft">
          <div className="flex items-center justify-center gap-2 text-sm text-charcoal/50 mb-6">
            <Calendar className="h-4 w-4" />
            {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-navy text-center mb-10 leading-tight">
            {post.title}
          </h1>
          
          <div className="prose prose-lg prose-p:text-charcoal/80 prose-headings:font-playfair prose-headings:text-navy max-w-none">
            <p>{post.content}</p>
            {/* DUMMY — EDIT: Blog content is currently unformatted raw string from data/blog.ts */}
          </div>
        </article>
      </div>
    </div>
  );
}