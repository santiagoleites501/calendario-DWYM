// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { useEvents } from "./hooks/useEvents";
import AddEventPopup from "./components/AddEvent";
import HomePage from "./pages/HomePage";
import MonthPage from "./pages/MonthPage";
import WeekPage from "./pages/WeekPage";
import DayPage from "./pages/DayPage";

import "./styles/calendar.css";
import "./styles/weekView.css";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { months, loading, addEvent, deleteEvent } = useEvents();

  const handleSelectDay = (dayData, month) => {
    window.location.href = `/dia/${month}/${dayData.day}`;
  };

  const handleEventClick = (event, date) => {
    window.location.href = `/dia/${date.getMonth() + 1}/${date.getDate()}`;
  };

  if (loading) {
    return <div className="loading">Cargando calendario...</div>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
          path="/semana"
          element={
            <WeekPage
              months={months}
              onOpenPopup={() => setIsPopupOpen(true)}
              onSelectDay={handleSelectDay}
              onEventClick={handleEventClick}
            />
          }
        />
        <Route
          path="/dia/:month/:day"
          element={
            <DayPage months={months} onDeleteEvent={deleteEvent} />
          }
        />
      </Routes>

      <AddEventPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onAddEvent={addEvent}
      />
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}