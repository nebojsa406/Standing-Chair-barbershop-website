import "../css/AppointmentsPage.css"
import { useState, useEffect } from "react";
import { getTimes, postAppointment } from "../../../api/appointments";
import { toast } from "react-toastify";
import { getServices } from "../../../api/services.js"

const TIME_SLOTS = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
    "19:00", "19:30",
];

function getLocalDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getTimeInMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

export function AppointmentsPage() {
    const dateToday = getLocalDateString();
    const currentTimeInMinutes = getTimeInMinutes(
        `${String(new Date().getHours()).padStart(2, "0")}:${String(new Date().getMinutes()).padStart(2, "0")}`
    );

    const [takenTimes, setTakenTimes] = useState([]);
    const [services, setServices] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    //appointment data
    const [selectedService, setSelectedService] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [details, setDetails] = useState("");


    useEffect(() => {
        (async () => {
            try {
                const data = await getTimes();
                setTakenTimes(data?.takenTimes ?? []);
                const serviceData = await getServices();
                setServices(serviceData.services);

            } catch (err) {
                console.log(err);
                toast("Failed to load booking information, try again later", { className: "errorToast", progressClassName: "errorProgress" });
            }
        })();
    }, []);

    const timeSlots = TIME_SLOTS.map((time) => {
        const isTaken = takenTimes.some((appointment) =>
            appointment.date === selectedDate && appointment.time === time
        );
        const isPast = selectedDate === dateToday && getTimeInMinutes(time) < currentTimeInMinutes;

        return { time, available: !isTaken && !isPast };
    });


    async function handleConfirmAppointment(event) {
        event.preventDefault();

        if (isSubmitting) return;

        const appointmentFields = [
            selectedService,
            selectedDate,
            selectedTime,
            fullname,
            phone,
        ];

        if (appointmentFields.some((field) => !field || field.trim() === "")) {
            toast("ERROR: one or more required fields is empty", { className: "errorToast", progressClassName: "errorProgress" });
            return;
        }

        const appointmentBody = {
            fullname: fullname,
            phone: phone,
            email: email,
            service: selectedService,
            time: selectedTime,
            date: selectedDate,
            details: details
        }

        setIsSubmitting(true);
        try {
            const res = await postAppointment(appointmentBody);

            if (res.status >= 300) {
                throw new Error(res.body?.message || "Could not create appointment");
            }

            toast("SUCCESS: appointment booked", { className: "successToast", progressClassName: "successProgress" });
            event.currentTarget.reset();
            setSelectedService("");
            setSelectedDate("");
            setSelectedTime("");
            setFullname("");
            setPhone("");
            setEmail("");
            setDetails("");
        } catch (error) {
            toast(`ERROR: ${error.message}`, { className: "errorToast", progressClassName: "errorProgress" });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="appointments-page">
            <section className="appointments-page-booking-section">
                <div className="appoint-page-title-wrapper">
                    <p className="appoint-page-eyebrow">BOOK APPOINTMENTS</p>
                    <h2>Claim your chair.</h2>
                </div>

                <form onSubmit={handleConfirmAppointment}>
                    <div className="appoint-page-select-service-div">
                        <p className="appoint-page-eyebrow">CHOOSE A SERVICE</p>
                        <div className="service-buttons-grid">
                            {services.map((service, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={selectedService === service.name ? "service-btn-selected" : "service-btn"}
                                    onClick={() => setSelectedService(service.name)}
                                >
                                    {service.name} <span className="service-price">{service.price}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="appoint-page-date-input-div">
                        <p className="appoint-page-eyebrow">CHOOSE A DATE</p>
                        <input
                            type="date"
                            min={dateToday}
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setSelectedTime("");
                            }}
                            className="appoint-page-date-input"
                            required
                        />
                    </div>

                    <div className="appoint-page-time-input-div">
                        <p className="appoint-page-eyebrow">CHOOSE A TIME</p>
                        <div className="time-buttons-grid">
                            {timeSlots.map((slot, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`time-btn ${!slot.available ? "time-btn-unavailable" : ""} ${selectedTime === slot.time ? "time-btn-selected" : ""}`}
                                    onClick={() => slot.available && setSelectedTime(slot.time)}
                                    disabled={!slot.available}
                                >
                                    {slot.time}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="appoint-page-details-input-div">
                        <p className="appoint-page-eyebrow">YOUR DETAILS</p>

                        <div className="appoint-page-details-input-div-inner">
                            <div className="appoint-page-name-phone-wrapper">
                                <input type="text" onChange={(e) => { setFullname(e.target.value) }} placeholder="Full Name" required />
                                <input type="tel" onChange={(e) => { setPhone(e.target.value) }} placeholder="Phone Number" required />
                            </div>
                            <input className="appoint-page-email-input" onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Email Address (Optional)" />
                            <textarea className="appoint-page-message-input" onChange={(e) => { setDetails(e.target.value) }} placeholder="Anything we should know? (Optional)"></textarea>
                        </div>
                    </div>

                    <button type="submit" className="appoint-page-submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? "SUBMITTING..." : "CONFIRM APPOINTMENT"}
                    </button>
                </form>
            </section>
        </div>
    );
}