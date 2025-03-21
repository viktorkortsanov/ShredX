import React from 'react';
import programs from './programsData.js';
import Program from './program/ProgramCard.jsx';
import './programscontainer.css'

const ProgramsContainer = () => {
  return (
    <div className="programs-container">
      {programs.map((program) => (
        <Program key={program.id} program={program} />
      ))}
    </div>
  );
};

export default ProgramsContainer;
