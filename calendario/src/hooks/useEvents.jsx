// hooks/useEvents.js
import { useState, useEffect } from "react";
import { fetchMonths, updateMonth } from "../services/api";

export function useEvents() {
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMonths()
      .then(data => {
        setMonths(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando meses:", err);
        setLoading(false);
      });
  }, []);

  const addEvent = async (newEventData) => {
    try {
      const monthsData = await fetchMonths();
      const monthToUpdate = monthsData.find(m => m.month === newEventData.month);
      
      const dayToUpdate = monthToUpdate.days.find(d => d.day === newEventData.day);
      dayToUpdate.events.push(newEventData.event);

      await updateMonth(monthToUpdate.id, monthToUpdate);

      setMonths(prev =>
        prev.map(m => {
          if (m.month !== newEventData.month) return m;
          return {
            ...m,
            days: m.days.map(d => {
              if (d.day !== newEventData.day) return d;
              return { ...d, events: [...d.events, newEventData.event] };
            }),
          };
        })
      );
    } catch (err) {
      console.error("Error agregando evento:", err);
    }
  };

  const deleteEvent = async (month, day, eventIndex) => {
    try {
      const monthsData = await fetchMonths();
      const monthToUpdate = monthsData.find(m => m.month === month);
      const dayToUpdate = monthToUpdate.days.find(d => d.day === day);
      dayToUpdate.events.splice(eventIndex, 1);

      await updateMonth(monthToUpdate.id, monthToUpdate);

      setMonths(prev =>
        prev.map(m => {
          if (m.month !== month) return m;
          return {
            ...m,
            days: m.days.map(d => {
              if (d.day !== day) return d;
              return { ...d, events: d.events.filter((_, i) => i !== eventIndex) };
            }),
          };
        })
      );
    } catch (err) {
      console.error("Error eliminando evento:", err);
    }
  };

  return { months, loading, addEvent, deleteEvent };
}