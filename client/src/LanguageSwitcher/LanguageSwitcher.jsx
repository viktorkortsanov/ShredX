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
          <svg width="24" height="24" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="bg-flag" preserveAspectRatio="xMidYMid meet">
            <path fill="#EEE" d="M32 5H4a4 4 0 0 0-4 4v5h36V9a4 4 0 0 0-4-4z"></path>
            <path fill="#D62612" d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-5H0v5z"></path>
            <path fill="#00966E" d="M0 14h36v8H0z"></path>
          </svg>
        )}
      </button>
    </div>
  );
};

export default LanguageSwitcher;