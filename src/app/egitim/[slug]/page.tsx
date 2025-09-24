import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { posts, getPostBySlug } from "@/data/posts";
import { buildMetadata } from "@/lib/metadata";

type ParsedBlock = {
  type: "h2" | "h3" | "p" | "ul" | "ol" | "blockquote";
  content: string[];
  id?: string;
};

function parseMarkdown(content: string): ParsedBlock[] {
  const lines = content.split("\n");
  const elements: ParsedBlock[] = [];
  let currentList: string[] | null = null;
  let currentOrdered: string[] | null = null;
  let headingIndex = 0;

  lines.forEach((line) => {
    if (line.startsWith("### ")) {
      const block = {
        type: "h3" as const,
        content: [line.replace("### ", "")],
        id: `section-${headingIndex++}`,
      };
      elements.push(block);
      currentList = null;
      currentOrdered = null;
    } else if (line.startsWith("## ")) {
      const block = {
        type: "h2" as const,
        content: [line.replace("## ", "")],
        id: `section-${headingIndex++}`,
      };
      elements.push(block);
      currentList = null;
      currentOrdered = null;
    } else if (line.startsWith("- ")) {
      if (!currentList) {
        currentList = [];
        elements.push({ type: "ul", content: currentList });
      }
      currentList.push(line.replace("- ", ""));
    } else if (/^\d+\.\s/.test(line)) {
      if (!currentOrdered) {
        currentOrdered = [];
        elements.push({ type: "ol", content: currentOrdered });
      }
      currentOrdered.push(line.replace(/^\d+\.\s/, ""));
    } else if (line.startsWith("> ")) {
      elements.push({ type: "blockquote", content: [line.replace("> ", "")] });
      currentList = null;
      currentOrdered = null;
    } else if (line.trim() === "") {
      currentList = null;
      currentOrdered = null;
    } else {
      elements.push({ type: "p", content: [line] });
      currentList = null;
      currentOrdered = null;
    }
  });

  return elements;
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return buildMetadata({
      title: "Adult Z Eğitim İçeriği",
      description: "Adult Z eğitim içeriği bulunamadı.",
      path: `/egitim/${params.slug}`,
    });
  }
  return buildMetadata({
    title: `${post.title} | Adult Z Eğitim`,
    description: post.excerpt,
    path: `/egitim/${post.slug}`,
    image: post.cover.src,
  });
}

export default function EducationDetailPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const parsed = parseMarkdown(post.content);
  const toc = parsed.filter((item) => item.type === "h2" || item.type === "h3");

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted">{post.topics.join(", ")}</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-muted">
          Okuma süresi ≈ {post.readingMinutes} dk • KVKK uyumlu içerik • Açık/erotik anlatım yoktur.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-muted">
          {post.relatedProducts.map((slug) => (
            <span key={slug} className="rounded-full border border-[rgba(157,78,221,0.2)] px-3 py-1">
              {slug}
            </span>
          ))}
        </div>
      </header>
      <aside className="mt-8 rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">İçindekiler</p>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          {toc.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="transition hover:text-foreground">
                {item.content[0]}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <article className="mt-10 space-y-6">
        {parsed.map((element, index) => {
          if (element.type === "h2") {
            return (
              <h2
                key={`h2-${index}`}
                id={element.id}
                className="font-display text-2xl uppercase tracking-[0.28em] text-foreground"
              >
                {element.content[0]}
              </h2>
            );
          }
          if (element.type === "h3") {
            return (
              <h3
                key={`h3-${index}`}
                id={element.id}
                className="font-display text-xl uppercase tracking-[0.26em] text-foreground"
              >
                {element.content[0]}
              </h3>
            );
          }
          if (element.type === "p") {
            return (
              <p key={`p-${index}`} className="text-sm text-muted">
                {element.content[0]}
              </p>
            );
          }
          if (element.type === "blockquote") {
            return (
              <blockquote
                key={`blockquote-${index}`}
                className="border-l-2 border-[rgba(0,180,216,0.4)] pl-4 text-sm text-muted"
              >
                {element.content[0]}
              </blockquote>
            );
          }
          if (element.type === "ul") {
            return (
              <ul key={`ul-${index}`} className="list-disc space-y-2 pl-6 text-sm text-muted">
                {element.content.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            );
          }
          if (element.type === "ol") {
            return (
              <ol key={`ol-${index}`} className="list-decimal space-y-2 pl-6 text-sm text-muted">
                {element.content.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
            );
          }
          return null;
        })}
      </article>
      <footer className="mt-12 rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6 text-sm text-muted">
        İçerikte adı geçen ürünleri incelemek için {" "}
        {post.relatedProducts.map((slug, index) => (
          <span key={slug}>
            <Link href={`/bebekler/${slug}`} className="text-foreground underline decoration-dotted">
              {slug}
            </Link>
            {index < post.relatedProducts.length - 1 ? ", " : ". "}
          </span>
        ))}
        Kişisel verileriniz KVKK uyumlu şekilde işlenir.
      </footer>
    </div>
  );
}
