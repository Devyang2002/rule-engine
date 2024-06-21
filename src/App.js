import QueryEditor from './pages/QueryEditor';
import DragAndDropEditor from './pages/DragAndDropEditor';
import FlowchartEditor from './pages/FlowchartEditor';
import { Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import HomePage from './pages/HomePage';
import PreLoader from './pages/PreLoader';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import { UserProvider } from './UserContext';
import { isLoggedIn } from './sessionStorage/auth';
import { useState } from 'react';

function App() {
  const [loggedIn , setLoggedIn] = useState(isLoggedIn());
  return (
    <>
    <UserProvider>
    <ToastContainer 
    autoClose={3000}
    pauseOnHover={true}
    />
    <div className="app">
      { loggedIn ?
      (<main className="content">
              <PreLoader/>
              <Navbar/>
                    <Routes>
                        <Route path='/' element={<HomePage/>}/>
                        {/* <Route path="/query" element={<QueryEditor/>}/>
                        <Route path="/d&d" element={<DragAndDropEditor/>}/>
                        <Route path="/flowchart" element={<FlowchartEditor/>}/> */}
                      </Routes>
                    </main>):(
                <main className="content">
                <Routes>
                    <Route path='/' element={<LoginPage/>}/>
                  </Routes>
                </main>
              )}
    </div>
    </UserProvider>
    </>
  );
}

export default App;