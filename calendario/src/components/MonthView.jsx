// MonthView.js - VERSIÓN CORREGIDA
import { useState } from "react";

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function MonthView({ months, onAddEvent, onSelectDay }) {
  // Usar una fecha real del navegador
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonthNumber = currentDate.getMonth(); // 0-11

  if (months.length === 0) return <p>Cargando...</p>;

  
  const currentMonth = months.find(m => m.month === currentMonthNumber + 1);
  
  if (!currentMonth) return <p>Error: Mes no encontrado</p>;


  const firstDayOfMonth = new Date(currentYear, currentMonthNumber, 1);
  let startDay = firstDayOfMonth.getDay(); 
  


  const totalCells = startDay + currentMonth.days.length;
  const rows = Math.ceil(totalCells / 7);

  const goToPrevMonth = () => {
    const newDate = new Date(currentYear, currentMonthNumber - 1, 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentYear, currentMonthNumber + 1, 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="add-event-btn" onClick={onAddEvent}>
          Agregar Evento
        </button>
        <div className="view-selector">
          <select defaultValue="month">
            <option value="month">Mes</option>
            <option value="week">Semana</option>
          </select>
        </div>
      </div>

      <div className="month-nav">
        <button onClick={goToPrevMonth}>←</button>
        <button onClick={goToToday}>Hoy</button>
        <h2>{monthNames[currentMonthNumber]} {currentYear}</h2>
        <button onClick={goToNextMonth}>→</button>
      </div>

      <div className="week-days">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(d => (
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

        
          const isToday = dayData.day === new Date().getDate() && 
                         currentMonthNumber === new Date().getMonth() && 
                         currentYear === new Date().getFullYear();

          return (
            <button
              key={i}
              className={`day-cell ${dayData.events.length ? "has-events" : ""} ${isToday ? "today" : ""}`}
              onClick={() => onSelectDay(dayData, currentMonth.month)}
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