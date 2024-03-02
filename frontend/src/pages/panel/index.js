import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/auth"
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/app";

const Index = () => {
    const { isAuth, username } = useAuth();
    const { loading } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading && !isAuth) {
            navigate('/');
        }
    }, loading);


    return <div className="d-flex">
        <div
            className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark border-end border-secondary"
            style={{ width: 280 }}
        >
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink to="/panel" className={({ isActive }) => isActive ? "nav-link text-white active" : "nav-link text-white"} end>
                        Головна
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/panel/briefs" className={({ isActive }) => isActive ? "nav-link text-white active" : "nav-link text-white"}>
                        Брифи
                    </NavLink>
                </li>
            </ul>
            <hr />
            <div className="dropdown">
                <div
                    className="d-flex align-items-center text-white text-decoration-none"
                    id="dropdownUser1"
                    aria-expanded="false"
                >
                    <img
                        src="https://github.com/mdo.png"
                        alt=""
                        width={32}
                        height={32}
                        className="rounded-circle me-2"
                    />
                    <strong>{username}</strong>
                </div>
            </div>
        </div>
        <Outlet />
    </div>
}

export default Index;