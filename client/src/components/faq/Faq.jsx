import { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  // Създаваме отделни states за всеки въпрос
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);

  return (
    <div className="faq-container">
      <h2 className="faq-title">Често задавани въпроси</h2>
      <div className="faq-list">
        {/* Въпрос 1 */}
        <div className="faq-item">
          <div 
            className="faq-question-container" 
            onClick={() => setIsOpen1(!isOpen1)}
          >
            <h3 className="faq-question">
              {/* Тук въведи първия въпрос */}
              Как мога да се регистрирам в платформата?
            </h3>
            <div className={`faq-arrow ${isOpen1 ? 'active' : ''}`}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className={`faq-answer ${isOpen1 ? 'active' : ''}`}>
            <p>
              {/* Тук въведи отговора на първия въпрос */}
              Отговор на първия въпрос...
            </p>
          </div>
        </div>

        {/* Въпрос 2 */}
        <div className="faq-item">
          <div 
            className="faq-question-container" 
            onClick={() => setIsOpen2(!isOpen2)}
          >
            <h3 className="faq-question">
              {/* Тук въведи втория въпрос */}
              Как мога да променя паролата си?
            </h3>
            <div className={`faq-arrow ${isOpen2 ? 'active' : ''}`}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className={`faq-answer ${isOpen2 ? 'active' : ''}`}>
            <p>
              {/* Тук въведи отговора на втория въпрос */}
              Отговор на втория въпрос...
            </p>
          </div>
        </div>

        {/* Въпрос 3 */}
        <div className="faq-item">
          <div 
            className="faq-question-container" 
            onClick={() => setIsOpen3(!isOpen3)}
          >
            <h3 className="faq-question">
              {/* Тук въведи третия въпрос */}
              Какви са методите за плащане?
            </h3>
            <div className={`faq-arrow ${isOpen3 ? 'active' : ''}`}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className={`faq-answer ${isOpen3 ? 'active' : ''}`}>
            <p>
              {/* Тук въведи отговора на третия въпрос */}
              Отговор на третия въпрос...
            </p>
          </div>
        </div>

        {/* Въпрос 4 */}
        <div className="faq-item">
          <div 
            className="faq-question-container" 
            onClick={() => setIsOpen4(!isOpen4)}
          >
            <h3 className="faq-question">
              {/* Тук въведи четвъртия въпрос */}
              Колко време отнема доставката?
            </h3>
            <div className={`faq-arrow ${isOpen4 ? 'active' : ''}`}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className={`faq-answer ${isOpen4 ? 'active' : ''}`}>
            <p>
              {/* Тук въведи отговора на четвъртия въпрос */}
              Отговор на четвъртия въпрос...
            </p>
          </div>
        </div>

        {/* Въпрос 5 */}
        <div className="faq-item">
          <div 
            className="faq-question-container" 
            onClick={() => setIsOpen5(!isOpen5)}
          >
            <h3 className="faq-question">
              {/* Тук въведи петия въпрос */}
              Как мога да се свържа с отдел поддръжка?
            </h3>
            <div className={`faq-arrow ${isOpen5 ? 'active' : ''}`}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className={`faq-answer ${isOpen5 ? 'active' : ''}`}>
            <p>
              {/* Тук въведи отговора на петия въпрос */}
              Отговор на петия въпрос...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;