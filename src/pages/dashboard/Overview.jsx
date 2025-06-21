import DashboardLayout from '../../layouts/DashboardLayout';
import KpiCard from '../../components/KpiCard.jsx';
import '../../styles/dashboard.css';
// import VisitLog from '../../components/VisitLog';
// import PipelineSummary from '../../components/PipelineSummary';
// import RevenueProgress from '../../components/RevenueProgress';
// import UpcomingActivities from '../../components/UpcomingActivities';
// import QuickActions from '../../components/QuickActions';
import React from 'react';

export default function Overview() {
  return (
    <DashboardLayout title='Overview'>
      <div className="dashboard-overview">

        {/* KPI Cards Section */}
        <section>
          <KpiCard title="Total Leads" value={0} icon={null} />
          <KpiCard title="Leads Converted This Month" value={0} icon={null} />
          <KpiCard title="Revenue Target" value={0} icon={null} />
        </section>

    
        {/* Visit Log */}
        {/* <section className="col-span-1">
          <VisitLog visits={[]} />
        </section> */}

        {/* Sales Pipeline Summary */}
        {/* <section className="col-span-1">
          <PipelineSummary data={[]} />
        </section> */}

        {/* Projected vs Actual Revenue */}
        {/* <section className="col-span-1">
          <RevenueProgress projected={0} actual={0} />
        </section> */}

        {/* Upcoming Activities */}
        {/* <section className="col-span-2">
          <UpcomingActivities activities={[]} />
        </section> */}

        {/* Quick Actions */}
        {/* <section className="col-span-1">
          <QuickActions />
        </section> */}
      </div>
    </DashboardLayout>
  );
}