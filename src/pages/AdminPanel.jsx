import DashboardLayout from '../layouts/AdminDashLayout';
import { Helmet } from 'react-helmet';

export default function AdminDashboard() {
    return (
        <DashboardLayout title='Admin Dashboard'>
        <Helmet>
            <title>Admin Dashboard | Alo—Sales</title>
        </Helmet>
        <div className="">
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard. Here you can manage users, view analytics, and configure settings.</p>
        </div>
        </DashboardLayout>
    );
}