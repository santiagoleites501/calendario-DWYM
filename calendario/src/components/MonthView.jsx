import { useState } from "react";

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function MonthView({ months, onAddEvent, onSelectDay }) {

  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  if (months.length === 0) return <p>Cargando...</p>;

  const currentMonth = months[currentMonthIndex];

  const getStartDay = () => {
    let start = 1;

    for (let i = 0; i < currentMonthIndex; i++) {
      start = (start + months[i].days.length) % 7;
    }

    return start;
  };

  const startDay = getStartDay();

  const totalCells = startDay + currentMonth.days.length;
  const rows = Math.ceil(totalCells / 7);

  return (
    <div className="calendar-container">

      <div className="calendar-header">

        <button className="add-event-btn" onClick={onAddEvent}>
          Agregar Evento
        </button>

        <div className="view-selector">
          <select>
            <option>Mes</option>
            <option>Semana</option>
          </select>
        </div>

      </div>

      <div className="month-nav">
        <button onClick={() => setCurrentMonthIndex(i => (i - 1 + 12) % 12)}>←</button>
        <h2>{monthNames[currentMonthIndex]}</h2>
        <button onClick={() => setCurrentMonthIndex(i => (i + 1) % 12)}>→</button>
      </div>

      <div className="week-days">
        {["D", "L", "Ma", "Mi", "J", "V", "S"].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {Array.from({ length: rows * 7 }).map((_, i) => {

          const dayIndex = i - startDay;
          const dayData = currentMonth.days[dayIndex];

          if (dayIndex < 0 || !dayData) {
            return <div key={i} className="empty-cell"></div>;
          }

          return (
            <button
              key={i}
              className={`day-cell ${dayData.events.length ? "has-events" : ""}`}
              onClick={() => onSelectDay(dayData)}
            >
              {dayData.day}
            </button>
          );
        })}
      </div>

    </div>
  );
}

export default MonthView;