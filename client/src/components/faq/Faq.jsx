import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './FAQ.css';

const FAQ = () => {
  const { t } = useTranslation();
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);

  return (
    <div className="faq-container">
      <h2 className="faq-title">{t('faq.title')}</h2>

      <div className="faq-list">
        <div className="faq-item">
          <div 
            className="faq-question-container" 
            onClick={() => setIsOpen1(!isOpen1)}
          >
            <h3 className="faq-question">
              {t('faq.question1')}
            </h3>
            <div className={`faq-arrow ${isOpen1 ? 'active' : ''}`}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className={`faq-answer ${isOpen1 ? 'active' : ''}`}>
            <p>
              {t('faq.answer1')}
            </p>
          </div>
        </div>
        <div className="faq-item">
          <div 
            className="faq-question-container" 
            onClick={() => setIsOpen2(!isOpen2)}
          >
            <h3 className="faq-question">
              {t('faq.question2')}
            </h3>
            <div className={`faq-arrow ${isOpen2 ? 'active' : ''}`}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className={`faq-answer ${isOpen2 ? 'active' : ''}`}>
            <p>
              {t('faq.answer2')}
            </p>
          </div>
        </div>
        <div className="faq-item">
          <div 
            className="faq-question-container" 
            onClick={() => setIsOpen3(!isOpen3)}
          >
            <h3 className="faq-question">
              {t('faq.question3')}
            </h3>
            <div className={`faq-arrow ${isOpen3 ? 'active' : ''}`}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className={`faq-answer ${isOpen3 ? 'active' : ''}`}>
            <p>
              {t('faq.answer3')}
            </p>
          </div>
        </div>
        <div className="faq-item">
          <div 
            className="faq-question-container" 
            onClick={() => setIsOpen4(!isOpen4)}
          >
            <h3 className="faq-question">
              {t('faq.question4')}
            </h3>
            <div className={`faq-arrow ${isOpen4 ? 'active' : ''}`}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className={`faq-answer ${isOpen4 ? 'active' : ''}`}>
            <p>
              {t('faq.answer4')}
            </p>
          </div>
        </div>
        <div className="faq-item">
          <div 
            className="faq-question-container" 
            onClick={() => setIsOpen5(!isOpen5)}
          >
            <h3 className="faq-question">
              {t('faq.question5')}
            </h3>
            <div className={`faq-arrow ${isOpen5 ? 'active' : ''}`}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className={`faq-answer ${isOpen5 ? 'active' : ''}`}>
            <p>
              {t('faq.answer5')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;