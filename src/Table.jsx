import React from 'react'
import { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faPencil, faTrash ,faUser);
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
        fetch("https://63f195065b7cf4107e336af9.mockapi.io/users")
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error(error));
      }, []);
      

      const handleSubmit = (event) => {
        event.preventDefault();
        const url = formData.id
          ? `https://63f195065b7cf4107e336af9.mockapi.io/users/${formData.id}`
          : "https://63f195065b7cf4107e336af9.mockapi.io/users";
        const method = formData.id ? "PUT" : "POST";
        const body = JSON.stringify(formData);
        const headers = { "Content-Type": "application/json" };
      
        fetch(url, { method, body, headers })
          .then(response => response.json())
          .then(result => {
            if (formData.id) {
              setData(data.map(item => item.id === formData.id ? formData : item));
            } else {
              setData([...data, result]);
            }
            setFormData({
              id: "",
              name: "",
              email: "",
              mobile: "",
              Bio: ""
            });
          })
          .catch(error => console.error(error));
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
        fetch(`https://63f195065b7cf4107e336af9.mockapi.io/users/${item.id}`, { method: "DELETE" })
          .then(() => setData(data.filter(i => i.id !== item.id)))
          .catch(error => console.error(error));
      };
      
    return (
        <div className="container">
          <button className="btn btn-success mt-2" onClick={() => setShowForm(!showForm)}> <FontAwesomeIcon icon='user'/> Add Profile</button>
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
                        <label>Mobile:</label>
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
                        <th>Mobile</th>
                        <th>Bio</th>
                        <th style={{ width: '130px' }}>Actions</th>
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
                                <button className="btn btn-warning mr-2" onClick={() => handleEditClick(item)}><FontAwesomeIcon icon="pencil" /></button>
                                <button className="btn btn-danger" onClick={() => handleDeleteClick(item)}><FontAwesomeIcon icon="trash" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          
      </div>

    )
}

export default Table