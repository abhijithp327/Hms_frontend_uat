import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import DiverDashboard from '@/pages/diver/DiverDashboard';
import DiverLayout from '@/layouts/DiverLayout';
import DiverAllReports from '@/pages/diver/DiverAllReport';
import NotFoundPage from '@/pages/NotFoundPage';
import DiverJobReport from '@/pages/diver/DiverJobReport';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>

                {/* Public Routes */}
                <Route path='/login' element={<Login />} />
                <Route path="*" element={<NotFoundPage />} />

                {/* Diver Dashboard with Layout */}
                <Route element={<DiverLayout />}>
                    <Route path='/diver' element={<DiverDashboard />} />
                    <Route path='/diver-reports' element={<DiverAllReports />} />
                    <Route path='/diver-job-reports' element={<DiverJobReport />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default AppRoutes;
