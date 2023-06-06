import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Home, Login, Logout, Posts, Register, Upload } from './pages';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login logic
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic
    setIsLoggedIn(false);
  };
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <div className="flex items-center space-x-4">
          <Link to ="/" className="font-inter font-medium text-white bg-[#6469ff] px-4 py-2 rounded-md hover:bg-[#5054d6] transition-colors duration-300 ease-in-out">Home</Link>
          <Link to ="/posts" className="font-inter font-medium text-white bg-[#6469ff] px-4 py-2 rounded-md hover:bg-[#5054d6] transition-colors duration-300 ease-in-out">View Images</Link>
          {isLoggedIn ? null : (
            <Link to ="/register" className="font-inter font-medium text-white bg-[#6469ff] px-4 py-2 rounded-md hover:bg-[#5054d6] transition-colors duration-300 ease-in-out">Register</Link>
          )}
          {isLoggedIn ? ( 
            <Link to ="/upload" className="font-inter font-medium text-white bg-[#6469ff] px-4 py-2 rounded-md hover:bg-[#5054d6] transition-colors duration-300 ease-in-out">Upload</Link> 
          ) : null
          }
          {isLoggedIn ? (
          <Link to="/logout" className="font-inter font-medium text-white bg-[#6469ff] px-4 py-2 rounded-md hover:bg-[#5054d6] transition-colors duration-300 ease-in-out">Logout</Link> 
          ) : (
            <Link to="/login" className="font-inter font-medium text-white bg-[#6469ff] px-4 py-2 rounded-md hover:bg-[#5054d6] transition-colors duration-300 ease-in-out">Login</Link>
          )}
        </div>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register handleLogin={handleLogin} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
