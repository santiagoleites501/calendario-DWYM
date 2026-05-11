// components/WeekView.js
import { useState, useMemo } from "react";

const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function WeekView({ months, currentDate, onAddEvent, onSelectDay, onEventClick }) {
  const [selectedHour, setSelectedHour] = useState(null);

  const weekDates = useMemo(() => {
    const startOfWeek = new Date(currentDate);
    const day = currentDate.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    startOfWeek.setDate(currentDate.getDate() + diff);
    
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }
    return week;
  }, [currentDate]);

  const hours = useMemo(() => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
      slots.push(`${String(i).padStart(2, '0')}:00`);
      slots.push(`${String(i).padStart(2, '0')}:30`);
    }
    return slots;
  }, []);

  const getEventsForDay = (date) => {
    const monthNumber = date.getMonth() + 1;
    const dayNumber = date.getDate();
    const monthData = months.find(m => m.month === monthNumber);
    if (!monthData) return [];
    const dayData = monthData.days.find(d => d.day === dayNumber);
    return dayData ? dayData.events : [];
  };

  const getEventsAtTime = (date, time) => {
    const events = getEventsForDay(date);
    return events.filter(event => event.startHour === time);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleSlotClick = (date, hour) => {
    setSelectedHour({ date, hour });
  };

  const handleQuickCreate = (title, endHour) => {
    if (selectedHour && title.trim()) {
      const newEvent = {
        title,
        startHour: selectedHour.hour,
        endHour: endHour || addOneHour(selectedHour.hour)
      };
      
      onAddEvent({
        month: selectedHour.date.getMonth() + 1,
        day: selectedHour.date.getDate(),
        event: newEvent
      });
      
      setSelectedHour(null);
    }
  };

  const addOneHour = (time) => {
    const [hours, minutes] = time.split(':');
    const newHour = (parseInt(hours) + 1).toString().padStart(2, '0');
    return `${newHour}:${minutes}`;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="add-event-btn" onClick={onAddEvent}>
          Agregar Evento
        </button>
        <div className="view-selector">
          <select 
            defaultValue="week"
            onChange={(e) => {
              if (e.target.value === "month") {
                window.location.href = "/mes";
              }
            }}
          >
            <option value="month">Mes</option>
            <option value="week">Semana</option>
          </select>
        </div>
      </div>

      <div className="month-nav">
        <h2>
          Semana del {weekDates[0].getDate()} al {weekDates[6].getDate()} de{" "}
          {weekDates[0].toLocaleString('es', { month: 'long' })}
        </h2>
      </div>

      <div className="week-view">
        <div className="week-header">
          <div className="time-col">Hora</div>
          {weekDates.map((date, idx) => (
            <div 
              key={idx} 
              className={`day-col ${isToday(date) ? 'today' : ''}`}
              onClick={() => onSelectDay(
                { day: date.getDate(), events: getEventsForDay(date) },
                date.getMonth() + 1
              )}
            >
              <div className="day-name">{weekDays[idx]}</div>
              <div className="day-number">{date.getDate()}</div>
              <div className="day-month">{date.toLocaleString('es', { month: 'short' })}</div>
            </div>
          ))}
        </div>

        <div className="week-body">
          {hours.map((hour, hourIdx) => (
            <div key={hourIdx} className="hour-row">
              <div className="hour-label">{hour}</div>
              {weekDates.map((date, dayIdx) => {
                const eventsAtTime = getEventsAtTime(date, hour);
                return (
                  <div
                    key={`${dayIdx}-${hourIdx}`}
                    className={`time-slot ${eventsAtTime.length > 0 ? 'has-event' : ''} ${isToday(date) ? 'today-slot' : ''}`}
                    onClick={() => handleSlotClick(date, hour)}
                  >
                    {eventsAtTime.map((event, eventIdx) => (
                      <div
                        key={eventIdx}
                        className="event-block"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onEventClick) {
                            onEventClick(event, date);
                          }
                        }}
                      >
                        <div className="event-title">{event.title}</div>
                        <div className="event-time">
                          {event.startHour} - {event.endHour}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {selectedHour && (
        <div className="popup-overlay" onClick={() => setSelectedHour(null)}>
          <div className="quick-popup" onClick={e => e.stopPropagation()}>
            <h3>Nuevo Evento</h3>
            <p>
              {selectedHour.date.toLocaleDateString('es', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
              <br />
              <strong>{selectedHour.hour}</strong>
            </p>
            
            <input
              type="text"
              id="quickEventTitle"
              placeholder="Título del evento"
              autoFocus
            />
            
            <input
              type="time"
              id="quickEventEnd"
              defaultValue={addOneHour(selectedHour.hour)}
            />
            
            <div className="buttons">
              <button className="cancel" onClick={() => setSelectedHour(null)}>
                Cancelar
              </button>
              <button 
                className="save" 
                onClick={() => {
                  const title = document.getElementById('quickEventTitle').value;
                  const endHour = document.getElementById('quickEventEnd').value;
                  handleQuickCreate(title, endHour);
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeekView;