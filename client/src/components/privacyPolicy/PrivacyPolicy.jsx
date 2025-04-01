import './legaldoc.css';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  const informationWeCollectList = t('privacy_policy.sections.informationWeCollect.list', { returnObjects: true });
  const howWeUseYourInformationList = t('privacy_policy.sections.howWeUseYourInformation.list', { returnObjects: true });
  const dataSecurityList = t('privacy_policy.sections.dataSecurity.list', { returnObjects: true });
  const yourRightsList = t('privacy_policy.sections.yourRights.list', { returnObjects: true });

  return (
    <div className="legal-doc-container">
      <h2 className="legal-doc-title">{t('privacy_policy.title')}</h2>
      <p className="legal-doc-text">{t('privacy_policy.introduction')}</p>
      
      <h3 className="legal-doc-subtitle">{t('privacy_policy.sections.informationWeCollect.title')}</h3>
      <p className="legal-doc-text">{t('privacy_policy.sections.informationWeCollect.content')}</p>
      <ul className="legal-doc-list">
        {informationWeCollectList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3 className="legal-doc-subtitle">{t('privacy_policy.sections.howWeUseYourInformation.title')}</h3>
      <p className="legal-doc-text">{t('privacy_policy.sections.howWeUseYourInformation.content')}</p>
      <ul className="legal-doc-list">
        {howWeUseYourInformationList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3 className="legal-doc-subtitle">{t('privacy_policy.sections.dataSecurity.title')}</h3>
      <p className="legal-doc-text">{t('privacy_policy.sections.dataSecurity.content')}</p>
      <ul className="legal-doc-list">
        {dataSecurityList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3 className="legal-doc-subtitle">{t('privacy_policy.sections.yourRights.title')}</h3>
      <p className="legal-doc-text">{t('privacy_policy.sections.yourRights.content')}</p>
      <ul className="legal-doc-list">
        {yourRightsList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3 className="legal-doc-subtitle">{t('privacy_policy.sections.changesToThisPolicy.title')}</h3>
      <p className="legal-doc-text">{t('privacy_policy.sections.changesToThisPolicy.content')}</p>
    </div>
  );
}