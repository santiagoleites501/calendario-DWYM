import { useNavigate, useParams } from "react-router-dom";
import DayView from "../components/DayView";

export default function DayPage({ months, onDeleteEvent }) {
  const navigate = useNavigate();
  const { month, day } = useParams();
  const monthNumber = Number(month);
  const dayNumber = Number(day);

  const monthData = months.find(m => m.month === monthNumber);
  const dayData = monthData?.days.find(d => d.day === dayNumber);

  if (!dayData) {
    return (
      <div>
        <h2>Día no encontrado</h2>
        <button onClick={() => navigate("/mes")}>Volver</button>
      </div>
    );
  }

  return (
    <DayView
      dayData={{ ...dayData, month: monthNumber }}
      onBack={() => navigate("/mes")}
      onDeleteEvent={onDeleteEvent}
    />
  );
}