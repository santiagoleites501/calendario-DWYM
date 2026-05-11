
import { useState } from "react";
import { Link } from "react-router-dom";
import WeekView from "../components/WeekView";

export default function WeekPage({ months, onOpenPopup, onSelectDay, onEventClick }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goPrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goCurrentWeek = () => {
    setCurrentDate(new Date());
  };

  return (
    <>
      <div className="week-nav-buttons">
        <button onClick={goPrevWeek}>← Semana anterior</button>
        <button onClick={goCurrentWeek}>Semana actual</button>
        <button onClick={goNextWeek}>Semana siguiente →</button>
        <Link to="/mes">
          <button className="back-to-month">Volver al Mes</button>
        </Link>
      </div>

      <WeekView
        months={months}
        currentDate={currentDate}
        onAddEvent={onOpenPopup}
        onSelectDay={onSelectDay}
        onEventClick={onEventClick}
      />
    </>
  );
}