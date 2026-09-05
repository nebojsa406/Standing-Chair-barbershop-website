import { Link } from "react-router-dom";

export function NotFoundPage() {
    return (
        <main className="not-found-page">
            <p className="not-found-label">404</p>
            <h1>That chair is not here.</h1>
            <p>The page you requested could not be found.</p>
            <Link to="/" className="not-found-link">Back to home</Link>
        </main>
    );
}
