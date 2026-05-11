
import { useState, useEffect } from "react";

function Popup({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  defaultMonth, 
  defaultDay, 
  defaultTitle, 
  defaultStart, 
  defaultEnd 
}) {
  const [month, setMonth] = useState(defaultMonth || 1);
  const [day, setDay] = useState(defaultDay || 1);
  const [eventTitle, setEventTitle] = useState(defaultTitle || "");
  const [startHour, setStartHour] = useState(defaultStart || "09:00");
  const [endHour, setEndHour] = useState(defaultEnd || "10:00");

  useEffect(() => {
    if (isOpen) {
      setMonth(defaultMonth || 1);
      setDay(defaultDay || 1);
      setEventTitle(defaultTitle || "");
      setStartHour(defaultStart || "09:00");
      setEndHour(defaultEnd || "10:00");
    }
  }, [isOpen, defaultMonth, defaultDay, defaultTitle, defaultStart, defaultEnd]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!eventTitle.trim()) {
      alert("Por favor, ingrese un título para el evento");
      return;
    }
    
    onSubmit({
      month: Number(month),
      day: Number(day),
      event: {
        title: eventTitle,
        startHour: startHour,
        endHour: endHour
      }
    });
    
    setEventTitle("");
    setStartHour("09:00");
    setEndHour("10:00");
    onClose();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        
        <form onSubmit={handleSubmit}>
          <label>Mes:</label>
          <input 
            type="number" 
            min="1" 
            max="12" 
            value={month} 
            onChange={(e) => setMonth(Number(e.target.value))} 
            required
          />
          
          <label>Día:</label>
          <input 
            type="number" 
            min="1" 
            max="31" 
            value={day} 
            onChange={(e) => setDay(Number(e.target.value))} 
            required
          />
          
          <label>Título del evento:</label>
          <input 
            type="text" 
            value={eventTitle} 
            onChange={(e) => setEventTitle(e.target.value)} 
            placeholder="Ej: Reunión importante"
            required
          />
          
          <label>Hora de inicio:</label>
          <input 
            type="time" 
            value={startHour} 
            onChange={(e) => setStartHour(e.target.value)} 
            required
          />
          
          <label>Hora de finalización:</label>
          <input 
            type="time" 
            value={endHour} 
            onChange={(e) => setEndHour(e.target.value)} 
            required
          />
          
          <div className="buttons">
            <button type="button" className="cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="save">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Popup;