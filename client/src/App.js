import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Fab } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';

import CommercialScreen from './components/CommercialScreen/CommercialScreen';
import AdminLogin from './components/AdminLogin/AdminLogin';
import NotFound from './components/NotFound/NotFound';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { AdminContext } from './context/AdminContext';

import './App.scss';

function App() {
    let navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
            {isAdmin && (
                <Fab
                    className="admin-action"
                    color="primary"
                    onClick={() => navigate('/admin/panel')}
                >
                    <AdminPanelSettingsIcon />
                </Fab>
            )}
            <Routes>
                <Route exact path="/" element={<CommercialScreen />} />
                <Route exact path="/admin" element={<AdminLogin />} />
                {isAdmin && (
                    <Route exact path="/admin/panel" element={<AdminPanel />} />
                )}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AdminContext.Provider>
    );
}

export default App;
