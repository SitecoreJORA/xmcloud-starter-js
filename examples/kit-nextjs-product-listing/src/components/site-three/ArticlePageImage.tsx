'use client';

import { NextImage as ContentSdkImage, ImageField, Field } from '@sitecore-content-sdk/nextjs';

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
  const fieldExists = props.fields?.pageContent !== undefined && props.fields?.pageContent !== null;

  return (
    <section
      className={`relative flex flex-col lg:items-end lg:pt-6 overflow-hidden ${props.params?.styles}`}
      data-class-change
    >
      {fieldExists ? (
        <ContentSdkImage
          field={props.fields?.pageThumbnail}
          className="w-full h-auto object-cover"
        />
      ) : (
        <img
          src={
            'https://xmc-sitecoresaa975d-jorainsuran57f3-jorainsurande67.sitecorecloud.io/-/jssmedia/Project/standard/vgz/Placeholder.png?h=388&iar=0&w=1448&ttc=63897841884&tt=E5A90552AA4E2CD6B0C688BE9FC8E7A5&hash=875C7DC723002E2B0A47847F04E43561'
          }
          alt="placeholder"
        ></img>
      )}
    </section>
  );
};
