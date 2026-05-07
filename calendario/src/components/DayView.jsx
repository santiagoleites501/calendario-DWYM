import { useState } from "react";

function DayView({ dayData, onBack, onDeleteEvent }) {
  const [currentDay, setCurrentDay] = useState(dayData);

  if (!currentDay) return <p>No hay datos</p>;

  const handleDelete = (index) => {
    onDeleteEvent(currentDay.day, index);

    setCurrentDay(prev => ({
      ...prev,
      events: prev.events.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="day-container">

      <button className="back-btn" onClick={onBack}>
        ← Volver
      </button>

      <div className="day-header">
        <h2>Día {currentDay.day}</h2>
      </div>

      <div className="events-list">
        {currentDay.events.length === 0 ? (
          <p>No hay eventos</p>
        ) : (
          currentDay.events.map((event, index) => (
            <div key={index} className="event-item">

              <span>
                <strong>{event.title}</strong> inicio {event.startHour} fin {event.endHour}
              </span>

              <div className="event-actions">
                <button className="icon-btn edit">✏️</button>

                <button
                  className="icon-btn delete"
                  onClick={() => handleDelete(index)}
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