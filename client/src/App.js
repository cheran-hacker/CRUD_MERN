import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const API ="http://localhost:4000";
export default function App() {
const[people,setPeople]=useState([]);
const[form,setForm]=useState({name:"",age:"",email:"",department:"",phone:"",city:"",street:"",year:""});
const[editingid,setEdit]=useState(null);
const[editForm,setEditForm]=useState({name:"",age:"",email:"",department:"",phone:"",city:"",street:"",year:""});

async function load(){
const res = await axios.get(`${API}/`);
setPeople(res.data);
}
useEffect(()=> {load();},[])

async function addperson(e) {
e.preventDefault();
if(!form.name || !form.age ||!form.email||!form.department||!form.phone||!form.city||!form.street||!form.year)
return alert("Enter Name,Age,email,department,phone,city,street and year");
const res=await axios.post(`${API}/`,{
name:form.name,
age:Number(form.age),
email:form.email,
department:form.department,
phone:Number(form.phone),
city:form.city,
street:form.street,
year:Number(form.year)
});
setPeople([...people,res.data]);
setForm({name:"",age:"",email:"",department:"",phone:"",city:"",street:"",year:""});
}

function startEdit(p){
setEdit(p._id);
setEditForm({name:p.name, age:Number(p.age),email:p.email,
department:p.department,
phone:Number(p.phone),
city:p.city,
street:p.street,
year:Number(p.year)});
}
function cancelEdit(){
  setEdit(null);
}
async function saveEdit(id) {
  if(!editForm.name||!editForm.age||!editForm.email||!editForm.department||!editForm.phone||!editForm.city||!editForm.street||!editForm.year)
    return alert("Enter Name,Age,email,department,phone,city,street");
  const res=await axios.put(`${API}/${id}`,{
    name:editForm.name,
    age:Number(editForm.age),
    email:editForm.email,
  department:editForm.department,
  phone:Number(editForm.phone),
  city:editForm.city,
  street:editForm.street,
  year:Number(editForm.year)

  });
  setPeople(people.map(p=>(p._id === id? res.data : p)))
  setEdit(null);
}
async function deleteId(id){
  if(!window.confirm("Are You want to delete")) return;
  await axios.delete(`${API}/${id}`);
    setPeople(people.filter(p=>p._id!==id));
    await load();
}


return (
<div className="container mt-5">

  <div className='row justify-content-center'>
    <div className='col-md-6'>
      <h1>BIT Students List</h1>
      <hr />
      <form onSubmit={addperson}>
        <input type='text' className='form-control mb-3' placeholder='Enter Name' value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}required/>
        <input type='number' className='form-control mb-3' placeholder='Enter Age' value={form.age}
          onChange={(e)=>setForm({...form,age:e.target.value})}required/>
        <input type='email' className='form-control mb-3' placeholder='Enter Email' value={form.email}
          onChange={(e)=>setForm({...form,email:e.target.value})}required/>
          <input type='text' className='form-control mb-3' placeholder='Enter Department' value={form.department}
          onChange={(e)=>setForm({...form,department:e.target.value})}required/>
          <input type='number' className='form-control mb-3' placeholder='Enter Phone' value={form.phone}
          onChange={(e)=>setForm({...form,phone:e.target.value})}required/>
          <input type='text' className='form-control mb-3' placeholder='Enter City' value={form.city}
          onChange={(e)=>setForm({...form,city:e.target.value})}required/>
          <input type='text' className='form-control mb-3' placeholder='Enter Street' value={form.street}
          onChange={(e)=>setForm({...form,street:e.target.value})}required/>
          <input type='number' className='form-control mb-3' placeholder='Enter Year' value={form.year}
          onChange={(e)=>setForm({...form,year:e.target.value})}required/>
        <button className='btn btn-primary w-100'>Create</button>
      </form>
    </div>
  </div>
  <div className='row mt-5'>
    <div className='col'>
      <h3 className='mb-3'>Students List</h3>
      {people.length ===0?(
      <p>No students found</p>
      ):(
      <table className='table table-bordered table-striped'>
        <thead className='table-dark'>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Department</th>
            <th>Phone</th>
            <th>City</th>
            <th>Street</th>
            <th>year</th>
            <th style={{width:"200px"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map(p=>(
          <tr key={p._id}>
            {editingid===p._id ?
            (
            <>
              <td>
                <input type='text' className='form-control' value={editForm.name}
                  onChange={(e)=>setEditForm({...editForm,name:e.target.value})}/>
              </td>
              <td>
                <input type='text' className='form-control' value={editForm.age}
                  onChange={(e)=>setEditForm({...editForm,age:e.target.value})}/>
              </td>
              <td>
                <input type='text' className='form-control' value={editForm.email}
                  onChange={(e)=>setEditForm({...editForm,email:e.target.value})}/>
              </td>
              <td>
                <input type='text' className='form-control' value={editForm.department}
                  onChange={(e)=>setEditForm({...editForm,department:e.target.value})}/>
              </td>
              <td>
                <input type='number' className='form-control' value={editForm.phone}
                  onChange={(e)=>setEditForm({...editForm,phone:e.target.value})}/>
              </td>
              <td>
                <input type='text' className='form-control' value={editForm.city}
                  onChange={(e)=>setEditForm({...editForm,city:e.target.value})}/>
              </td>
              <td>
                <input type='text' className='form-control' value={editForm.street}
                  onChange={(e)=>setEditForm({...editForm,street:e.target.value})}/>
              </td>
              <td>
                <input type='number' className='form-control' value={editForm.year}
                  onChange={(e)=>setEditForm({...editForm,year:e.target.value})}/>
              </td>
              <td>
                <button className='btn btn-success' onClick={()=>saveEdit(p._id)}>Save</button>
                <button className='btn btn-info' onClick={cancelEdit}>Cancel</button>
              </td>
            </>
            ):(
            <>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.email}</td>
              <td>{p.department}</td>
              <td>{p.phone}</td>
              <td>{p.city}</td>
              <td>{p.street}</td>
              <td>{p.year}</td>
              <td>
                <button className='btn btn-primary' onClick={()=>startEdit(p)}>Edit</button>
                <button className='btn btn-danger' onClick={()=>deleteId(p._id)}>Delete</button>
              </td>
            </>
            )
            }
          </tr>
        ))}
        </tbody>
      </table>

      )}

    </div>

  </div>
</div>
);
}