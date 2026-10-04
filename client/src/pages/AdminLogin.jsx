import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

export const AdminLogin = () => {
  const [admin, setAdmin] = useState({ username: "", password: "" });
  const { API } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/admin-panel/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admin),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Admin login successful");
        window.location.href = "/admin";
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="section-registration">
      <div className="container">
        <div className="registration-form">
          <h1 className="main-heading">Admin Login</h1>
          <form onSubmit={handleSubmit}>
            <label>username</label>
            <input
              value={admin.username}
              onChange={(e) => setAdmin({ ...admin, username: e.target.value })}
              required
            />
            <label>password</label>
            <input
              type="password"
              value={admin.password}
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
};