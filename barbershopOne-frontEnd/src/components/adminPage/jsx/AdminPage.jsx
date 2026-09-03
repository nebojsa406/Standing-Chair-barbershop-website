import { useState } from "react"
import "../css/AdminPage.css"
import { login } from "../../../api/admin";
import { logout } from "../../../api/admin";
import { toast } from "react-toastify";

export function AdminPage({user}) {
    const notify = (msg, options) => toast(msg, options);

    let email = undefined;
    function setEmail(value) { email = value }
    let password = undefined;
    function setPassword(value) { password = value }
    const [newUser, setNewUser] = useState();
    const displayedUser = newUser === undefined ? user : newUser;

    function LoginForm() {
        const [isSubmitted, setIsSubmitted] = useState(false)

        async function handleSubmit(event) {
            event.preventDefault()
            setIsSubmitted(true)
            const loginData = await login({ email, password });
            setNewUser(loginData.body.user);

        }

        return <section className="login" aria-labelledby="admin-login-title">
            <p className="login-kicker">Staff access</p>
            <h1 id="admin-login-title">Welcome back</h1>
            <p className="login-description">Sign in to manage appointments and shop services.</p>

            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="admin-email">Email address</label>
                <input
                    id="admin-email"
                    name="email"
                    type="email"
                    placeholder="admin1876@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="admin-password">Password</label>
                <input
                    id="admin-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Sign in</button>
                {isSubmitted && <p className="login-status" role="status">Credentials ready to verify.</p>}
            </form>
        </section>
    }

    function UserInfoLogout({ userInfo, onLogout }) {
        const displayName = userInfo.username || "Staff";
        const displayEmail = userInfo.email || "no email";
        const displayRole = userInfo.role || "user";

        return (
            <section className="user-info-logout" aria-labelledby="admin-user-card-title">
                <div className="user-info-card">
                    <h2 id="admin-user-card-title">Welcome {displayName}</h2>

                    <div className="user-info-list">
                        <div className="user-info-item">
                            <span className="user-info-label">EMAIL</span>
                            <span className="user-info-value">{displayEmail}</span>
                        </div>
                        <div className="user-info-item">
                            <span className="user-info-label">ROLE</span>
                            <span className="user-info-value">{displayRole}</span>
                        </div>
                    </div>

                    <button type="button" className="logout-button" onClick={onLogout}>
                        Log out
                    </button>
                </div>
            </section>
        );
    }


    const handleLogout = async() => {
        try {
            setNewUser(null);
            setEmail("");
            setPassword("");
            const logoutData = await logout()
            notify("SUCCESS: logout", { className: "successToast", progressClassName: "successProgress" });
            console.log(logoutData)
        } catch (error) {
            throw new Error(`ERROR: failed to logout properly`);
        }
    };

    return (
        <div className="admin-page">

            {!displayedUser ?
                <LoginForm />
                :
                <UserInfoLogout userInfo={displayedUser} onLogout={handleLogout} />
            }
        </div>
    )
}

