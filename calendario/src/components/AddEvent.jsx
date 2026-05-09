import { useState } from "react";
import Popup from "./Popup";

function AddEvent({ isOpen, onClose, onAddEvent }) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onAddEvent}
      title="Agregar Evento"
    />
  );
}

export default AddEvent;