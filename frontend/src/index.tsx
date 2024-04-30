import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import TodosPage from './pages/todos'
import AuthPage from './pages/auth';
import PrivateRoute from './components/PrivateRoute';
import { useAuthentication } from './hooks/useAuthentication';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <React.StrictMode>
                    <Routes>
                        <Route path='/' element={<PrivateRoute />}>
                            <Route path='/' element={<TodosPage />} />
                        </Route>
                        <Route path="/auth" element={<AuthPage />} />
                    </Routes>
                </React.StrictMode>
            </Fragment>

        </BrowserRouter>
    );
};


ReactDOM.render(
    <App />,
    document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
