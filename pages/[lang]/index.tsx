import { useEffect, useState } from 'react';
import Layout from '../../components/Layouts/Layout';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getLocalizationProps } from '../../Context/LangContext';
import useTranslation from '../../hooks/useTranslation';
interface service {
  name: string;
  description: {
    ar: string;
    en: string;
  };
  icon: string;
}
const IndexPage: NextPage = () => {
  const [servicesState, setServicesState] = useState<service[]>([]);
  const { t, locale } = useTranslation();
  useEffect(() => {
    let services = [
      {
        name: 'downPay',
        description: {
          ar: 'تقدر تدفع مقدم قد ايه ؟',
          en:
            'Search By Down Payment And Choose How Much You Want To Pay Upfront.',
        },

        icon:
          '<svg style="width: 75px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#3730A3"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>',
      },
      {
        name: 'monthlyPay',
        description: {
          en:
            'Choose How Much You Want To Spend Per Month And Find Options Within Your Budget.',
          ar: 'القسط الشهري المناسب ليك ؟',
        },
        icon:
          '<svg style="width: 75px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#3730A3"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>        ',
      },
      {
        name: 'deliveryDate',
        description: {
          en: 'Find A Home That Is Ready-To-Move When You Are Ready To Move.',
          ar: 'تحب تسكن امتى ؟',
        },

        icon:
          '<svg style="width: 75px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#3730A3"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>',
      },
      {
        name: 'finishingType',
        description: {
          ar: 'تفضل تستلم وحدة متشطبة ولا تشطب بنفسك',
          en: 'Choose A Home That Is Customisable To Your Liking.',
        },
        icon:
          '<svg style="width: 75px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#3730A3"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>',
      },
    ];
    setServicesState(services);
  }, []);

  return (
    <Layout title="Realestate Brand">
      {/* top section */}
      <section
        className="flex flex-wrap bg-local pt-20 items-center justify-center"
        style={{
          background:
            'url(https://www.sakneen.com/assets/images/landingPage/landingHeader.png) no-repeat 50% fixed',
          backgroundSize: 'cover',
          minHeight: '100vh',
        }}
      >
        <h1 className="text-white">{t('header')}</h1>
      </section>
      {/* search factors  */}
      <section className="container mx-auto px-2 my-10">
        <h3 className="text-center text-blue-900 text-4xl sm:text-3xl font-bold">
          {t('homeSearchHeader')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4">
          {servicesState.map((service, key) => {
            return (
              <div className="text-center my-5" key={key}>
                <div
                  style={{ display: 'flex', justifyContent: 'center' }}
                  dangerouslySetInnerHTML={{ __html: service.icon }}
                />
                {/* {service.icon} */}
                <h3 className="text-3xl font-bold my-1 text-indigo-800">
                  {t(`${service.name}`)}
                </h3>
                <p>{service.description[locale]}</p>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
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
export default IndexPage;
