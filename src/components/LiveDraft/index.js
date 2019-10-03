import React, { useState } from 'react';
import BoardContainer from '../../containers/BoardContainer';
import Team from './Team';
import Selector from './Selector';

function LiveDraft() {
  const [type, setType] = useState(null);

  return type ?
    type === 'board' ? 
      <BoardContainer setType={setType} /> :
      <Team setType={setType} /> :
    <Selector setType={setType} />
}

export default LiveDraft;