// import { useState, useCallback } from 'react';
// import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges } from 'reactflow';
// import 'reactflow/dist/style.css';


// const initialNodes = [
//   {
//  id: '1',
//  data: { label: 'Hello' },
//  position: { x: 0, y: 0 },
//  type: 'input',
//   },
//   {
//  id: '2',
//  data: { label: 'World' },
//  position: { x: 100, y: 100 },
//   },
// ];


// const initialEdges = [{ id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' }];


// function FlowchartEditor() {
//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState(initialEdges);


//   const onNodesChange = useCallback(
//  (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//  []
//   );
//   const onEdgesChange = useCallback(
//  (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//  []
//   );


//   return (
//  <div style={{ height: '500px' }}>
//    <ReactFlow
//      nodes={nodes}
//      onNodesChange={onNodesChange}
//      edges={edges}
//      onEdgesChange={onEdgesChange}
//    >
//      <Background />
//      <Controls />
//    </ReactFlow>
//  </div>
//   );
// }

// export default FlowchartEditor

import React from 'react'

const FlowchartEditor = () => {
  return (
    <div style={{
      color:"white"
    }}>
      Flowchart Editor
    </div>
  )
}

export default FlowchartEditor
