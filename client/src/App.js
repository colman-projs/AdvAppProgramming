import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import CommercialScreen from './components/CommercialScreen/CommercialScreen';
import AdminLogin from './components/AdminLogin/AdminLogin';
import NotFound from './components/NotFound/NotFound';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { AdminContext } from './context/AdminContext';
import AdminAvatar from './components/AdminAvatar/AdminAvatar';
import AdminProfile from './components/AdminProfile/AdminProfile';
import { getCurrentAdmin } from './actions/adminActions';
import { socket } from './socket';

import './App.scss';

function App() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const admin = getCurrentAdmin();

        socket.on("id", function (id) {
            console.log(id);
            // TODO: something with ID
        });
        

        if (admin) setIsAdmin(true);
        
        socket.on("id", function (id) {
            console.log(id);
            // TODO: something with ID
        });
    }, []);

    return (
        <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
            <AdminAvatar />
            <Routes>
                <Route exact path="/" element={<CommercialScreen />} />
                <Route exact path="/admin" element={<AdminLogin />} />
                {isAdmin && (
                    <Route exact path="/admin/panel" element={<AdminPanel />} />
                )}
                {isAdmin && (
                    <Route
                        exact
                        path="/admin/profile"
                        element={<AdminProfile />}
                    />
                )}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AdminContext.Provider>
    );
}

export default App;
