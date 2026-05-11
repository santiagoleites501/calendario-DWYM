// components/AddEvent.js
import Popup from "./Popup";

function AddEvent({ isOpen, onClose, onAddEvent }) {
  const handleSubmit = (data) => {
    onAddEvent({
      month: data.month,
      day: data.day,
      event: data.event
    });
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Agregar Evento"
    />
  );
}

export default AddEvent;