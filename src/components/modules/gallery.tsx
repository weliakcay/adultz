"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { MediaAsset, VideoAsset } from "@/types/content";

type GalleryItem =
  | { type: "image"; item: MediaAsset }
  | { type: "video"; item: VideoAsset };

export function MediaGallery({
  media,
  videos = [],
}: {
  media: MediaAsset[];
  videos?: VideoAsset[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items: GalleryItem[] = useMemo(
    () => [
      ...media.map((item) => ({ type: "image" as const, item })),
      ...videos.map((item) => ({ type: "video" as const, item })),
    ],
    [media, videos],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenIndex(null);
      }
      if (event.key === "ArrowRight") {
        setOpenIndex((prev) => {
          if (prev === null) return prev;
          return (prev + 1) % items.length;
        });
      }
      if (event.key === "ArrowLeft") {
        setOpenIndex((prev) => {
          if (prev === null) return prev;
          return (prev - 1 + items.length) % items.length;
        });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openIndex, items.length]);

  const activeItem = openIndex !== null ? items[openIndex] : null;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ type, item }, index) => (
          <button
            key={`${type}-${index}`}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-[18px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)]"
          >
            {type === "image" ? (
              <Image
                src={(item as MediaAsset).src}
                alt={(item as MediaAsset).alt}
                fill
                sizes="(min-width: 1024px) 320px, 100vw"
                className="object-cover object-center transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[rgba(7,7,12,0.6)]">
                <span className="rounded-full border border-[rgba(255,255,255,0.3)] bg-[rgba(255,0,84,0.2)] px-5 py-2 text-xs uppercase tracking-[0.28em] text-muted">
                  Video Önizleme
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,7,12,0.7)] via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="sr-only">{item.alt}</span>
          </button>
        ))}
      </div>
      {activeItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(7,7,12,0.92)] px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Medya galeri"
        >
          {/* Close Button (X) */}
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(12,12,20,0.6)] text-muted transition hover:border-[rgba(255,255,255,0.4)] hover:text-foreground"
            aria-label="Kapat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Previous Button (Left Arrow) */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={() =>
                setOpenIndex((prev) => (prev === null ? prev : (prev - 1 + items.length) % items.length))
              }
              className="absolute left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(12,12,20,0.6)] text-muted transition hover:border-[rgba(255,255,255,0.4)] hover:text-foreground"
              aria-label="Önceki"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}

          {/* Next Button (Right Arrow) */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={() =>
                setOpenIndex((prev) => (prev === null ? prev : (prev + 1) % items.length))
              }
              className="absolute right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(12,12,20,0.6)] text-muted transition hover:border-[rgba(255,255,255,0.4)] hover:text-foreground"
              aria-label="Sonraki"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}

          {/* Media Content */}
          {activeItem.type === "video" ? (
            <video
              controls
              autoPlay
              loop
              muted
              className="max-h-[80vh] w-full max-w-4xl rounded-[18px] border border-[rgba(157,78,221,0.3)]"
            >
              <source
                src={(activeItem.item as VideoAsset).src}
                type={(activeItem.item as VideoAsset).type}
              />
              Tarayıcınız video etiketini desteklemiyor.
            </video>
          ) : (
            <Image
              src={(activeItem.item as MediaAsset).src}
              alt={(activeItem.item as MediaAsset).alt}
              width={1200}
              height={800}
              className="max-h-[80vh] w-full max-w-4xl rounded-[18px] border border-[rgba(157,78,221,0.3)] object-contain"
            />
          )}
        </div>
      ) : null}
    </div>
  );
}
