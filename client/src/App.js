import React from 'react';

import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

import SignUp from './pages/authorization/signup/signup';
import LogIn from './pages/authorization/login/login';
import Profile from './pages/profile/index';


function App() {
    return (
        <Router>
        <Routes>
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profile' element={<Profile />}/>
        </Routes>
        </Router>
    );
}


export default App;