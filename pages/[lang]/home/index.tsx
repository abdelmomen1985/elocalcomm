import React, { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import useTranslation from '../../../hooks/useTranslation';
import { getLocalizationProps } from '../../../Context/LangContext';
import Layout from './../../../components/Layouts/Layout';
import Header from '../../../components/Layouts/Header';
import { useQuery } from '@apollo/client';
import { GET_BRANCHES } from '../../../query/branches';

const HomePage: NextPage = () => {
  const { t, locale } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<any>({});
  const [allSelected, setAllSelected] = useState(true);
  const { data, loading } = useQuery(GET_BRANCHES, {
    fetchPolicy: 'no-cache',
    variables: {
      cat_id: selectedCategory?.id,
    },
  });
  const [branchesState, setBranchesState] = useState<any>([]);
  const [categoriesState, setCategoriesState] = useState<any>([]);
  console.log(data?.branches_aggregate?.nodes);
  console.log(data?.store_category_aggregate?.nodes);
  useEffect(() => {
    if (data) {
      setBranchesState(data?.branches_aggregate?.nodes);
      let allCategories = [...data?.store_category_aggregate?.nodes];
      let newCategories = [];
      for (let category in allCategories) {
        newCategories.push({ ...allCategories[category], active: false });
      }
      setCategoriesState(newCategories);
    }
  }, [data]);
  const allHandler = () => {
    setSelectedCategory({});
    setAllSelected(true);
    let allCategories = [...categoriesState];
    let newCategories = allCategories.map((cat) => {
      return { ...cat, active: false };
    });
    setCategoriesState(newCategories);
  };
  const catHandler = (category) => {
    category.active = true;
    let newCategory = { ...category };
    let allCategories = [...categoriesState];
    let newCategories = allCategories.map((cat) => {
      if (cat.id === newCategory.id) return newCategory;
      return cat;
    });
    setCategoriesState(newCategories);
    setSelectedCategory(category);
    setAllSelected(false);
  };
  return (
    <>
      <Layout>
        <Header />
        {loading ? (
          <h3>Loading please wait ...</h3>
        ) : (
          <div className="container mx-auto px-2">
            {/* categories section */}
            {categoriesState?.length > 0 && (
              <ul className="my-3">
                <li
                  onClick={allHandler}
                  className={
                    'inline-block text-green-700 border-b-2 border-white capitalize cursor-pointer font-bold hover:text-green-500 hover:border-b-2 hover:border-green-500 mx-3 my-3 ' +
                    (allSelected
                      ? 'text-green-500 border-b-2 border-green-500'
                      : '')
                  }
                >
                  All
                </li>
                {categoriesState?.map((category: any) => {
                  return (
                    <li
                      onClick={() => catHandler(category)}
                      key={category.id}
                      className={
                        'inline-block text-green-700 border-b-2 border-white capitalize cursor-pointer font-bold hover:text-green-500 hover:border-b-2 hover:border-green-500 mx-3 my-3 ' +
                        (category.active
                          ? 'text-green-500 border-b-2 border-green-500'
                          : '')
                      }
                    >
                      {category.name[locale]}
                    </li>
                  );
                })}
              </ul>
            )}
            {/* stores section */}
            {branchesState.length > 0 && (
              <section className="mb-5">
                <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 md:grid-cols-3">
                  {branchesState.map((branch) => {
                    return (
                      <div
                        key={branch.id}
                        className="border rounded-md shadow-md border-gray-400 my-3"
                      >
                        <img
                          src={branch.store.media.cover}
                          className="w-full rounded-md rounded-b-none"
                        />
                        <h3 className="p-3 text-green-600 font-bold text-lg">
                          {branch.name[locale]}
                        </h3>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        )}
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
