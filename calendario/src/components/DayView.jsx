const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function DayView({ dayData, onBack, onDeleteEvent }) {
  if (!dayData) return <p>No hay datos</p>;

  return (
    <div className="day-container">
      <button className="back-btn" onClick={onBack}>
        ← Volver
      </button>

      <div className="day-header">
        <h2>
          {monthNames[dayData.month - 1]} {dayData.day}
        </h2>
      </div>

      <div className="events-list">
        {dayData.events.length === 0 ? (
          <p>No hay eventos</p>
        ) : (
          dayData.events.map((event, index) => (
            <div key={index} className="event-item">
              <span>
                <strong>{event.title}</strong> inicio {event.startHour} fin {event.endHour}
              </span>

              <div className="event-actions">
                <button className="icon-btn edit">✏️</button>

                <button
                  className="icon-btn delete"
                  onClick={() =>
                    onDeleteEvent(dayData.month, dayData.day, index)
                  }
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DayView;