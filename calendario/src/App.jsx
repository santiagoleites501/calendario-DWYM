import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import AddEventPopup from "./components/AddEvent";
import MonthView from "./components/MonthView";

function Home({ onOpenPopup }) {
  return (
    <div>
      <h1>Inicio</h1>

      <Link to="/mes">
        <button>Ir a vista mensual</button>
      </Link>
    </div>
  );
}

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  const handleAddEvent = (event) => {
    console.log("Evento enviado:", event);
    setIsPopupOpen(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home onOpenPopup={() => setIsPopupOpen(true)} />}
        />
        <Route
          path="/mes"
          element={<MonthView onAddEvent={() => setIsPopupOpen(true)} />}
        />
      </Routes>

      <AddEventPopup
        isOpen={isPopupOpen}
        onClose={handleClose}
        onAddEvent={handleAddEvent}
      />
    </Router>
  );
}

export default App;