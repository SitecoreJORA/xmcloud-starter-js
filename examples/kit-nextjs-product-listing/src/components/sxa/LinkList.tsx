import React, { useEffect, useState, type JSX } from 'react';
import { Link as ContentSdkLink, Text, LinkField, TextField } from '@sitecore-content-sdk/nextjs';

type ResultsFieldLink = {
  field: {
    link: LinkField;
  };
};

interface Fields {
  data: {
    datasource: {
      children: {
        results: ResultsFieldLink[];
      };
      field: {
        title: TextField;
      };
    };
  };
}

type LinkListProps = {
  params: { [key: string]: string };
  fields: Fields;
};

type LinkListItemProps = {
  key: string;
  index: number;
  total: number;
  field: LinkField;
};

const LinkListItem = ({ field }: LinkListItemProps) => {
  return (
    <li className="mb-2">
      <ContentSdkLink
        className="text-gray-600 hover:underline focus:border focus:border-dashed focus:border-gray-500 inline-block px-2 py-2 focus:bg-gray-50 focus:outline focus:outline-dashed focus:ring-gray-500 aria-selected:bg-gray-100 text-nowrap word-break-[break-word] text-sm"
        field={field}
        prefetch={false}
      />
    </li>
  );
};

export const HeroQuickLinks = (props: LinkListProps): JSX.Element => {
  const datasource = props.fields?.data?.datasource;
  const styles =
    `p-10 bg-[#fff] rounded-4xl top-[-60px] shadow-xl relative font-sans ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;

  const LinkListItem = ({ field }: LinkListItemProps) => {
    return (
      <li className="">
        <ContentSdkLink
          className="border px-11 py-5 w-full rounded-full mb-5 text-nowrap inline-flex"
          field={field}
          prefetch={false}
        />
      </li>
    );
  };

  if (datasource) {
    const links = datasource.children.results.filter((el) => el?.field?.link);

    // Distribute links into 3 columns
    const columns: LinkField[][] = [[], [], []];
    links.forEach((el, i) => {
      columns[i % 3].push(el.field.link);
    });

    return (
      <div data-class-change className={styles} id={id ? id : undefined}>
        <div className="flex flex-col w-full">
          <Text
            tag="h3"
            field={datasource?.field?.title}
            className="text-nowrap mb-5 text-xl font-bold text-gray-600"
          />
          <div className="grid grid-cols-3 gap-4 w-full">
            {columns.map((col, colIndex) => (
              <ul key={colIndex} className="list-none p-0 m-0">
                {col.map((link, linkIndex) => (
                  <LinkListItem
                    key={`${colIndex}-${linkIndex}`}
                    index={linkIndex}
                    field={link}
                    total={0}
                  />
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-class-change className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <h3>Link List</h3>
      </div>
    </div>
  );
};

export const Default = (props: LinkListProps): JSX.Element => {
  const datasource = props.fields?.data?.datasource;
  const styles = `max-w-xs p-5 font-sans ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;

  if (datasource) {
    const list = datasource.children.results
      .filter((element: ResultsFieldLink) => element?.field?.link)
      .map((element: ResultsFieldLink, key: number) => (
        <LinkListItem
          index={key}
          key={`${key}${element.field.link}`}
          total={datasource.children.results.length}
          field={element.field.link}
        />
      ));

    return (
      <div data-class-change className={styles} id={id ? id : undefined}>
        <div className="flex flex-col">
          <Text
            tag="h3"
            field={datasource?.field?.title}
            className="text-nowrap mb-5 text-xl font-bold text-gray-600"
          />
          <ul className="list-none p-0 m-0" role="listbox" aria-label="Navigation options">
            {list}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div data-class-change className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <h3>Link List</h3>
      </div>
    </div>
  );
};

export const Vertical = (props: LinkListProps): JSX.Element => {
  const datasource = props.fields?.data?.datasource;
  const styles = `p-5 font-sans ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;

  const LinkListItem = ({ field }: LinkListItemProps) => {
    return (
      <li className="">
        <ContentSdkLink
          className="border px-11 py-11 w-full rounded-xl mb-5 text-nowrap inline-flex bg-white"
          field={field}
          prefetch={false}
        />
      </li>
    );
  };

  if (datasource) {
    const links = datasource.children.results.filter((el) => el?.field?.link);

    // Distribute links into 3 columns
    const columns: LinkField[][] = [[], [], [], []];
    links.forEach((el, i) => {
      columns[i % 4].push(el.field.link);
    });

    return (
      <div data-class-change className={styles} id={id ? id : undefined}>
        <div className="flex flex-col w-full">
          <Text
            tag="h3"
            field={datasource?.field?.title}
            className="text-nowrap mb-5 text-xl font-bold text-gray-600"
          />
          <div className="grid grid-cols-4 gap-4 w-full">
            {columns.map((col, colIndex) => (
              <ul key={colIndex} className="list-none p-0 m-0">
                {col.map((link, linkIndex) => (
                  <LinkListItem
                    key={`${colIndex}-${linkIndex}`}
                    index={linkIndex}
                    field={link}
                    total={0}
                  />
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-class-change className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <h3>Link List</h3>
      </div>
    </div>
  );
};

export const AnchorNav = (props: LinkListProps): JSX.Element => {
  const datasource = props.fields?.data?.datasource;
  const styles = `${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0) {
      setActiveId(sections[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '0px 0px -85% 0px',
        threshold: 0.1,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  if (datasource) {
    const list = datasource.children.results
      .filter((element: ResultsFieldLink) => element?.field?.link)
      .map((element: ResultsFieldLink, key: number) => {
        const link = element.field.link;
        const href = link?.value?.href || '';
        const targetId = href.replace('#', '');
        const isActive = targetId === activeId;

        return (
          <a
            key={`${key}${href}`}
            href={href}
            onClick={(e) => handleClick(e, href)}
            className={`text-sm font-semibold py-4 transition-colors border-b-2 ${
              isActive ? 'border-black' : 'border-transparent'
            }`}
          >
            {link?.value?.text}
          </a>
        );
      });

    return (
      <div
        data-class-change
        className={`sticky top-0 shadow-lg bg-white z-20 ${styles}`}
        id={id ? id : undefined}
      >
        <div className="container mx-auto px-4">
          <ul
            className="flex gap-12 list-none p-0 m-0"
            role="listbox"
            aria-label="Navigation options"
          >
            {list}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div data-class-change className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <h3>Link List</h3>
      </div>
    </div>
  );
};

export const FooterLinks = (props: LinkListProps): JSX.Element => {
  const datasource = props.fields?.data?.datasource;
  const styles = `font-[inherit] ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;

  if (datasource) {
    const list = datasource.children.results
      .filter((element: ResultsFieldLink) => element?.field?.link)
      .map((element: ResultsFieldLink, key: number) => {
        const link = element.field.link;
        const href = link?.value?.href || '';

        return (
          <>
            <ContentSdkLink
              key={`${key}${href}-link`}
              className="font-[inherit]"
              field={element.field.link}
              prefetch={false}
            />
            <span
              key={`${key}${href}-separator`}
              className="font-[inherit] last:!hidden hidden lg:[.with-separators_&]:inline-block"
            >
              /
            </span>
          </>
        );
      });

    const parentBasedStyles =
      'lg:[.list-vertical_&]:flex-col flex-wrap [.position-center_&]:items-center [.position-center_&]:justify-center [.position-right_&]:items-end [.position-right_&]:justify-end';

    return (
      <div className={` ${styles}`} id={id ? id : undefined} data-class-change>
        <div
          className={`flex flex-col lg:flex-row ${parentBasedStyles} gap-x-10 gap-y-6 font-[inherit]`}
        >
          {list}
        </div>
      </div>
    );
  }

  return (
    <div data-class-change className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <h3>Link List</h3>
      </div>
    </div>
  );
};

export const HeaderPrimaryLinks = (props: LinkListProps): JSX.Element => {
  const datasource = props.fields?.data?.datasource;
  const styles = `font-[inherit] ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;

  if (datasource) {
    const list = datasource.children.results
      .filter((element: ResultsFieldLink) => element?.field?.link)
      .map((element: ResultsFieldLink, key: number) => {
        const link = element.field.link;
        const href = link?.value?.href || '';

        return (
          <li key={`${key}${href}-link`}>
            <ContentSdkLink field={element.field.link} prefetch={false} />
          </li>
        );
      });

    return (
      <ul className={`flex flex-col gap-4 ${styles}`} id={id ? id : undefined} data-class-change>
        {list}
      </ul>
    );
  }

  return (
    <div data-class-change className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <h3>Link List</h3>
      </div>
    </div>
  );
};

export const HeaderSecondaryLinks = (props: LinkListProps): JSX.Element => {
  const datasource = props.fields?.data?.datasource;
  const styles = `font-[inherit] ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;

  if (datasource) {
    const list = datasource.children.results
      .filter((element: ResultsFieldLink) => element?.field?.link)
      .map((element: ResultsFieldLink, key: number) => {
        const link = element.field.link;
        const href = link?.value?.href || '';

        return (
          <li key={`${key}${href}-link`}>
            <ContentSdkLink field={element.field.link} prefetch={false} />
          </li>
        );
      });

    return (
      <div className={`flex flex-col gap-2 ${styles}`} id={id ? id : undefined} data-class-change>
        <h5 className="text-sm font-(family-name:--font-accent) font-medium text-secondary-foreground uppercase">
          <Text field={datasource?.field?.title} />
        </h5>
        <ul className="flex flex-col gap-1">{list}</ul>
      </div>
    );
  }

  return (
    <div data-class-change className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <h3>Link List</h3>
      </div>
    </div>
  );
};
