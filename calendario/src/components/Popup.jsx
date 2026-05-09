import React from 'react'
import {useState, useEffect} from 'react'

const months = [
    { month: 1, name: "Enero", days: 31 },
    { month: 2, name: "Febrero", days: 29 },
    { month: 3, name: "Marzo", days: 31 },
    { month: 4, name: "Abril", days: 30 },
    { month: 5, name: "Mayo", days: 31 },
    { month: 6, name: "Junio", days: 30 },
    { month: 7, name: "Julio", days: 31 },
    { month: 8, name: "Agosto", days: 31 },
    { month: 9, name: "Septiembre", days: 30 },
    { month: 10, name: "Octubre", days: 31 },
    { month: 11, name: "Noviembre", days: 30 },
    { month: 12, name: "Diciembre", days: 31 },
];


function Popup  ({
    isOpen, 
    onClose, 
    onSubmit, 
    title = "Evento",
    defaultMonth = 1,
    defaultDay = 1,
    defaultTitle = "",
    defaultStart = "",
    defaultEnd = "",
}) {
    const [eventTitle, setEventTitle] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);
    const [startHour, setStartHour] = useState("");
    const [endHour, setEndHour] = useState("");

    useEffect(() => {
        if (isOpen) {
            setEventTitle(defaultTitle);
            setSelectedMonth(defaultMonth);
            setSelectedDay(defaultDay);
            setStartHour(defaultStart);
            setEndHour(defaultEnd);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const currentMonth = months.find((m)=> m.month === Number(selectedMonth));

    const handleSubmit = () => {
        onSubmit({
            month: selectedMonth,
            day: selectedDay,
            event: {
                title: eventTitle,
                startHour,
                endHour,
            },
        });
        onClose();
    };
    
    return (
        <div className='popup-container'>
            <div className='popup'>
                <h2>{title}</h2>

                <label>Título:</label>
                <input
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                />

                <label>Fecha:</label>
                <div className='date'>
                    <select
                        value={selectedMonth}
                        onChange={(e) => {
                            setSelectedMonth(Number(e.target.value));
                            setSelectedDay(1);
                        }}
                    >
                        {months.map((month) => (
                            <option key={month.month} value={month.month}>
                                {month.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(Number(e.target.value))}
                    >
                        {Array.from({ length: currentMonth.days }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <label>Hora inicio:</label>
                <input
                    type="text"
                    value={startHour}
                    onChange={(e) => setStartHour(e.target.value)}
                />

                <label>Hora final:</label>
                <input
                    type="text"
                    value={endHour}
                    onChange={(e) => setEndHour(e.target.value)}
                />

                <div className='botones'>
                    <button className="guardar" onClick={handleSubmit}>Guardar</button>
                    <button className="cancelar" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
  )
}

export default Popup