import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';


const URL = "http://localhost:5000/api/auth/login";


export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handling the form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(user),
      });


      console.log("login form", response);
      const res_data = await response.json();
      if (response.ok) {
        // alert("Login Successful");
         storeTokenInLS(res_data.token)
         


         setUser({ email: "", password: "" });
         toast.success("Login Successful");
         navigate("/");
         } else {
          toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
          console.log("Login error:", res_data);
        }
      
    } catch (error) {
      console.log(error);
    }

  
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">

              <div className="reg-image">
                <img
                  src="/images/login.png"
                  alt="login"
                  width="500"
                  height="500"
                />
              </div>

              <div className="registration-form">
                <h1 className="main-heading mb-3">Login Form</h1>

                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email</label>

                    <input
                      type="text"
                      name="email"
                      placeholder="Enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>

                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <br />

                  <button type="submit" className="btn btn-submit">
                    Login
                  </button>
                </form>
              </div>

            </div>
          </div>
        </main>
      </section>
    </>
  );
};