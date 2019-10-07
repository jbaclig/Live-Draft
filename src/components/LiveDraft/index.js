import React, { useState } from 'react';
import BoardContainer from '../../containers/BoardContainer';
import TeamContainer from '../../containers/TeamContainer';
import Selector from './Selector';

function LiveDraft() {
  const [type, setType] = useState(null);

  return type ?
    type === 'board' ? 
      <BoardContainer setType={setType} /> :
      <TeamContainer setType={setType} /> :
    <Selector setType={setType} />
}

export default LiveDraft;