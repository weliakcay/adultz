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
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            className="absolute right-6 top-6 rounded-full border border-[rgba(255,255,255,0.2)] px-3 py-2 text-xs uppercase tracking-[0.28em] text-muted hover:text-foreground"
          >
            Kapat
          </button>
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
