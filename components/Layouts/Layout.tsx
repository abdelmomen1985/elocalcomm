import React, { ReactNode } from 'react';
import Head from 'next/head';
import Footer from './Footer';
import { NavLinks } from '../nav/NavLinks';
import useTranslation from './../../hooks/useTranslation';

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({
  children,
  title = 'This is the default title',
}: LayoutProps) => {
  const { locale } = useTranslation();
  return (
    // <div>
    <div style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {children}
      {/* <div>
        <NavLinks />
      </div>
      <Footer /> */}
    </div>
  );
};

export default Layout;
