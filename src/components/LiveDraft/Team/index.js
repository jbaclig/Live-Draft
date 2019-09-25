import React from 'react';

const Team = ({ setType }) => 
  <section className="team">
    <h1>Team</h1>
    <button
      id="backBtn"
      onClick={() => setType(null)}
    >
      Back
    </button>
  </section>

export default Team;