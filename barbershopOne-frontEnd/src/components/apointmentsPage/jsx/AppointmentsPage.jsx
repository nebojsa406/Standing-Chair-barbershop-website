import "../css/AppointmentsPage.css"
import { useState, useEffect } from "react";
import { getTimes, postAppointment } from "../../../api/appointments";
import { toast } from "react-toastify";

export function AppointmentsPage() {
    const notify = (msg, options) => toast(msg, options);
    const dateToday = new Date().toISOString().split("T")[0];
    const [takenTimes, setTakenTimes] = useState();

    //appointment data
    const [selectedService, setSelectedService] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [details, setDetails] = useState("");


    const services = [
        { name: "Signature Haircut", price: "7€" },
        { name: "Skin Fade", price: "10€" },
        { name: "Beard Sculpt & Line-up", price: "7€" },
        { name: "Kids Cut", price: "6€"},
        { name: "Beard Sculpt & Line-up", price: "15€"},
        { name: "Hot Towel Shave", price: "10€" },
        { name: "Beard Trim Only", price: "7€" }
    ];
    
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
                    for (let i = 0; i < data.takenTimes.length; i ++) {
                        for (let j = 0; j < timeSlots.length; j ++) {
                            if (data.takenTimes[i].time === timeSlots[j].time) {
                                timeSlots[j].available = false;
                                setTimeSlots([...timeSlots]);
                            }
                        }
                    }
                }
            } catch (err) {
                console.log(err);
                notify("Failed to load taken times,try again later", {className: "errorToast", progressClassName: "errorProgress" });
            }
        })();
    }, []);


    async function handleConfirmAppointment() {
        const appointmentFields = [
            selectedService,
            selectedDate,
            selectedTime,
            fullname,
            phone,
        ];

        for (let i = 0; i < appointmentFields.length; i ++) {
            if (!appointmentFields[i] || appointmentFields[i].trim() === "") {
                notify("ERROR: one or more of required fields is empty", {className: "errorToast", progressClassName: "errorProgress" } );
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
            notify(`ERROR: ${res.data.message}`, {className: "errorToast", progressClassName: "errorProgress" } );
            throw new Error(`ERROR: ${res.data.message}`);
        }

        notify("SUCCESS", {className: "successToast", progressClassName: "successProgress" } );
        console.log("reservation: ", res.data);
    }

    return (
        <div className="appointments-page">
            <section className="appointments-page-booking-section">
                <div className="appoint-page-title-wrapper">
                    <p className="appoint-page-eyebrow">BOOK APPOINTMENTS</p>
                    <h2>Claim your chair.</h2>
                </div>

                <div className="appoint-page-select-service-div">
                    <p className="appoint-page-eyebrow">CHOOSE A SERVICE</p>
                    <div className="service-buttons-grid">
                        {services.map((service, index) => (
                            <button
                                key={index}
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
                    <input type="date" min={dateToday} onChange={(e) => setSelectedDate(e.target.value)} className="appoint-page-date-input" />
                </div>

                <div className="appoint-page-time-input-div">
                    <p className="appoint-page-eyebrow">CHOOSE A TIME</p>
                    <div className="time-buttons-grid">
                        {timeSlots.map((slot, index) => (
                            <button
                                key={index}
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
                            <input type="text" onChange={(e) => {setFullname(e.target.value)}} placeholder="Full Name" />
                            <input type="tel" onChange={(e) => {setPhone(e.target.value)}} placeholder="Phone Number" />
                        </div>
                        <input className="appoint-page-email-input" onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Email Address (Optional)" />
                        <textarea className="appoint-page-message-input" onChange={(e) => {setDetails(e.target.value)}} placeholder="Anything we should know? (Optional)"></textarea>
                    </div>
                </div>

                <button onClick={handleConfirmAppointment} className="appoint-page-submit-btn">CONFIRM APPOINTMENT</button>
            </section>
        </div>
    );
}