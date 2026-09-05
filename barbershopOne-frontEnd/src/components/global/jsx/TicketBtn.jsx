import "../css/TicketBtn.css";
import { Link } from 'react-router-dom'

export function TicketBtn({ text, href, openInNewTab = false }) {
    if (href) {
        return (
            <Link
                className="ticket-button"
                target={openInNewTab ? "_blank" : undefined}
                rel="noopener noreferrer"
                to={href}
            >
                {text}
            </Link>
        );
    }
    return (
        
        <button className="ticket-button">{text}</button>
    );
}