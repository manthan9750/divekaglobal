import { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/lib/data/blog";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read our latest articles on health, natural sweeteners, and jaggery benefits.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-cream pb-24 pt-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Journal & Insights" subtitle="Explore articles on healthy living and the benefits of traditional jaggery." />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col rounded-2xl bg-white p-8 shadow-soft border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center gap-2 text-xs text-charcoal/50 mb-4">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
              <h2 className="font-playfair text-2xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">{post.title}</h2>
              <p className="text-charcoal/80 mb-6 flex-1 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center text-sm font-medium text-gold">
                Read Article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}