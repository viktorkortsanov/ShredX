import React, { useState, useEffect } from 'react';
import Program from './program/ProgramCard.jsx';
import './programscontainer.css';
import { useAuth } from '../../contexts/authContext.jsx';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProgramsContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const programsPerPage = 3;
  const { getAllPrograms, lastProgramsFetch } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    let isMounted = true;

    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const fetchedPrograms = await getAllPrograms();
        if (isMounted) {
          setPrograms(fetchedPrograms);
        }
      } catch (error) {
        console.error("Failed to fetch programs:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPrograms();

    return () => {
      isMounted = false;
    };
  }, [getAllPrograms, location.key, lastProgramsFetch]);

  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = programs.slice(indexOfFirstProgram, indexOfLastProgram);

  const nextPage = () => {
    if (currentPage < Math.ceil(programs.length / programsPerPage)) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div className="loading">{t('programs.loadingPrograms')}...</div>;
  }

  return (
    <div className="programs-wrapper">
      <div className="program-container">
        {currentPrograms.length > 0 ? (
          currentPrograms.map((program) => (
            <Program key={program.id} program={program} />
          ))
        ) : (
          <p>{t('programs.noPrograms')}</p>
        )}
      </div>

      {programs.length > programsPerPage && (
        <div className="programs-pagination">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="programs-pagination-arrow prev-arrow"
            aria-label="Previous page"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="programs-arrow-icon">
              <polyline id="secondary" points="15.5 5 8.5 12 15.5 19" style={{ fill: 'none', stroke: 'rgb(44, 169, 188)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}></polyline>
              <polyline id="primary" points="10 19 3 12 10 5" style={{ fill: 'none', stroke: 'rgb(255, 255, 255)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}></polyline>
              <polyline id="primary-2" points="21 5 14 12 21 19" style={{ fill: 'none', stroke: 'rgb(255, 255, 255)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}></polyline>
            </svg>
          </button>

          <div className="programs-page-numbers">
            {Array.from({ length: Math.ceil(programs.length / programsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`programs-page-number ${currentPage === index + 1 ? 'active' : ''}`}
                aria-label={`Page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(programs.length / programsPerPage)}
            className="programs-pagination-arrow next-arrow"
            aria-label="Next page"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" id="triple-right-sign" xmlns="http://www.w3.org/2000/svg" className="programs-arrow-icon">
              <path id="secondary" d="M8.5,20a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42L14.09,12,7.79,5.71A1,1,0,1,1,9.21,4.29l7,7a1,1,0,0,1,0,1.42l-7,7A1,1,0,0,1,8.5,20Z" style={{ fill: 'rgb(44, 169, 188)' }}></path>
              <path id="primary" d="M14,20a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42L19.59,12l-6.3-6.29a1,1,0,0,1,1.42-1.42l7,7a1,1,0,0,1,0,1.42l-7,7A1,1,0,0,1,14,20ZM3.71,19.71l7-7a1,1,0,0,0,0-1.42l-7-7A1,1,0,0,0,2.29,5.71L8.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0Z" style={{ fill: 'rgb(255, 255, 255)' }}></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgramsContainer;