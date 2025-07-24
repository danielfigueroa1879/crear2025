import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import ProcedureForm from './components/ProcedureForm';
import ProcedureList from './components/ProcedureList';
import Dashboard from './components/Dashboard';
import SearchBar from './components/SearchBar';
import MapView from './components/MapView';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <div>
            {!isAuthenticated ? (
                <LoginForm onLogin={handleLogin} />
            ) : (
                <div>
                    <Dashboard />
                    <SearchBar />
                    <ProcedureForm />
                    <ProcedureList />
                    <MapView />
                </div>
            )}
        </div>
    );
};

export default App;