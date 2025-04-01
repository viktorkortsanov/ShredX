import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {

    const newLang = i18n.language === 'en' ? 'bg' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="language-switcher">
      <button onClick={toggleLanguage}>
        {i18n.language === 'en' ? (
          <img src="/images/usa.svg" alt="Switch to Bulgarian" />
        ) : (
          <img src="/images/bg.png" alt="Switch to USA" />
        )}
      </button>
    </div>
  );
};

export default LanguageSwitcher;