import DashboardLayout from '../../layouts/DashboardLayout';

export default function Visits() {
  return (
    <DashboardLayout title="Today's Visits">
      <div className="overview">
        <h1>Today's Visits</h1>
        <p>This is the today's visits page.</p>
      </div>
    </DashboardLayout>
  );
}