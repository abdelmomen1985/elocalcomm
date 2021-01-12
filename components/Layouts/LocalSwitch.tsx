import React from 'react';
import { useRouter } from 'next/router';
import { locales } from '../../i18n/config';
import useTranslation from '../../hooks/useTranslation';

const LocaleSwitcher: React.FC = () => {
  const router = useRouter();
  const handleLocaleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const targetLang = e.target.value;
      const regex = new RegExp(`^/(${locales.join('|')})`);
      router.push(
        router.pathname,
        router.asPath.replace(regex, `/${targetLang}`)
      );
    },
    [router]
  );
  const { t, locale } = useTranslation();
  return (
    <div
      style={{ display: 'inline-block', outline: 'none !important' }}
      className="mx-2"
    >
      <label className="language-switcher">
        <select onChange={handleLocaleChange} defaultValue={locale}>
          {locales.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default LocaleSwitcher;
