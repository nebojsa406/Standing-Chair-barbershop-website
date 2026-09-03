import "../css/AppointmentsPage.css"
import { useState, useEffect } from "react";
import { getTimes, postAppointment } from "../../../api/appointments";
import { toast } from "react-toastify";
import { getServices } from "../../../api/services.js"

export function AppointmentsPage() {
    const notify = (msg, options) => toast(msg, options);

    const dateToday = new Date().toISOString().split("T")[0];

    const now = new Date();
    let nowTime = now.toLocaleTimeString('sr-ME', { hour: '2-digit', minute: '2-digit' });
    nowTime = nowTime.replace(":", "");
    nowTime = parseInt(nowTime);

    const [takenTimes, setTakenTimes] = useState();
    const [services, setServices] = useState([]);

    //appointment data
    const [selectedService, setSelectedService] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [details, setDetails] = useState("");


    const [timeSlots, setTimeSlots] = useState([
        { time: "10:00", available: true },
        { time: "10:30", available: true },
        { time: "11:00", available: true },
        { time: "11:30", available: true },
        { time: "12:00", available: true },
        { time: "12:30", available: true },
        { time: "13:00", available: true },
        { time: "13:30", available: true },
        { time: "14:00", available: true },
        { time: "14:30", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true },
        { time: "16:30", available: true },
        { time: "17:00", available: true },
        { time: "17:30", available: true },
        { time: "18:00", available: true },
        { time: "18:30", available: true },
        { time: "19:00", available: true },
        { time: "19:30", available: true },
    ]);

    useEffect(() => {
        (async () => {
            try {
                const data = await getTimes();
                if (data && data.takenTimes) {
                    setTakenTimes(data.takenTimes);
                    for (let i = 0; i < data.takenTimes.length; i++) {
                        for (let j = 0; j < timeSlots.length; j++) {
                            if (data.takenTimes[i].time === timeSlots[j].time) {
                                timeSlots[j].available = false;
                                setTimeSlots([...timeSlots]);
                            }
                        }
                    }
                }
                for (let i = 0; i < timeSlots.length; i++) {
                    let timeSlot = timeSlots[i].time.replace(":", "");
                    timeSlot = parseInt(timeSlot);
                    if (timeSlot < nowTime) {
                        timeSlots[i].available = false;
                        setTimeSlots([...timeSlots]);
                    }
                }
                const serviceData = await getServices();
                setServices(serviceData.services);

            } catch (err) {
                console.log(err);
                notify("Failed to load taken times,try again later", { className: "errorToast", progressClassName: "errorProgress" });
            }
        })();
    }, []);


    async function handleConfirmAppointment(event) {
        event.preventDefault();

        const appointmentFields = [
            selectedService,
            selectedDate,
            selectedTime,
            fullname,
            phone,
        ];

        for (let i = 0; i < appointmentFields.length; i++) {
            if (!appointmentFields[i] || appointmentFields[i].trim() === "") {
                notify("ERROR: one or more of required fields is empty", { className: "errorToast", progressClassName: "errorProgress" });
                throw new Error("1 or more of required fields is empty");
            }
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

        const res = await postAppointment(appointmentBody);

        if (res.status > 300) {
            notify(`ERROR: ${res.body.message}`, { className: "errorToast", progressClassName: "errorProgress" });
            throw new Error(`ERROR: ${res.body.message}`);
        }

        notify("SUCCESS", { className: "successToast", progressClassName: "successProgress" });
        console.log("reservation: ", res.body);
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
                        <input type="date" min={dateToday} onChange={(e) => setSelectedDate(e.target.value)} className="appoint-page-date-input" required />
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

                    <button type="submit" className="appoint-page-submit-btn">CONFIRM APPOINTMENT</button>
                </form>
            </section>
        </div>
    );
}