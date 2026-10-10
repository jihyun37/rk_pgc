"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Room } from "@/content/rooms";

type GalleryImage = Room["hero"] & { name: string };

export default function RoomGallery({ room }: { room: Room }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const images: GalleryImage[] = [
    { ...room.living, name: "Living lounge" },
    ...room.spaces.map((space) => ({ ...space, name: space.name })),
  ];
  const slideCount = Math.ceil(images.length / 2);
  const visibleImages = Array.from({ length: Math.min(2, images.length) }, (_, offset) => {
    const index = (activeSlide * 2 + offset) % images.length;
    return { image: images[index], index };
  });

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") setActiveIndex((index) => (index === null ? null : (index + images.length - 1) % images.length));
      if (event.key === "ArrowRight") setActiveIndex((index) => (index === null ? null : (index + 1) % images.length));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, images.length]);

  useEffect(() => {
    if (activeIndex !== null || slideCount < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % slideCount);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [activeIndex, slideCount]);

  const activeImage = activeIndex === null ? null : images[activeIndex];

  return (
    <>
      <div aria-label="Room photo gallery" aria-live="off">
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {visibleImages.map(({ image, index }) => (
            <figure key={`${image.src}-${index}`}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View ${image.name} image larger`}
                className="group block w-full text-left"
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-beige">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 768px) 37vw, 50vw"
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.025]"
                    style={{ objectPosition: image.position ?? "50% 50%" }}
                  />
                </span>
                <span className="mt-4 block text-[16px] font-medium md:text-[20px]">{image.name}</span>
                <span className="mt-1 block text-[12px] text-warm-gray">PGC {room.number}</span>
              </button>
            </figure>
          ))}
        </div>

        {slideCount > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2" aria-label="Gallery slides">
              {Array.from({ length: slideCount }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show gallery pair ${index + 1}`}
                  aria-pressed={activeSlide === index}
                  className={`h-1 w-8 transition-colors ${activeSlide === index ? "bg-charcoal" : "bg-charcoal/20 hover:bg-charcoal/50"}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setActiveSlide((slide) => (slide + slideCount - 1) % slideCount)}
                aria-label="Previous gallery pair"
                className="grid size-10 place-items-center rounded-full border border-charcoal/25 text-charcoal transition-colors hover:bg-charcoal hover:text-white"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => setActiveSlide((slide) => (slide + 1) % slideCount)}
                aria-label="Next gallery pair"
                className="grid size-10 place-items-center rounded-full border border-charcoal/25 text-charcoal transition-colors hover:bg-charcoal hover:text-white"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>

      {activeImage && activeIndex !== null && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-charcoal/95 p-5 text-white md:p-10">
          <button
            type="button"
            aria-label="Close image viewer"
            onClick={() => setActiveIndex(null)}
            className="absolute inset-0 cursor-default"
          />
          <div role="dialog" aria-modal="true" aria-label="Image viewer" className="relative z-10 flex h-full w-full max-w-[1440px] flex-col">
            <div className="flex items-center justify-between py-2">
              <p className="text-[13px] tracking-[0.12em]">PGC {room.number} · {activeImage.name}</p>
              <button type="button" onClick={() => setActiveIndex(null)} aria-label="Close image viewer" className="grid size-11 place-items-center text-3xl leading-none">
                ×
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="95vw"
                className="object-contain"
                priority
              />
              <button
                type="button"
                onClick={() => setActiveIndex((activeIndex + images.length - 1) % images.length)}
                aria-label="Previous image"
                className="absolute left-0 top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-white/50 bg-charcoal/30 text-2xl"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
                aria-label="Next image"
                className="absolute right-0 top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-white/50 bg-charcoal/30 text-2xl"
              >
                ›
              </button>
            </div>
            <p className="py-3 text-center text-[12px] text-white/70">{activeIndex + 1} / {images.length}</p>
          </div>
        </div>
      )}
    </>
  );
}
