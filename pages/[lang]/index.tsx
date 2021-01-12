import { useEffect, useState } from 'react';
import Layout from '../../components/Layouts/Layout';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getLocalizationProps } from '../../Context/LangContext';
import useTranslation from '../../hooks/useTranslation';
import { useRouter } from 'next/router';
interface service {
  name: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  icon: string;
  background: string;
}
let services = [
  {
    name: {
      ar: 'سوبر ماركت',
      en: 'Groceries',
    },
    description: {
      ar:
        'متوقفش في طوابير انتظار، احمي نفسك وعيلتك واطلب اونلاين من أفضل محلات السوبر ماركت القريبة ليك',
      en:
        "Don't stand in line ... order online! Choose from the top groceries delivering near you",
    },
    icon: 'https://i.imgur.com/km1XEwf.png',
    background: '#05c46b',
  },
  {
    name: {
      ar: 'مغسلة',
      en: 'Laundry',
    },
    description: {
      ar: 'اغسل ملابسك بأحسن الأسعار',
      en: 'Get your cloths clean and fresh for the best offer',
    },
    icon: 'https://i.imgur.com/sbTcPUi.png',
    background: '#ffd32a',
  },
  {
    name: {
      ar: 'مطبخ منزلي',
      en: 'Home Kitchen',
    },
    description: {
      ar: 'طعام صحي وطازج ونظيف بأفضل الأسعار',
      en: 'Fresh, Healthy and Clean food for best prices',
    },
    icon: 'https://i.imgur.com/H8Yogva.png',
    background: '#ff5e57',
  },
  {
    name: {
      ar: 'صيدلية',
      en: 'Pharmacy',
    },
    description: {
      ar: 'علاجك هيوصلك لحد البيت في أي وقت من الأسبوع',
      en: 'Get your Medications delivered to you 24/7',
    },
    icon: 'https://i.imgur.com/gKYvmJ4.png',
    background: '#3c40c6',
  },
];
const IndexPage: NextPage = () => {
  const router = useRouter();
  const [servicesState, setServicesState] = useState<service[]>([]);
  const [mapModalState, setMapModalState] = useState(false);
  const [user, setUser] = useState(false);
  const { t, locale } = useTranslation();
  useEffect(() => {
    setServicesState(services);
  }, []);

  useEffect(() => {
    if (user) {
      router.push(`/${locale}/home`);
    }
  }, [user]);
  const openMapHandler = () => {
    setMapModalState(true);
    setUser(true);
  };
  return (
    <Layout title="Local E-Commerce">
      {/* location section */}
      <section
        className="flex flex-wrap bg-local pt-20 items-center justify-center"
        style={{
          background:
            'url(https://i.imgur.com/SnKVR5M.png) no-repeat 50% fixed',
          backgroundSize: 'cover',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            width: '70%',
            margin: '0 auto',
            display: 'block',
            textAlign: 'center',
          }}
        >
          <h1 className="text-white">Order Online in Egypt</h1>
          <button
            onClick={openMapHandler}
            style={{
              background: '#fff',
              outline: 'none',
              border: '1px solid #ccc',
              boxShadow: '0 2px 2px #eee',
              padding: '5px 15px',
              display: 'block',
              margin: '20px auto',
            }}
          >
            <i className="fas fa-map-marker text-green-700"></i>{' '}
            <span className="font-bold text-lg text-gray-600 px-3">
              Address or ZIP Code
            </span>
          </button>
        </div>
      </section>
      {/* Services Section   */}
      <section className="container mx-auto px-2 my-10">
        <h3 className="text-center text-blue-900 text-4xl sm:text-3xl font-bold">
          Our Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {servicesState.map((service, key) => {
            return (
              <div
                className="m-5 flex shadow-md"
                style={{ backgroundColor: '#f3f3f3' }}
                key={key}
              >
                <div
                  style={{
                    padding: '0px 0px 10px 10px',
                    borderRadius: '5px 0 0 5px',
                    marginRight: '10px',
                    borderRight: '1px solid #ccc',
                    backgroundColor: service.background,
                  }}
                >
                  <img
                    src={service.icon}
                    style={{ width: '150px', height: '135px' }}
                  />
                </div>
                <div
                  style={{
                    padding: '5px 10px',
                    borderRadius: '0 5px 5px 0',
                  }}
                >
                  <h3 className="text-2xl font-bold my-1 text-indigo-800">
                    {service.name[locale]}
                  </h3>
                  <p>{service.description[locale]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* App Section */}
      <section className="container mx-auto px-2 my-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold py-3">
              Download our App for Android and IOS
            </h3>
            <p className="text-md pb-3">Get what you need when you need it</p>
            <a style={{ display: 'inline-block' }}>
              <img
                src="https://i.imgur.com/Th4Q8Dz.png"
                style={{ width: '100px', height: '50px' }}
              />
            </a>
            <a
              style={{
                marginLeft: locale === 'en' ? '15px' : '0',
                marginRight: locale === 'ar' ? '15px' : '0',
                display: 'inline-block',
              }}
            >
              <img
                src="https://i.imgur.com/ZC9kBXw.png"
                style={{ width: '100px', height: '50px' }}
              />
            </a>
          </div>
          <div>
            <img
              src="https://i.imgur.com/riVTNDT.png"
              style={{ width: '100%' }}
            />
          </div>
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
