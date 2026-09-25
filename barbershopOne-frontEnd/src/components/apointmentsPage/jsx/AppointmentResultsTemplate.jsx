export function AppointmentResultsTemplate({ appointments, onClose, dateComparison, dateToday }) {
    return (
        <div className="appointment-results-template">
            <button
                type="button"
                className="close-appointments-btn"
                onClick={onClose}
            >
                Close
            </button>
            <div className={`appointment-results-template-inner ${appointments.length > 3 ? "has-scroll" : ""}`}>
                {appointments.length !== 0 && appointments.map((item) => (
                    <div
                        className={`appointment-results-card ${item.done === true || !dateComparison(item.date, dateToday) ? "appointment-done" : ""}`}
                        key={item._id}
                    >
                        <p>{item.fullname}</p>
                        <p>{item.date.slice(0, 10)}</p>
                        <p>{item.time}</p>
                        <p>{item.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
