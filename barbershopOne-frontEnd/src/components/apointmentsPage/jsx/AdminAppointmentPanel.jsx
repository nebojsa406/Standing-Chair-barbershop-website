export function AdminAppointmentPanel({
    appointmentsAdmin = [],
    handleAdminSearch,
    apcDate = "",
    setApcDate,
    setAdminSelectedCard,
    adminSelectedCard = "",
    dateComparison,
    dateToday,
}) {
    return (
        <aside className="admin-panel" aria-label="Admin panel">
            <h2>admin panel</h2>
            <p>manage appointments</p>
            <div className="admin-panel-content">
                <div className="apc-buttons-div">
                    <button onClick={handleAdminSearch} className="search-appointment-btn">Search</button>
                    <input
                        type="date"
                        className="appoint-page-date-input"
                        defaultValue={apcDate !== "" && apcDate}
                        onChange={(event) => setApcDate(event.target.value)}
                    />
                    <button className="search-appointment-btn">Delete</button>
                    <button className="search-appointment-btn">Mark as Done</button>
                </div>
                <div className={`apc-appointments ${appointmentsAdmin.length > 12 ? "has-scroll" : ""} ${appointmentsAdmin.length > 4 ? "has-mobile-scroll" : ""}`}>

                    {appointmentsAdmin.length !== 0 ?
                        appointmentsAdmin.map((item) => {
                            return (
                                <div
                                    onClick={() => setAdminSelectedCard(item._id)}
                                    className={`appointment-results-card ${adminSelectedCard === item._id ? "admin-selected-card" : ""}
                                    ${item.done === true || !dateComparison(item.date, dateToday) ? "appointment-done" : ""}`}
                                    key={item._id}
                                >
                                    <p>{item.fullname}</p>
                                    <p>{item.date.slice(0, 10)}</p>
                                    <p>{item.time}</p>
                                    <p>{item.phone}</p>
                                </div>
                            )
                        })
                        : <>no appointments found</>
                    }
                </div>
            </div>
        </aside>
    )
}