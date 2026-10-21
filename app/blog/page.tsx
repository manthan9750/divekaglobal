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
    <div className="min-h-screen bg-cream pb-24 pt-8 animate-fade-in">
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
        
        <article className="rounded-3xl bg-white p-8 md:p-14 shadow-soft border border-gray-100">
          <div className="flex items-center justify-center gap-2 text-sm text-charcoal/60 mb-6 font-medium">
            <Calendar className="h-4 w-4 text-gold" />
            {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-navy text-center mb-12 leading-tight">
            {post.title}
          </h1>
          
          <div 
            className="prose prose-lg prose-p:text-charcoal/80 prose-headings:font-playfair prose-headings:text-navy prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-a:text-gold hover:prose-a:text-navy max-w-none prose-strong:text-navy"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}