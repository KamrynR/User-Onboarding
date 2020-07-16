import React, {useState, useEffect} from 'react';
import * as yup from "yup";
import axios from "axios";
import './Form.css';

const Form = props => {
    const defaultState = {
        name: '',
        email: '',
        password: '',
        position: '',
        terms: false
    };
    const [formState, setFormState] = useState(defaultState);
    const [errors, setErrors] = useState({...defaultState, terms: ''});
    const [buttonDisabled, setButtonDisabled] = useState(true);

    let formSchema = yup.object().shape({
        name: yup.string().required('Please provide a name.'),
        email: yup.string().required('Please provide an email.').email('This is not a valid email.'),
        password: yup.string().required('Please provide a password.'),
        position: yup.string(),
        terms: yup.boolean().oneOf([true], 'Please agree to the terms and conditions.')
    })
    useEffect(() => {
        formSchema.isValid(formState)
        .then(valid => setButtonDisabled(!valid));
    }, [formState]);

    const formSubmit = e => {
        e.preventDefault();
        console.log('form submitted!');
        if(formState){props.setUsers([...props.users, {formState}])}
        axios
            .post('https://reqres.in/api/users', formState)
            .then(() => console.log('form submission success'))
            .catch(err => console.log(err));
    };
    const validateChange = e => {
        e.persist();
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => 
                setErrors({
                ...errors, 
                [e.target.name]: ''
            }))
            .catch(error => setErrors({
                ...errors,
                [e.target.name]: error.errors[0]
            }));
    }
    const inputChange = e => {
        // console.log(e.target.type);
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormState({
            ...formState,
            [e.target.name]: value
        });
        validateChange(e)
    };

    return (
        <div className='formBody'>
            <form className='signUpForm' onSubmit={formSubmit}>
                <h1>Create Account</h1>
                <div className='txtb'>
                    <input 
                        type='text'
                        name='name'
                        autoComplete='off'
                        value={formState.name}
                        onChange={inputChange}/>
                    <span data-placeholder="Name"><p className='error'>{errors.name}</p></span>                    
                </div>
                <div className='txtb'>
                    <input
                        type='text'
                        name='email'
                        autoComplete='off'
                        value={formState.email}
                        onChange={inputChange}/>
                    <span data-placeholder="Email"><p className='error'>{errors.email}</p></span>
                </div>
                <div className='txtb'>
                    <input
                        type='password'
                        name='password'
                        autoComplete='off'
                        value={formState.password}
                        onChange={inputChange}/>
                    <span data-placeholder="Password"><p className='error'>{errors.password}</p></span>
                </div>
                <select className='dropdown' name='position' onChange={inputChange}>
                    <option value=''>What is your role?</option>
                    <option value='UI Design'>UI Design</option>
                    <option value='Front End'>Front End</option>
                    <option value='Back End'>Back End</option>
                    <option value='Team Lead'>Team Lead</option>
                </select>
                <div className='tos'>
                    <label className='terms' htmlFor="terms">
                        <p><input name='terms' type='checkbox' onChange={inputChange}/> </p>
                         I have read and accept <br/>
                        <a href='#' className='tosLink'>Terms of Service</a>
                    </label>
                </div>
                <br/>
                <button className="login-button" disabled={buttonDisabled}
                 type="submit" >Sign Up</button>
                 <p className='accountQ'>Already have an account? <a href='#' className='sign-in'>Sign In</a></p>
            </form>
        </div>
)}

export default Form;