import React, { useState } from 'react';
import { Button } from '@mui/material';
import '../styles/DragAndDropEditor.css'

function DragAndDropEditor({handleClose}) {
    const handleModalClose = () => {
      handleClose();
    };
  
  const [dragItems, setDragItems] = useState([
    { id: '1', name: 'Temperature' },
    { id: '2', name: 'Level' },
    { id: '3', name: 'Action 1' },
    { id: '4', name: 'Action 2' },
  ]);
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };
  const handleDrop = (e) => {
    const id = e.dataTransfer.getData('text/plain');
    const item = dragItems.find(item => item.id === id);
    setDroppedItems(prevItems => [...prevItems, item]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className='container'>
      <h2>Drag-and-Drop Editor</h2>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ border: '1px solid #ccc', minHeight: '200px', padding: '20px' }}
      >
        {droppedItems.map(item => (
          <div key={item.id} style={{ marginBottom: '10px' }}>
            {item.name}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Draggable Items</h3>
        {dragItems.map(item => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            style={{ cursor: 'move', marginBottom: '10px' }}
          >
            {item.name}
          </div>
        ))}
      <Button onClick={handleModalClose}>Close</Button>
      </div>
    </div>
  );
}

export default DragAndDropEditor;
