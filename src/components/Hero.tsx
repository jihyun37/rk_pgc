"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLink } from "./ui";

const slides = [
  {
    image: "/images/building-205-street.jpg",
    alt: "Building 205 at Pangyo Global Campus",
    label: "The Campus",
    title: "Building 205",
    headline: "Nature and terrace living, in Daejang-dong.",
    description: "An upscale terrace residence within TH212 Pangyo, surrounded by greenery and seasonal gardens, just minutes from Pangyo's business district.",
    href: "/about",
    linkLabel: "View More",
  },
  {
    image: "/images/403-hero.jpg",
    alt: "PGC 403 Business Room lounge",
    label: "Room 403",
    title: "Business Room",
    headline: "Designed for meetings, work and networking.",
    description: "A refined setting for business meetings, private gatherings, and meaningful connections, bringing work and relaxation together.",
    facts: "5 guests · 5 beds · 1 bathroom",
    href: "/business-room",
    linkLabel: "View More",
  },
  {
    image: "/images/404-hero.jpg",
    alt: "PGC 404 Guest Room lounge",
    label: "Room 404",
    title: "Guest Room",
    headline: "Designed for comfort, rest and privacy.",
    description: "A welcoming residence for visiting executives, employees, and guests, with room to relax and recharge between plans.",
    facts: "10 guests max · 9 beds · 2 bathrooms",
    href: "/guest-room",
    linkLabel: "View More",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="grid min-h-svh overflow-hidden bg-charcoal text-white lg:grid-cols-2" aria-label="Pangyo Global Campus highlights">
      <div className="relative min-h-[48svh] bg-charcoal lg:min-h-svh">
        {slides.map((slide, index) => (
          <Image
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={`object-cover transition-opacity duration-700 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
            style={{ objectPosition: "50% 50%" }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 lg:bg-gradient-to-r lg:from-black/20 lg:to-transparent" />
      </div>

      <div className="relative flex min-h-[52svh] flex-col justify-center bg-charcoal px-7 py-14 sm:px-12 lg:min-h-svh lg:px-14 xl:px-24">
        <div className="max-w-xl" aria-live="off">
          <p className="text-[11px] uppercase tracking-[0.4em] text-white/60">{activeSlide.label}</p>
          <h1 className="mt-6 font-serif text-[52px] font-light leading-[0.95] sm:text-[72px] xl:text-[88px]">
            {activeSlide.title}
          </h1>
          <p className="mt-8 text-[18px] font-medium leading-snug sm:text-[21px]">{activeSlide.headline}</p>
          <p className="mt-4 max-w-lg text-[15px] leading-[1.9] text-white/70 sm:text-[16px]">
            {activeSlide.description}
          </p>
          {activeSlide.facts && (
            <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-white/55">{activeSlide.facts}</p>
          )}
          <div className="mt-10">
            <ArrowLink href={activeSlide.href} light>
              {activeSlide.linkLabel}
            </ArrowLink>
          </div>
        </div>

        <div className="mt-10 flex gap-3 lg:absolute lg:right-8 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:flex-col" aria-label="Choose a highlight">
          {slides.map((slide, index) => (
            <button
              key={slide.label}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${slide.label}`}
              aria-pressed={activeIndex === index}
              className={`size-2 rounded-full transition-colors ${activeIndex === index ? "bg-white" : "bg-white/35 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
