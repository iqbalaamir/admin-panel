import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

function Table() {
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        mobile: "",
        Bio: ""
    });

    useEffect(() => {
        axios.get("https://63f195065b7cf4107e336af9.mockapi.io/users").then(response => {
            setData(response.data);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.id) {
            axios.put(`https://63f195065b7cf4107e336af9.mockapi.io/users/${formData.id}`, formData).then(response => {
                setData(data.map(item => item.id === formData.id ? formData : item));
                setFormData({
                    id: "",
                    name: "",
                    email: "",
                    mobile: "",
                    Bio: ""
                });
            });
        } else {
            axios.post("https://63f195065b7cf4107e336af9.mockapi.io/users", formData).then(response => {
                setData([...data, response.data]);
                setFormData({
                    id: "",
                    name: "",
                    email: "",
                    mobile: "",
                    Bio: ""
                });
            });
        }
    };
    const handleFormChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleEditClick = (item) => {
        setFormData(item);
        setShowForm(true);
    };

    const handleDeleteClick = (item) => {
        axios.delete(`https://63f195065b7cf4107e336af9.mockapi.io/users/${item.id}`).then(response => {
            setData(data.filter(i => i.id !== item.id));
        });
    };
    return (
        <div className="container">
          <button className="btn btn-success mt-2" onClick={() => setShowForm(!showForm)}>Add new item</button>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleFormChange} />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleFormChange} />
                    </div>
                    <div className="form-group">
                        <label>mobile:</label>
                        <input type="tel" className="form-control" name="mobile" value={formData.mobile} onChange={handleFormChange} />
                    </div>
                    <div className="form-group">
                        <label>Bio:</label>
                        <textarea className="form-control" name="Bio" value={formData.Bio} onChange={handleFormChange}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">{formData.id ? "Update" : "Submit"}</button>
                </form>
            )}
            <h1>Table</h1>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>mobile</th>
                        <th>Bio</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.mobile}</td>
                            <td>{item.Bio}</td>
                            <td>
                                <button className="btn btn-primary mr-2" onClick={() => handleEditClick(item)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteClick(item)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          
      </div>

    )
}

export default Table