export function AppointmentSearch({ searchPhone, setSearchPhone, onClose, onSearch }) {
    return (
        <div className="appointment-search">
            <button
                type="button"
                aria-label="Close appointment search"
                className="close-appointment-search-btn"
                onClick={onClose}
            >
                <span className="appointment-search-icon">-</span>
            </button>
            <label htmlFor="appointment-phone-search">find your appointment</label>
            <input
                id="appointment-phone-search"
                type="tel"
                inputMode="numeric"
                placeholder="enter phone number"
                maxLength={9}
                value={searchPhone}
                onChange={(event) => setSearchPhone(event.target.value.replace(/\D/g, ""))}
            />
            <p className="appointment-search-format">
                069/067/068 XXX XXX format
            </p>
            <button onClick={onSearch} className="search-appointment-btn">Search</button>
        </div>
    );
}
