import { Button } from '@mui/material';
import React, { useState } from 'react';

function FlowchartEditor({handleClose}) {

  const handleModalClose = () =>{
    handleClose();
  }
  
  return (
    <div>
      <h2>Flowchart Editor</h2>
      <Button onClick={handleModalClose}>Close</Button>
      
    </div>
  );
}

export default FlowchartEditor;
