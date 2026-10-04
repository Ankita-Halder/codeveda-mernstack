import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Error } from "./pages/Error";
import { Footer } from "./components/Footer/Footer";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layouts/Admin-Layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUpdate } from "./pages/Admin-Update";
import { AdminRoute } from "./components/AdminRoute";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminHome } from "./pages/Dashboard";
import { AdminServices } from "./pages/Admin-Services";
import { AdminServiceDetails } from "./pages/ServiceDetails";


const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/service/:serviceName" element={<AdminServiceDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error/>}/>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<AdminHome />} />
        <Route path= "users" element={<AdminUsers/>}/>
        <Route path="users/:id/edit" element={<AdminUpdate />} />
        <Route path= "contacts" element={<AdminContacts/>}/>
        <Route path="services" element={<AdminServices />} />
        <Route path="services/:serviceName" element={<AdminServiceDetails />} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;