import { useState } from "react";

const months = [
  { month: 1, name: "Enero", days: 31 },
  { month: 2, name: "Febrero", days: 29 },
  { month: 3, name: "Marzo", days: 31 },
  { month: 4, name: "Abril", days: 30 },
  { month: 5, name: "Mayo", days: 31 },
  { month: 6, name: "Junio", days: 30 },
  { month: 7, name: "Julio", days: 31 },
  { month: 8, name: "Agosto", days: 31 },
  { month: 9, name: "Septiembre", days: 30 },
  { month: 10, name: "Octubre", days: 31 },
  { month: 11, name: "Noviembre", days: 30 },
  { month: 12, name: "Diciembre", days: 31 },
];

function AddEventPopup({ isOpen, onClose, onAddEvent }) {

  const [title, setTitle] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");

  if (!isOpen) return null;

  const currentMonth = months.find(
    (m) => m.month === Number(selectedMonth)
  );

  const handleSubmit = () => {

    const newEvent = {
      title,
      startHour,
      endHour,
    };

    onAddEvent({
      month: selectedMonth,
      day: selectedDay,
      event: newEvent
    });

    // reset
    setTitle("");
    setSelectedMonth(1);
    setSelectedDay(1);
    setStartHour("");
    setEndHour("");
  };

  return (
    <div className="popup-overlay">
      <div className="popup">

        <h2>Crear evento</h2>

        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Fecha:</label>
        <div className="date-row">

          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(Number(e.target.value));
              setSelectedDay(1);
            }}
          >
            {months.map((month) => (
              <option key={month.month} value={month.month}>
                {month.name}
              </option>
            ))}
          </select>

          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(Number(e.target.value))}
          >
            {Array.from(
              { length: currentMonth.days },
              (_, index) => index + 1
            ).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

        </div>

        <label>Hora inicio:</label>
        <input
          type="text"
          value={startHour}
          onChange={(e) => setStartHour(e.target.value)}
        />

        <label>Hora final:</label>
        <input
          type="text"
          value={endHour}
          onChange={(e) => setEndHour(e.target.value)}
        />

        <div className="buttons">
          <button className="save" onClick={handleSubmit}>
            Guardar
          </button>

          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddEventPopup;