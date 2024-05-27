import QueryEditor from './pages/QueryEditor';
import DragAndDropEditor from './pages/DragAndDropEditor';
import FlowchartEditor from './pages/FlowchartEditor';
import { Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import HomePage from './pages/HomePage';
import PreLoader from './pages/PreLoader';

function App() {
  
  return (
    <>
    <div className="app">
    <PreLoader/>
      <main className="content">
        <Navbar/>
                <Routes>
                  <Route path='/' element={<HomePage/>}/>
                  <Route path="/query" element={<QueryEditor/>}/>
                  <Route path="/d&d" element={<DragAndDropEditor/>}/>
                  <Route path="/flowchart" element={<FlowchartEditor/>}/>
                </Routes>
              </main>
    </div>
    </>
  );
}

export default App;