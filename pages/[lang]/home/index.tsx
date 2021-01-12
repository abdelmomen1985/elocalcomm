import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import useTranslation from '../../../hooks/useTranslation';
import { getLocalizationProps } from '../../../Context/LangContext';
import Layout from './../../../components/Layouts/Layout';
import Header from '../../../components/Layouts/Header';

const HomePage: NextPage = () => {
  const { t, locale } = useTranslation();

  return (
    <>
      <Layout>
        <Header />
        <div>
          <h3>Home Page</h3>
        </div>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const localization = getLocalizationProps(ctx, 'common');
  return {
    props: {
      localization,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
export default HomePage;
