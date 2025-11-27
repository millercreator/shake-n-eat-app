"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { HugeiconsIcon } from "@hugeicons/react";
import { StopWatchIcon } from "@hugeicons/core-free-icons";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

import BrandLogo from "@/assets/brand-logo.svg";

const DELICACY_IMAGE_COUNT = 70; // we have many images: delicacy-01.png ... delicacy-70.png
const VISIBLE_SLIDES = 20; // keep this small to avoid rendering too many at once

function getDelicacySrc(id: number) {
  const padded = id.toString().padStart(2, "0");
  return `/delicacies/delicacy-${padded}.png`;
}

const delicacySlides = Array.from({ length: VISIBLE_SLIDES }, (_, i) => {
  return (i % DELICACY_IMAGE_COUNT) + 1;
});

export default function IntroPage() {
  const autoplayPlugin = React.useRef(
    Autoplay({
      delay: 2000, // time between slides in ms
      stopOnInteraction: false, // never stop
    })
  );

  return (
    <div className="w-full h-full">
      <div className="my-10">
        {/* Full-width, flowing-out-of-page carousel */}
        <div className="relative left-1/2 right-1/2 ml-[-50vw] w-screen">
          <Carousel
            className="w-screen py-6"
            plugins={[autoplayPlugin.current]}
            opts={{
              loop: true,
              align: "start",
            }}
          >
            <CarouselContent>
              {delicacySlides.map((id, index) => (
                <CarouselItem key={`${id}-${index}`} className="basis-auto">
                  <div className="flex items-center justify-center">
                    <div className="aspect-square w-[124px] overflow-hidden rounded-lg">
                      <Image
                        src={getDelicacySrc(id)}
                        alt={`Delicacy ${id}`}
                        width={124}
                        height={124}
                        className="h-full w-full object-cover hover:shadow-lg"
                        sizes="124px"
                        loading={index < 4 ? "eager" : "lazy"}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 pt-0 pb-8 px-4">
        {/* Back button at the top */}
        <div className="flex w-full justify-center pt-2">
          <BrandLogo
            className="text-primary"
            width={32}
            height={32}
            aria-hidden="true"
          />
        </div>
        {/* under-2-mins pill */}
        <span className="flex items-center justify-center gap-2 px-3 py-3 rounded-full bg-muted text-sm font-medium text-foreground/80">
          <HugeiconsIcon icon={StopWatchIcon} size={24} />
          This takes under 2 mins!
        </span>
      </div>
      {/* Main heading */}
      <div className="flex flex-col gap-4 items-center text-center w-full">
        <h1 className="text-3xl sm:text-5xl font-semibold text-center font-heading">
          Hey! Let&#39;s get you set up
          <br />
          for smarter eats.
        </h1>
        {/* Subheading */}
        <p className="text-muted-foreground text-center text-base max-w-md">
          We&apos;ll ask a few basics to personalize your meals
        </p>
      </div>
      {/* Start button */}
      <div className="flex justify-center mt-20">
        <Button size="xl" asChild>
          <Link href="/onboarding/process">
            Start
          </Link>
        </Button>
      </div>
    </div>
  );
}
