import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import TokenContext from "../../context/TokenContext";
import "./Header.css";

function Header() {
  const { userToken, tokenDispatch, userDispatch, user } = useContext(TokenContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    tokenDispatch({ type: "UNSET_TOKEN" });
    userDispatch({ type: "UNSET_USER" });
    navigate("/login");
  };

  return (
    <>
      <header className="header">
        <div className="header__left">
          <h1 className="logo">Todo App</h1>
        </div>
        <nav className="header__right">
          {userToken ? (
            <>
              <span className="welcome">Xin chào, {user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="header__link">Đăng nhập</NavLink>
              <NavLink to="/register" className="header__link">Đăng ký</NavLink>
            </>
          )}
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>
    </>
  );
}

export default Header;
