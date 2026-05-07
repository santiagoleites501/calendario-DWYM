import { useState } from "react";

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

function AddEventPopup({ isOpen, onClose }) {

    const [title, setTitle] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);
    const [startHour, setStartHour] = useState("");
    const [endHour, setEndHour] = useState("");

    if (!isOpen) return null;

    const currentMonth = months.find(
        (m) => m.month === Number(selectedMonth)
    );

    const handleSubmit = async () => {

        const newEvent = {
            title,
            startHour,
            endHour,
        };

        try {
            const response = await fetch("http://localhost:3000/months");

            if (!response.ok) {
                throw new Error("No se pudieron obtener los meses");
            }

            const data = await response.json();

            const monthData = data.find(
                (m) => m.month === Number(selectedMonth)
            );

            if (!monthData) {
                throw new Error("Mes no encontrado");
            }

            const dayData = monthData.days.find(
                (d) => d.day === Number(selectedDay)
            );

            if (!dayData) {
                throw new Error("Día no encontrado");
            }

            dayData.events.push(newEvent);

            const updateResponse = await fetch(
                `http://localhost:3000/months/${monthData.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(monthData),
                }
            );

            if (!updateResponse.ok) {
                throw new Error("No se pudo actualizar la base de datos");
            }

            console.log("Evento agregado correctamente");

            setTitle("");
            setSelectedMonth(1);
            setSelectedDay(1);
            setStartHour("");
            setEndHour("");

            onClose();

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup">

                <h2>Crear evento</h2>

                <label>Título:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Fecha:</label>
                <div className="date-row">
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
                        {Array.from(
                            { length: currentMonth.days },
                            (_, index) => index + 1
                        ).map((day) => (
                            <option key={day} value={day}>
                                {day}
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

                <div className="buttons">
                    <button className="save" onClick={handleSubmit}>
                        Guardar
                    </button>

                    <button className="cancel" onClick={onClose}>
                        Cancelar
                    </button>
                </div>

            </div>
        </div>
    );
}

export default AddEventPopup;