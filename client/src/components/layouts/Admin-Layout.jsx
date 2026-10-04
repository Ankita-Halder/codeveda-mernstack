import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { FaUser,FaComment,FaRegListAlt,FaHome } from "react-icons/fa";
import { useAuth } from "../../store/auth";


export const AdminLayout = () => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();
    console.log("admin layout", user);

      if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }



    return <>
    <header>
        <div className="container">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/admin/users">
                         <FaUser/> users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/contacts"> 
                         <FaComment/>contacts 
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/services">
                         <FaRegListAlt />services </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

        {!["/admin", "/admin/"].includes(window.location.pathname) && (
      <button
        onClick={() => navigate("/admin")}
        style={{
          position: "fixed",
          bottom: "3rem",
          right: "3rem",
          display: "flex",
          alignItems: "center",
          gap: "0.8rem",
          padding: "1.2rem 2.2rem",
          fontSize: "1.6rem",
          color: "#fff",
          backgroundColor: "#646cff",
          borderRadius: "5rem",
          zIndex: 1000,
        }}
      >
        <FaHome /> Admin Dashboard
      </button>
    )}
    <Outlet />
    </>
};