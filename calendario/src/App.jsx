import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";
import { useEffect, useState } from "react";

import AddEventPopup from "./components/AddEvent";
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

function DayPage({ onDeleteEvent }) {
  const navigate = useNavigate();
  const location = useLocation();

  const dayData = location.state?.dayData;

  return (
    <DayView
      dayData={dayData}
      onBack={() => navigate(-1)}
      onDeleteEvent={onDeleteEvent}
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

  const handleAddEvent = (newEventData) => {
    setMonths(prevMonths =>
      prevMonths.map(m => {
        if (m.month !== newEventData.month) return m;

        return {
          ...m,
          days: m.days.map(d => {
            if (d.day !== newEventData.day) return d;

            return {
              ...d,
              events: [...d.events, newEventData.event]
            };
          })
        };
      })
    );

    setIsPopupOpen(false);
  };

  const handleDeleteEvent = (day, eventIndex) => {
    setMonths(prevMonths =>
      prevMonths.map(m => ({
        ...m,
        days: m.days.map(d => {
          if (d.day !== day) return d;

          return {
            ...d,
            events: d.events.filter((_, i) => i !== eventIndex)
          };
        })
      }))
    );
  };

  const navigate = useNavigate();

  const handleSelectDay = (dayData) => {
    navigate(`/dia/${dayData.day}`, { state: { dayData } });
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
          path="/dia/:day"
          element={
            <DayPage onDeleteEvent={handleDeleteEvent} />
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