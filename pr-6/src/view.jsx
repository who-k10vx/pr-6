import React, { useEffect, useState } from 'react'

function View() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [salary, setSalary] = useState("");
    const [record, setRecord] = useState([]);
    const id = Math.floor(Math.random() * 10000)
    const [editid, setEdit] = useState("")


    const HandleSubmit = (e) => {
        e.preventDefault();
        let obj = {
            id, name, email, password, city, salary
        }
        if (editid) {
            let all = [...record];
            let update = all.map((val) => {
                if (val.id == editid) {
                    return {
                        ...val,
                        name: name,
                        email: email,
                        password: password,
                        city: city,
                        salary: salary
                    }
                }
                return val;
            })
            localStorage.setItem('user', JSON.stringify(update))
            setRecord(update)
            alert("Successfully Updated")
            setEdit("");
        } else {
            let all = [...record, obj]
            setRecord(all);
            alert("User Insert")
            localStorage.setItem('user', JSON.stringify(all))
        }
        setName("");
        setEmail("");
        setPassword("");
        setCity("");
        setSalary("");
    }

    useEffect(() => {
        let all = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : []
        setRecord(all)
    }, [])

    const deleteData = (id) => {
        let all = [...record]
        let deleteRecord = all.filter((val) => {
            return val.id != id
        })
        setRecord(deleteRecord)
        localStorage.setItem('user', JSON.stringify(deleteRecord))
        alert("Record Successfully Deleted")
    }
    const EditData = (id) => {
        let AllRecord = [...record];
        let Single = AllRecord.find(val => val.id == id);
        setEdit(id)
        setName(Single.name)
        setEmail(Single.email)
        setPassword(Single.password)
        setCity(Single.city)
        setSalary(Single.salary)
    }

    return (
        <div>
            <div className="container-fluid">

                <form onSubmit={HandleSubmit} className="m-auto rounded p-5 mb-5 text-dark  flex items-center justify-center w-25 shadow-lg pt-" >
                    <center><h1 className='bg-black text-dark py-2 mb-5 '>Add Employee</h1></center>
                    <div className="mb-4">
                        <label htmlFor="name" className=" mb-2 me-3 d-block fs-6 text-uppercase">Name</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} className=" p-2 border-1 border-secondary border rounded w-100 py-6 px-3 " />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className=" mb-2 me-3 text-left d-block  fs-6 text-uppercase">Email || Username</label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className=" p-2 border-1 border-secondary border rounded w-100 py-6 px-3" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className=" mb-2 me-3 d-block fs-6 text-uppercase">Password</label>
                        <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} className=" p-2 border-1 border-secondary border rounded w-100 py-6 px-3" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className=" mb-2 me-3 d-block fs-6 text-uppercase">Phone Number  </label>
                        <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className=" p-2 border-1 border-secondary border rounded w-100 py-6 px-3" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className=" mb-2 me-3 d-block fs-6 text-uppercase">Salary</label>
                        <input type="text" onChange={(e) => setSalary(e.target.value)} value={salary} className=" p-2 border-1 border-secondary border rounded w-100 py-6 px-3" />
                    </div>
                    <div className="flex items-center justify-between">
                        {
                            editid ? (<input className='btn btn-primary ' type='submit' value="edit" />) :
                                (<input className='btn btn-primary' type='submit' />)
                        }
                    </div>
                </form>
                <center><h1 style={{ backgroundColor: '#E3E4FA', marginTop: "100px" }} className=' w-25 text-dark py-2'>Employee List</h1></center>
                <table className="mt-5 table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                            <th scope="col">City</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            record.map((val) => {
                                return (
                                    <tr key={val.id}>
                                        <td>{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>{val.email}</td>
                                        <td>{val.password}</td>
                                        <td>{val.city}</td>
                                        <td>{val.salary}</td>
                                        <td>
                                            <button onClick={() => deleteData(val.id)} className='bg-danger text-white border-0 me-2'>Delete</button>
                                            <button onClick={() => EditData(val.id)} className='bg-primary text-white border-0'>Edit</button>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>



            </div>

        </div>
    )
}

export default View