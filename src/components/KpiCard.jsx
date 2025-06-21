import { PiPlaceholderFill } from "react-icons/pi";

export default function KpiCard({ title, value, icon }) {
    return (
        <div className="kpi-card">
            <div className="kpi-icon">
                {icon ? icon : <PiPlaceholderFill />}
            </div>
            <div className="kpi-content">
                <h3>{value}</h3>
                <p>&nbsp;{title}</p>
            </div>
        </div>
    );
}