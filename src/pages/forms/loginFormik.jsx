import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

const loginShchema = Yup.object().shape(
    {
        email: Yup.string()
                .email('Invalid email format')
                .required('Email is required'),
        password: Yup.string()
                .required('Password is required')
    }
);






const Loginformik = () => {

    const initialCredentials = {
        email: '',
        password: ''
    }

    const history = useHistory();

    const navigateTo = (path) => {
        history.push(path);
    }

    return (
        <div>
            <h4>Login Formik</h4>
            <Formik
                //Initial values that the form will take
                initialValues={ initialCredentials }
                //Yup validation schema
                validationSchema={ loginShchema }
                //onSubmit event
                onSubmit={async (values) => {
                    await new Promise ((r) => setTimeout(r, 1000));
                    alert(JSON.stringify(values, null, 2));
                    //We save the data in the localstorage
                    await localStorage.setItem('credential', values);
                    history.push('/profile');
                }}
            >


            {/* We obtain props from formik */}

            {({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
                    <Form>
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

                        <button type="submit">Login</button>
                        { isSubmitting ? (<p>Login your credentials...</p>) : null }
                    </Form>
                 )}
            </Formik>
            <button onClick={() => navigateTo('/')}>
                Return to Home Page
            </button>
            <button onClick={() => navigateTo('/register')}>
                Go to Register
            </button>
        </div>
    );
}

export default Loginformik;
