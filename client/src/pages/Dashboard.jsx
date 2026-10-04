import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

export const AdminHome = () => {
  const { user } = useAuth();

  return (
    <>
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          <div className="hero-content">
            <p>Welcome{user ? ` ${user.username}` : ""}, to the</p>
            <h1>Admin Panel</h1>
            <p>
              Manage everything on your website from one place. View your
              users, read contact messages and keep your services up to date.
            </p>
          </div>

          <div className="hero-image">
            <img
              src="/images/webdev.png"
              alt="admin panel"
              width="400"
              height="500"
            />
          </div>
        </div>
      </section>

      <section className="container admin-cards">
        <NavLink to="/admin/users" className="admin-card">
          <h2>Users</h2>
          <p>View all registered users, edit their details or delete them.</p>
        </NavLink>

        <NavLink to="/admin/contacts" className="admin-card">
          <h2>Contacts</h2>
          <p>Read the messages sent from the contact form and delete old ones.</p>
        </NavLink>

        <NavLink to="/admin/services" className="admin-card">
          <h2>Services</h2>
          <p>See the services currently shown on your website.</p>
        </NavLink>
      </section>
    </>
  );
};