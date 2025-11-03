import {
  Link as ContentSdkLink,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
} from '@sitecore-content-sdk/nextjs';
import { useMemo } from 'react';
import { IGQLLinkField, IGQLRichTextField, IGQLTextField } from 'types/igql';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'shadcd/components/ui/accordion';

interface Fields {
  data: {
    datasource: {
      heading?: IGQLTextField;
      description?: IGQLTextField;
      link: IGQLLinkField;
      children: {
        results: AccordionItemFields[];
      };
    };
  };
}

interface AccordionItemFields {
  id: string;
  heading?: IGQLTextField;
  description?: IGQLRichTextField;
}

type AccordionProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ListItem = (props: AccordionItemFields & { index: number; isLast: boolean }) => {
  return (
    <div className="relative flex gap-6">
      {/* Number indicator with connecting line */}
      <div className="flex flex-col items-center">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0b6b6f] text-white flex items-center justify-center font-semibold text-sm z-10">
          {props.index}
        </div>
        {!props.isLast && <div className="w-0.5 h-full bg-border mt-2 flex-grow" />}
      </div>

      {/* Content */}
      <div className="flex-1 pb-10">
        <h5 className="text-[#0b6b6f] font-semibold mb-3">
          <ContentSdkText field={props.heading?.jsonValue} />
        </h5>
        <div className="text-[#333]">
          <ContentSdkRichText field={props.description?.jsonValue} />
        </div>
      </div>
    </div>
  );
};

const AccordionBlockItem = (props: AccordionItemFields) => {
  return (
    <AccordionItem value={props.id} className="border-border mb-10">
      <AccordionTrigger>
        <h5 className="text-base">
          <ContentSdkText field={props.heading?.jsonValue} />
        </h5>
      </AccordionTrigger>
      <AccordionContent>
        <ContentSdkRichText field={props.description?.jsonValue} />
      </AccordionContent>
    </AccordionItem>
  );
};

export const Default = (props: AccordionProps) => {
  const datasource = useMemo(() => props.fields.data.datasource, [props.fields.data.datasource]);

  return (
    <section
      className={`relative py-20 max-w-200 overflow-hidden ${props.params.styles}`}
      data-class-change
    >
      <span className="absolute top-1/3 -left-1/3 w-screen h-64 opacity-50 blur-[400px] rotate-15 z-10"></span>
      <div className="relative container mx-auto px-4 z-20">
        <div className="grid lg:grid-cols-1 gap-12">
          <h2 className="text-2xl lg:text-5xl">
            <ContentSdkText field={datasource?.heading?.jsonValue} />
          </h2>
          <div>
            <Accordion type="multiple" className="w-full mb-12">
              {datasource?.children?.results?.map((item) => (
                <AccordionBlockItem key={item.id} {...item} />
              )) || []}
            </Accordion>
            <div className="flex flex-col lg:flex-row lg:justify-between items-start rounded-xl lg:items-center gap-6 self-center lg:col-start-2 p-5 bg-[#e5f7f7]">
              <h6 className="text-sm">
                <ContentSdkText field={datasource?.description?.jsonValue} />
              </h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Simplified = (props: AccordionProps) => {
  const datasource = useMemo(() => props.fields.data.datasource, [props.fields.data.datasource]);

  return (
    <section
      className={`relative py-20 max-w-200 overflow-hidden ${props.params.styles}`}
      data-class-change
    >
      <span className="absolute top-1/3 -left-1/3 w-screen h-64 opacity-50 blur-[400px] rotate-15 z-10"></span>
      <div className="relative container mx-auto px-4 z-20">
        <div className="grid lg:grid-cols-1 gap-12">
          <h2 className="text-2xl lg:text-5xl">
            <ContentSdkText field={datasource?.heading?.jsonValue} />
          </h2>
          <div>
            <div className="w-full mb-12">
              {datasource?.children?.results?.map((item, index) => (
                <ListItem
                  key={item.id}
                  {...item}
                  index={index + 1}
                  isLast={index === datasource.children.results.length - 1}
                />
              )) || []}
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-between items-start rounded-xl lg:items-center gap-6 self-center lg:col-start-2 p-5 bg-[#e5f7f7]">
              <h6 className="text-sm">
                <ContentSdkText field={datasource?.description?.jsonValue} />
              </h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TwoColumn = (props: AccordionProps) => {
  const datasource = useMemo(() => props.fields.data.datasource, [props.fields.data.datasource]);

  return (
    <section className={`relative py-20 overflow-hidden ${props.params.styles}`} data-class-change>
      <span className="absolute top-1/3 -left-1/3 w-screen h-64 bg-primary opacity-50 blur-[400px] rotate-15 z-10"></span>
      <div className="relative container mx-auto px-4 z-20">
        <h2 className="text-2xl lg:text-5xl">
          <ContentSdkText field={datasource?.heading?.jsonValue} />
        </h2>
        <Accordion type="multiple" className="w-full grid lg:grid-cols-2 gap-x-12 my-12">
          {datasource?.children?.results?.map((item) => (
            <AccordionBlockItem key={item.id} {...item} />
          )) || []}
        </Accordion>
        <div className="grid lg:grid-cols-2 gap-x-12">
          <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-6 self-center lg:col-start-2 p-5 bg-primary">
            <h6 className="text-sm">
              <ContentSdkText field={datasource?.description?.jsonValue} />
            </h6>
            {datasource?.link?.jsonValue && (
              <ContentSdkLink
                field={datasource?.link.jsonValue}
                prefetch={false}
                className="btn btn-secondary btn-sharp"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Vertical = (props: AccordionProps) => {
  const datasource = useMemo(() => props.fields.data.datasource, [props.fields.data.datasource]);

  return (
    <section className={`relative py-20 overflow-hidden ${props.params.styles}`} data-class-change>
      <span className="absolute -top-20 w-screen h-64 bg-primary opacity-50 blur-[400px] z-10"></span>
      <div className="relative container mx-auto px-4 z-20">
        <div className="flex flex-col gap-12 max-w-3xl mx-auto">
          <h2 className="text-2xl lg:text-5xl text-center">
            <ContentSdkText field={datasource?.heading?.jsonValue} />
          </h2>
          <Accordion type="multiple" className="w-full">
            {datasource?.children?.results?.map((item) => (
              <AccordionBlockItem key={item.id} {...item} />
            )) || []}
          </Accordion>
          <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-6 self-center lg:col-start-2 p-5 bg-primary">
            <h6 className="text-sm">
              <ContentSdkText field={datasource?.description?.jsonValue} />
            </h6>
            {datasource?.link?.jsonValue && (
              <ContentSdkLink
                field={datasource?.link.jsonValue}
                prefetch={false}
                className="btn btn-secondary btn-sharp"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const BoxedAccordion = (props: AccordionProps) => {
  const datasource = useMemo(() => props.fields.data.datasource, [props.fields.data.datasource]);

  return (
    <section className={`bg-primary py-20 ${props.params.styles}`} data-class-change>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl lg:text-5xl">
            <ContentSdkText field={datasource?.heading?.jsonValue} />
          </h2>
        </div>
        <div className="flex flex-col gap-12 max-w-3xl mx-auto bg-white p-4 lg:p-12 mt-12 shadow-2xl">
          <Accordion type="multiple" className="w-full">
            {datasource?.children?.results?.map((item) => (
              <AccordionBlockItem key={item.id} {...item} />
            )) || []}
          </Accordion>
          <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-6 self-center lg:col-start-2 p-5 bg-primary">
            <h6 className="text-sm">
              <ContentSdkText field={datasource?.description?.jsonValue} />
            </h6>
            {datasource?.link?.jsonValue && (
              <ContentSdkLink
                field={datasource?.link.jsonValue}
                prefetch={false}
                className="btn btn-secondary btn-sharp"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const BoxedContent = (props: AccordionProps) => {
  const datasource = useMemo(() => props.fields.data.datasource, [props.fields.data.datasource]);

  return (
    <section className={`bg-gradient py-20 ${props.params.styles}`} data-class-change>
      <div className="container mx-auto px-4">
        <div className="bg-white p-4 lg:p-12 shadow-2xl">
          <div className="flex flex-col gap-12 max-w-5xl mx-auto">
            <h2 className="text-2xl lg:text-5xl max-w-2xl">
              <ContentSdkText field={datasource?.heading?.jsonValue} />
            </h2>
            <Accordion type="multiple" className="w-full">
              {datasource?.children?.results?.map((item) => (
                <AccordionBlockItem key={item.id} {...item} />
              )) || []}
            </Accordion>
            <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-6 self-center lg:col-start-2 p-5 bg-primary">
              <h6 className="text-sm">
                <ContentSdkText field={datasource?.description?.jsonValue} />
              </h6>
              {datasource?.link?.jsonValue && (
                <ContentSdkLink
                  field={datasource?.link.jsonValue}
                  prefetch={false}
                  className="btn btn-secondary btn-sharp"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
