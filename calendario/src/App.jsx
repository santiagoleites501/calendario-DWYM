import { useState } from "react";
import AddEventPopup from "./components/AddEvent";

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
    <div>

      <button onClick={() => setIsPopupOpen(true)}>
        Agregar evento
      </button>

      <AddEventPopup
        isOpen={isPopupOpen}
        onClose={handleClose}
        onAddEvent={handleAddEvent}
      />

    </div>
  );
}

export default App;