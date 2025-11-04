'use client';

import { RichText as ContentSdkRichText, ImageField, Field } from '@sitecore-content-sdk/nextjs';

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
      className={`relative flex flex-col lg:pt-6 overflow-hidden ${props.params?.styles}`}
      data-class-change
    >
      {fieldExists ? (
        <ContentSdkRichText field={props.fields?.pageContent} />
      ) : (
        <p className="text-muted-foreground bg-gray-100 border w-[250px]">
          PLACEHOLDER Content Field
        </p>
      )}
    </section>
  );
};
