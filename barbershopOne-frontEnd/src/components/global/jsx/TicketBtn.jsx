import "../css/TicketBtn.css";
import { Link } from 'react-router-dom'

export function TicketBtn({ text, href }) {
    if (href) {
        return (
            <Link className="ticket-button" to={href}>
                {text}
            </Link>
        );
    }
    return (
        
        <button className="ticket-button">{text}</button>
    );
}