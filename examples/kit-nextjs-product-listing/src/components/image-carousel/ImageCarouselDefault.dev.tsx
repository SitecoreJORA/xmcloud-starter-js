'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Image as ContentSdkImage,
  Text as ContentSdkText,
  Link as ContentSdkLink,
} from '@sitecore-content-sdk/nextjs';
import { IGQLImageField, IGQLTextField, IGQLLinkField } from 'types/igql';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Fields {
  data: {
    datasource: {
      imageItems: {
        results: ImageCarouselItem[];
      };
    };
  };
}

export interface ImageCarouselItem {
  id: string;
  image: IGQLImageField;
  backgroundText: IGQLTextField;
  link: IGQLLinkField;
}

type ImageCarouselProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: ImageCarouselProps) => {
  const images = props.fields?.data?.datasource?.imageItems?.results || [];

  const [mainRef, mainApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [fadeKey, setFadeKey] = useState(0); // For triggering fade animation

  useEffect(() => {
    if (!mainApi) return;

    const updateButtons = () => {
      setSelectedIndex(mainApi.selectedScrollSnap());
      setCanScrollPrev(mainApi.canScrollPrev());
      setCanScrollNext(mainApi.canScrollNext());
      setFadeKey((prev) => prev + 1); // Trigger fade animation
    };

    mainApi.on('select', updateButtons);
    updateButtons();

    return () => {
      mainApi?.off('select', updateButtons);
    };
  }, [mainApi]);

  const scrollTo = (index: number) => {
    if (!mainApi) return;
    mainApi.scrollTo(index);
  };

  return (
    <section className="relative w-full bg-white">
      {/* Static Red Box */}
      <div className="absolute top-0 left-0 h-full w-1/3 bg-red-600 text-white flex flex-col justify-center p-8 z-10">
        <div
          key={fadeKey}
          className="animate-fade opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]"
        >
          <ContentSdkText
            field={images[selectedIndex]?.backgroundText?.jsonValue}
            className="text-3xl font-bold mb-4"
          />
          <ContentSdkLink
            field={images[selectedIndex]?.link?.jsonValue}
            className="flex items-center gap-2 text-lg font-medium hover:underline"
          >
            <span>→</span>
          </ContentSdkLink>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="overflow-hidden" ref={mainRef}>
        <div className="flex">
          {images.map((item) => (
            <div key={item.id} className="w-full relative flex-shrink-0">
              <ContentSdkImage
                field={item.image?.jsonValue}
                className="w-full h-[500px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full ${
              selectedIndex === index ? 'bg-red-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={() => mainApi?.scrollPrev()}
          disabled={!canScrollPrev}
          className="p-2 bg-white border rounded shadow hover:bg-gray-100 disabled:opacity-50"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={() => mainApi?.scrollNext()}
          disabled={!canScrollNext}
          className="p-2 bg-white border rounded shadow hover:bg-gray-100 disabled:opacity-50"
        >
          <ArrowRight />
        </button>
      </div>
    </section>
  );
};
