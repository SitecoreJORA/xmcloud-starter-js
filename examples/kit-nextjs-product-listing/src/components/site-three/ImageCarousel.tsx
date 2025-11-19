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
  name: string;
  displayName: string;
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
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    if (!mainApi) return;

    const updateButtons = () => {
      setSelectedIndex(mainApi.selectedScrollSnap());
      setFadeKey((prev) => prev + 1);
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
      {/* Tabs with Display Names */}
      <div className="flex justify-center mt-4 gap-4">
        {images.map((item, index) => (
          <button
            key={item.id}
            onClick={() => scrollTo(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedIndex === index ? 'border rounded-full' : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            {item.displayName || item.name}
          </button>
        ))}
      </div>

      {/* Static Red Box */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid col-span-1 justify-left align-center bg-[#b9e2fa]">
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
        <div className="overflow-hidden grid col-span-1" ref={mainRef}>
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
      </div>
    </section>
  );
};
