import React from 'react'
import Popup from "./Popup";

function EditEvent({ isOpen, onClose, onEditEvent, eventData }) {
  const handleSubmit = ({ month, day, event }) => {
    onEditEvent({ month, day, eventIndex: eventData?.eventIndex, event });
  };
 
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Editar evento"
      defaultMonth={eventData?.month}
      defaultDay={eventData?.day}
      defaultTitle={eventData?.title}
      defaultStart={eventData?.startHour}
      defaultEnd={eventData?.endHour}
    />
  );
}
 
export default EditEvent;
 