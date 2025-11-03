'use client';

import {
  Text as ContentSdkText,
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  ImageField,
  Field,
} from '@sitecore-content-sdk/nextjs';

interface PageFields {
  pageThumbnail: ImageField;
  pageTitle: Field<string>;
  pageContent: Field<string>;
}

type PageHeaderProps = {
  params: { [key: string]: string };
  fields: PageFields;
};

export const Default = (props: PageHeaderProps) => {
  // Fall back to an empty array until the field populates

  return (
    <section
      className={`relative flex flex-col lg:items-end lg:pt-6 overflow-hidden ${props.params?.styles}`}
      data-class-change
    >
      <ContentSdkImage field={props.fields?.pageThumbnail} className="w-full h-auto object-cover" />
      <div
        className="relative flex flex-col w-full gap-6 p-10 bg-white z-20"
        id="article-header-text"
      >
        <h1 className="text-2xl">
          <ContentSdkText field={props.fields?.pageTitle} />
        </h1>
        <ContentSdkRichText field={props.fields?.pageContent} />
      </div>
    </section>
  );
};
