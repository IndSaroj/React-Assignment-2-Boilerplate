import { useFormik } from 'formik'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import * as yup from 'yup'


export default function Login() {

    const navigate = useNavigate();
    const [err,setErr] = useState('')

    const formik = useFormik({
        initialValues: {
            username:'',
            password:''
        },
        onSubmit: values => {
            fetch('http://localhost:3001/auth/v1',{method : 'POST',
            headers : {'Content-Type': 'application/json'},
            body:JSON.stringify(values)})
            .then(res=>res.json())
            .then(data=>{ 
            localStorage.setItem('mytoken',data.token);
           console.log(localStorage.getItem('mytoken'));
           alert('Login successful');
           navigate('/readnow');
           //console.log(data);

      })
      .catch(error => setErr(error.message))
    
        },

        validationSchema: yup.object().shape({
            username: yup.string().required('The field cannot be left empty'),
            password: yup.string().required('Password cannot be left blank')
        })

    })

  return (
    <div className='row'>
    <div className="col-md-4 offset-md-4">
        <div className="bg-dark text-light mt-2 mb-2 py-2 rounded text-center">
            <h2>Login</h2>
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
            
            <div className="mt-2 text-center">
                <input className='btn btn-success' type="submit" value="Login" />
            </div>
            
        </form>
    </div>
    
   
</div>
  )
}
