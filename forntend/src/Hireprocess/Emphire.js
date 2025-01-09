import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./hire.css";

function Emphire() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, [auth.user, navigate]);

  useEffect(() => {
    if (!auth.user) return;

    const fetchEmployee = async () => {
      try {
        const response = await fetch(
          `https://servease-backend.onrender.com/emp/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const employ = await response.json();
        const data = employ.employees[0];

        if (!data) {
          throw new Error("Employee data not found");
        }

        setEmployee(data);
        setLoading(false);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, auth.user]);

  if (loading) {
    return (
      <div className="employee-card">
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!employee) {
    return <div>No employee data found.</div>;
  }


  const hireNow = () =>{
    toast("Hired" , employee.Name)
    navigate("/sucessfully");
  }

  return (
    <>
      <div className="dashboard">
        <div className="hire-page">
          <h1>Hire Now</h1>
          <div className="employee-card">
            <h2>{employee.Name}</h2>
            <div className="details">
              <p>
                <strong>Experience:</strong> {employee.Experience} years
              </p>
              <p>
                <strong>Rating:</strong> {employee.Rating}
              </p>
              <p>
                <strong>Services:</strong> {employee.Server}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {employee.Description || "No description available."}
              </p>
            </div>
            <button
              className="hire-button"
              onClick={() => hireNow()}
            >
              <ToastContainer />
              Hire Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Emphire;



{/* <h1>Employee Dashboard</h1>
<div className="employee-details">
    <h2>{employee.Name}</h2>
    <ul>
        <li><strong>Aadhar:</strong> {employee.Aadhar}</li>
        <li><strong>Age:</strong> {employee.Age}</li>
        <li><strong>Experience:</strong> {employee.Experience} years</li>
        <li><strong>Gmail:</strong> {employee.Gmail}</li>
        <li><strong>Password:</strong> {employee.Password}</li>
        <li><strong>Rating:</strong> {employee.Rating}</li>
        <li><strong>Server:</strong> {employee.Server}</li>
        <li><strong>Date:</strong> {new Date(employee.date).toLocaleDateString()}</li>
        <li><strong>Phone:</strong> {employee.phone}</li>
        <li><strong>Pin Code:</strong> {employee.pinCode}</li>
        <li><strong>ID:</strong> {employee._id}</li>
    </ul>
</div> */}
