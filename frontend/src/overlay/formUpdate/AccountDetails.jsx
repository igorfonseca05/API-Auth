import React, { useState } from "react";
import "./AccountDetails.css";

const AccountDetails = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dob: { day: "", month: "", year: "" },
        gender: "",
        avatar: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            dob: { ...formData.dob, [name]: value },
        });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, avatar: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="account-container">
            <div className="sidebar">
                <div className="avatar-container">
                    <label htmlFor="avatar-upload" className="avatar-label">
                        <img
                            src={
                                formData.avatar
                                    ? URL.createObjectURL(formData.avatar)
                                    : "https://via.placeholder.com/150"
                            }
                            alt="Avatar"
                            className="avatar"
                        />
                        <div className="avatar-overlay">
                            <span className="material-symbols-outlined">upload</span>
                            upload
                        </div>
                    </label>
                    <input
                        type="file"
                        id="avatar-upload"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </div>
                <ul className="sidebar-menu">
                    <li className="menu-item active">Account Details</li>
                    <li className="menu-item">Shipping Address</li>
                    <li className="menu-item">Payment Methods</li>
                </ul>
            </div>

            <form className="form" onSubmit={handleSubmit}>
                <h2>Account Details</h2>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="user_email">E-mail</label>
                    <input
                        type="email"
                        id="user_email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@email.com"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="day">Date of Birth (Optional)</label>
                    <div className="dob-container">
                        <select
                            id="day"
                            name="day"
                            value={formData.dob.day}
                            onChange={handleDateChange}
                        >
                            <option value="">Day</option>
                            {[...Array(31)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        <select
                            name="month"
                            value={formData.dob.month}
                            onChange={handleDateChange}
                        >
                            <option value="">Month</option>
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(
                                (month, i) => (
                                    <option key={i + 1} value={month}>
                                        {month}
                                    </option>
                                )
                            )}
                        </select>
                        <select
                            name="year"
                            value={formData.dob.year}
                            onChange={handleDateChange}
                        >
                            <option value="">Year</option>
                            {[...Array(100)].map((_, i) => (
                                <option key={1924 + i} value={1924 + i}>
                                    {1924 + i}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender (Optional)</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button type="submit" className="btn-submit">
                    Update
                </button>
            </form>
        </div>
    );
};

export default AccountDetails;
