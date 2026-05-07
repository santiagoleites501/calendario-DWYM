import { useEffect, useState } from "react";

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function MonthView({ onAddEvent }) {

  const [months, setMonths] = useState([]);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/months")
      .then(res => res.json())
      .then(data => setMonths(data))
      .catch(err => console.error(err));
  }, []);

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

  const goNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev + 1) % 12);
  };

  const goPrevMonth = () => {
    setCurrentMonthIndex((prev) => (prev - 1 + 12) % 12);
  };

  return (
    <div className="calendar-container">

      {/* top bar */}
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

      {/* navegación mes */}
      <div className="month-nav">
        <button onClick={goPrevMonth}>←</button>
        <h2>{monthNames[currentMonthIndex]}</h2>
        <button onClick={goNextMonth}>→</button>
      </div>

      {/* días semana */}
      <div className="week-days">
        {["D", "L", "Ma", "Mi", "J", "V", "S"].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* grilla */}
      <div className="calendar-grid">
        {Array.from({ length: rows * 7 }).map((_, i) => {

          const dayIndex = i - startDay;
          const dayData = currentMonth.days[dayIndex];

          if (dayIndex < 0 || !dayData) {
            return <div key={i} className="empty-cell"></div>;
          }

          const hasEvents = dayData.events.length > 0;

          return (
            <button
              key={i}
              className={`day-cell ${hasEvents ? "has-events" : ""}`}
              onClick={() => console.log("Ir al día", dayData.day)}
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