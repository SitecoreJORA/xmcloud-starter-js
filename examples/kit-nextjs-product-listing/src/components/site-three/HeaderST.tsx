'use client';

import { useToggleWithClickOutside } from '@/hooks/useToggleWithClickOutside';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Link as ContentSdkLink,
  NextImage as ContentSdkImage,
  LinkField,
  ImageField,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { MiniCart } from './non-sitecore/MiniCart';
import { SearchBox } from './non-sitecore/SearchBox';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Logo: ImageField;
  SupportLink: LinkField;
  SearchLink: LinkField;
  CartLink: LinkField;
}

type HeaderSTProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: HeaderSTProps) => {
  const { isVisible: isMobileMenuVisible, setIsVisible: setIsMobileMenuVisible } =
    useToggleWithClickOutside<HTMLDivElement>(false);

  return (
    <section className={`${props.params?.styles}`} data-class-change>
      <div className="flex justify-between items-start">
        <div
          className="relative flex [.partial-editing-mode_&]:flex-col-reverse justify-between items-start gap-10 grow lg:px-4 bg-background"
          role="navigation"
        >
          <div
            className={`${
              isMobileMenuVisible
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            } fixed top-14 left-0 right-0
    flex flex-col items-center justify-center
    h-[calc(100vh-3.5rem)] p-4
    overflow-auto bg-background transition-all duration-300 ease-in-out`}
          >
            <ul className="flex flex-col my-auto text-center bg-background">
              <Placeholder
                name={`header-navigation-${props.params?.DynamicPlaceholderId}`}
                rendering={props.rendering}
              />
            </ul>
            <hr className="w-full border-border" />
            <ul>
              <li>
                <ContentSdkLink
                  field={props.fields?.SupportLink}
                  prefetch={false}
                  className="block p-4 font-(family-name:--font-accent) font-medium"
                />
              </li>
            </ul>
          </div>
          <li
            className="flex justify-center items-center p-4 cursor-pointer"
            onClick={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
          >
            <span className="relative w-5 h-4">
              <span
                className={`absolute left-0 top-0 w-full h-0.5 bg-current origin-top-right transition-transform duration-300 ease-in-out ${
                  isMobileMenuVisible ? '-rotate-47' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-current transition-all duration-300 ease-in-out ${
                  isMobileMenuVisible ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 w-full h-0.5 bg-current origin-bottom-right transition-transform duration-300 ease-in-out ${
                  isMobileMenuVisible ? 'rotate-47' : ''
                }`}
              />
            </span>
            <span className="pl-3"> Menu</span>
            {props.params.showSearchBox ? (
              <SearchBox searchLink={props.fields?.SearchLink} />
            ) : (
              <ContentSdkLink
                field={props.fields?.SearchLink}
                prefetch={false}
                className="block p-4 font-(family-name:--font-accent) font-medium"
              />
            )}
          </li>
          <div className="basis-full lg:basis-auto lg:ml-auto">
            <ul className="flex align-items">
              <li className="hidden lg:block">
                <ContentSdkLink
                  field={props.fields?.SupportLink}
                  prefetch={false}
                  className="block p-4 font-(family-name:--font-accent) font-medium"
                />
              </li>
              <li>
                {props.params.showMiniCart ? (
                  <MiniCart cartLink={props.fields?.CartLink} />
                ) : (
                  <ContentSdkLink
                    field={props.fields?.CartLink}
                    prefetch={false}
                    className="block p-4"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} width={24} height={24} />
                  </ContentSdkLink>
                )}
              </li>
              <li>
                <Link
                  href="/"
                  className="relative flex grow-0 shrink-0 w-30 lg:w-44 p-4 lg:p-6 z-100"
                  prefetch={false}
                >
                  <ContentSdkImage
                    field={props.fields?.Logo}
                    className="w-full h-full object-contain"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
