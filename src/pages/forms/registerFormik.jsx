import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { User } from './user.class';
import { ROLES } from './roles.enum';
import {useHistory} from 'react-router-dom'

const Registerformik = () => {

    const history = useHistory();

    const navigateTo = (path) => {
        history.push(path);
    }

    let user = new User();

    const initialValues = {
        userName: '',
        email: '',
        password: '',
        confirm: '', // to confirm password 
        role: ROLES.USER
    }

    const registerSchema = Yup.object().shape(
        {
            username: Yup.string()
                    .min(6, 'Username too short (6-12 characters)')
                    .max(12, 'Username too long (6-12 characters)')
                    .required('Username is required'),
            email: Yup.string()
                    .email('Invalid email format')
                    .required('Email is required'),
            role: Yup.string()
                    .oneOf([ROLES.USER, ROLES.ADMIN], 'You must select a role Role (User / Admin)')
                    .required('Role is required'),
            password: Yup.string()
                    .required('Password is required')
                    .min(8, 'Password to short (8 characters)'),
            confirm: Yup.string()
                    .when("password", {
                        is: value => (value && value.length > 0 ? true : false),
                        then: Yup.string().oneOf(
                            [Yup.ref("password")],
                            'Passwords must match!'
                        ).required('You must confirm the password')
                    })
        }
    )

    const submit = (values) => {
        alert('Register user');
    }

    return (
        <div>
            <h4>Register Formik</h4>
            <Formik
                initialValues = { initialValues }
                // Yup Validation Schema
                validationSchema = { registerSchema } 
                onSubmit={async (values) => {
                    await new Promise ((r) => setTimeout(r, 1000));
                    alert(JSON.stringify(values, null, 2));
                    //We save the data in the localstorage
                    localStorage.setItem('credential', values);
                }}
                >

                {({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
                    <Form>
                        <label htmlFor="username">username</label>
                        <Field id="username" type='text' name="username" placeholder="Your username" />

                        {/* Username errors */}
                        {
                            errors.username && touched.username &&
                            (
                                <ErrorMessage name='username' component='div' />
                            )
                        }

                        <label htmlFor="email">Email</label>
                        <Field id="email" type='email' name="email" placeholder="email@example.com" />

                        {/* Email errors */}
                        {
                            errors.email && touched.email &&
                            (
                                <ErrorMessage name='email' component='div' />
                            )
                        }

                        <label htmlFor="password">Password</label>
                        <Field
                            id="password"
                            name="password"
                            placeholder="password"
                            type="password"
                        />

                        {/* Password errors */}
                        {
                            errors.password && touched.password &&
                            (
                                <ErrorMessage name='password' component='div' />
                            )
                        }

                        <label htmlFor="confirm">Confirm password</label>
                        <Field
                            id="confirm"
                            name="confirm"
                            placeholder="Confirm password"
                            type="password"
                        />

                        {/* Confirm password errors */}
                        {
                            errors.confirm && touched.confirm &&
                            (
                                <ErrorMessage name='confirm' component='div' />
                            )
                        }

                        <button type="submit">Register account</button>

                    </Form>
                )}
            </Formik>
            <button onClick={() => navigateTo('/')}>
                Return to Home Page
            </button>
            <button onClick={() => navigateTo('/login')}>
                Go to Login
            </button>
        </div>
    );
}

export default Registerformik;
