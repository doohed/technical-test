import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const EditContactPage = lazy(() => import("./pages/EditContactPage.jsx"));
const CreateContactPage = lazy(() => import("./pages/CreateContactPage.jsx"));

function App() {
  const loggedIn = window.localStorage.getItem("isLoggedIn");

  return (
    <Router>
      {loggedIn && <Navbar />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={loggedIn ? <HomePage /> : <LoginPage />} />
          <Route path="/contact/edit/:id" element={<ProtectedRoute element={<EditContactPage />} />} />
          <Route path="/contact/create" element={<ProtectedRoute element={<CreateContactPage />} />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

