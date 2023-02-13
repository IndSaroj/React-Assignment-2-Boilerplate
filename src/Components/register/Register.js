import { useFormik } from 'formik'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import * as yup from 'yup'
// import axios from 'axios';

export default function Register() {

    const [err,setErr] = useState('');
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name:'',
            username:'',
            password:'',
            
        },
        onSubmit:values => {
            fetch('http://localhost:3001/auth', { method : "POST", headers: {"content-type" : "application/json"},
            body:JSON.stringify(values)})
                .then(res => {
                    alert('User successfully registered');
                    navigate('/login')
                })
                .catch(error => setErr(error.message));

        },
        validationSchema: yup.object().shape({
            name: yup.string().required('Name cannot be left blank'),
            username: yup.string().email('Enter the valid Email Id').required('The field cannot be left empty'),
            password: yup.string().min(6,'Password should be minimum 6 character').required('Password cannot be left blank'),
            
        })

    })

  return (
    <div className='row'>
    <div className="col-md-4 offset-md-4">
        <div className="bg-dark text-light mt-2 mb-2 py-2 rounded text-center">
            <h2>Register</h2>
        </div>
        {
            err!==''?<span className="text-center alert alert-danger">{err}</span>:<span></span>
        }
        <form onSubmit={formik.handleSubmit}>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} id='username' name='username' className='form-control form-control-sm' type="text" placeholder='Enter a Valid email id' />
            {
                formik.errors.username && formik.touched.username?<span className='text-danger'>{formik.errors.username}</span>:null
            }
            
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} id='password' name='password' className='form-control form-control-sm' type="text" placeholder='Enter password' />
            {
                formik.errors.password && formik.touched.password?<span className='text-danger'>{formik.errors.password}</span>:null
            }
            
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} id='name' name='name' className='form-control form-control-sm' type="text" placeholder='Enter your Name' />
            {
                formik.errors.name && formik.touched.name?<span className='text-danger'>{formik.errors.name}</span>:null
            }
            
            <div className="mt-2 text-center">
                <input className='btn btn-success' type="submit" value="Register" />
            </div>
            
        </form>
    </div>
    
   
</div>

  )
}
