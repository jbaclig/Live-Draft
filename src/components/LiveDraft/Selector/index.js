import React from 'react';

const Selector = ({ setType }) => 
  <section className="selector">
    <h1>Login As:</h1>
    <button 
      id="draftBoardBtn"
      onClick={() => setType('board')}
    >
      Draft Board
    </button>
    <button 
      id="teamBtn"
      onClick={() => setType('team')}
    >
      Team
    </button>
  </section>

export default Selector;