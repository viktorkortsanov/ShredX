import React from 'react';
import { useTranslation } from 'react-i18next';

export default function TermsOfService() {
  const { t } = useTranslation();

  const useOfServicesList = t('terms_of_service.sections.useOfServices.list', { returnObjects: true });

  return (
    <div className="legal-doc-container">
      <h2 className="legal-doc-title">{t('terms_of_service.title')}</h2>
      <p className="legal-doc-text">
        {t('terms_of_service.introduction')}
      </p>

      <h3 className="legal-doc-subtitle">{t('terms_of_service.sections.acceptanceOfTerms.title')}</h3>
      <p className="legal-doc-text">
        {t('terms_of_service.sections.acceptanceOfTerms.content')}
      </p>

      <h3 className="legal-doc-subtitle">{t('terms_of_service.sections.accountRegistration.title')}</h3>
      <p className="legal-doc-text">
        {t('terms_of_service.sections.accountRegistration.content')}
      </p>

      <h3 className="legal-doc-subtitle">{t('terms_of_service.sections.useOfServices.title')}</h3>
      <p className="legal-doc-text">
        {t('terms_of_service.sections.useOfServices.content')}
      </p>
      <ul className="legal-doc-list">
        {Array.isArray(useOfServicesList) && useOfServicesList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3 className="legal-doc-subtitle">{t('terms_of_service.sections.terminationOfAccount.title')}</h3>
      <p className="legal-doc-text">
        {t('terms_of_service.sections.terminationOfAccount.content')}
      </p>

      <h3 className="legal-doc-subtitle">{t('terms_of_service.sections.limitationOfLiability.title')}</h3>
      <p className="legal-doc-text">
        {t('terms_of_service.sections.limitationOfLiability.content')}
      </p>

      <h3 className="legal-doc-subtitle">{t('terms_of_service.sections.changesToTerms.title')}</h3>
      <p className="legal-doc-text">
        {t('terms_of_service.sections.changesToTerms.content')}
      </p>
    </div>
  );
}