import React from 'react';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import Signup from "./Component/SignUp"
import Login from "./Component/Login";
import Favorites from "./Component/Favorites";
import AuthProvider from "./Authcontext/AuthcontextProvider";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/favorite' element={<Favorites/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;


