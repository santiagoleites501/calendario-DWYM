import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  useParams
} from "react-router-dom";
import { useEffect, useState } from "react";

import AddEvent from "./components/AddEvent";
import EditEvent from "./components/EditEvent";
import MonthView from "./components/MonthView";
import DayView from "./components/DayView";

function Home() {
  return (
    <div>
      <h1>Inicio</h1>

      <Link to="/mes">
        <button>Ir a vista mensual</button>
      </Link>
    </div>
  );
}

function MonthPage({ months, onOpenPopup, onSelectDay }) {
  return (
    <MonthView
      months={months}
      onAddEvent={onOpenPopup}
      onSelectDay={onSelectDay}
    />
  );
}

function DayPage({ months, onDeleteEvent }) {
  const navigate = useNavigate();
  const { month, day } = useParams();

  const monthNumber = Number(month);
  const dayNumber = Number(day);

  const dayData = months
    .find(m => m.month === monthNumber)
    ?.days.find(d => d.day === dayNumber);

  if (!dayData) {
    return (
      <div>
        <h2>Día no encontrado</h2>
        <button onClick={() => navigate("/mes")}>Volver</button>
      </div>
    );
  }

  return (
    <DayView
      dayData={{ ...dayData, month: monthNumber }}
      onBack={() => navigate(-1)}
      onDeleteEvent={onDeleteEvent}
       onEditEvent={(eventIndex, event) =>
        onOpenEditPopup({ month: monthNumber, day: dayNumber, eventIndex, ...event })
      }
    />
  );
}

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/months")
      .then(res => res.json())
      .then(data => setMonths(data))
      .catch(err => console.error(err));
  }, []);

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  const handleAddEvent = async (newEventData) => {
    try {
      const res = await fetch("http://localhost:3000/months");
      const data = await res.json();

      const month = data.find(m => m.month === newEventData.month);
      const day = month.days.find(d => d.day === newEventData.day);

      day.events.push(newEventData.event);

      await fetch(`http://localhost:3000/months/${month.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(month),
      });

      setMonths(prev =>
        prev.map(m => {
          if (m.month !== newEventData.month) return m;

          return {
            ...m,
            days: m.days.map(d => {
              if (d.day !== newEventData.day) return d;

              return {
                ...d,
                events: [...d.events, newEventData.event],
              };
            }),
          };
        })
      );

    } catch (err) {
      console.error("Error agregando evento:", err);
    }
  };

  const handleDeleteEvent = async (month, day, eventIndex) => {
    try {
      const res = await fetch("http://localhost:3000/months");
      const data = await res.json();

      const monthData = data.find(m => m.month === month);
      const dayData = monthData.days.find(d => d.day === day);

      dayData.events.splice(eventIndex, 1);

      await fetch(`http://localhost:3000/months/${monthData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(monthData),
      });

      setMonths(prev =>
        prev.map(m => {
          if (m.month !== month) return m;

          return {
            ...m,
            days: m.days.map(d => {
              if (d.day !== day) return d;

              return {
                ...d,
                events: d.events.filter((_, i) => i !== eventIndex),
              };
            }),
          };
        })
      );

    } catch (err) {
      console.error("Error eliminando evento:", err);
    }
  };

  const navigate = useNavigate();

  const handleSelectDay = (dayData, month) => {
    navigate(`/dia/${month}/${dayData.day}`, {
      state: { dayData, month }
    });
  };

  return (
    <>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/mes"
          element={
            <MonthPage
              months={months}
              onOpenPopup={() => setIsPopupOpen(true)}
              onSelectDay={handleSelectDay}
            />
          }
        />

        <Route
          path="/dia/:month/:day"
          element={
            <DayPage
              months={months}
              onDeleteEvent={handleDeleteEvent}
            />
          }
        />

      </Routes>

      <AddEventPopup
        isOpen={isPopupOpen}
        onClose={handleClose}
        onAddEvent={handleAddEvent}
      />
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}