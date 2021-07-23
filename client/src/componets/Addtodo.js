import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { addDataTODatabase } from '../action';

export default function ContactUs() {

    // state
    const [Data, setData] = useState({
        title: "",
        description: "",
        status: ""
    });
    const [Image, setImage] = useState()

    // getting data
    const onInputChange = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value })
    }

    const handelImage = (e) => {
        setImage(e.target.files[0]);
    }

  


    /// add data
    const onSubmit = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append('title', Data.title);
        formData.append('description',Data.description);
        formData.append('media',Image);
        formData.append('status', Data.status);
        addDataTODatabase(formData);
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mt-5 mb-5">Add todo</h2>
            <ToastContainer />
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="col-md-6">
                            <label className="form-label">Enter title</label>
                            <input type="text" onChange={onInputChange} placeholder="Enter title" className="form-control" name="title" id="title" required />

                        </div>
                        <div className="col-md-6 mt-3">
                            <div className="mb-3">
                                <label className="form-label">Enter description</label>
                                <input type="textarea" onChange={onInputChange} placeholder="Enter description" className="form-control" name="description" required />
                            </div>
                        </div>

                        <div className="col-md-6 mt-2">
                            <div className="mb-3">
                                <label className="form-label">Upload images</label>
                                <input type="file" onChange={handelImage} placeholder="Enter address.." className="form-control" name="address" />
                            </div>
                        </div>

                        <div className="col-md-6 mt-2">

                            <select className="form-select" defaultValue="" onChange={onInputChange} name="status" required>
                                <option value="" selected disabled>Select Status</option>
                                <option value="open">open</option>
                                <option value="progress">progress</option>
                                <option value="completed">completed</option>
                            </select>
                        </div>
                        <button style={{ width: "55%", margin: 'auto' }} type="submit" className="btn btn-primary mt-5 mb-3">Addtodo</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
