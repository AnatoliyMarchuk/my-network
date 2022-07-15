import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import s from './LoginForm.module.css';
import TextError from '../News/YouTubeFormFomik/TextError';

const initialValues = {
	name: '',
	password: '',
	email: '',
};
const onSubmit = (values, onSubmitProps) => {
	console.log('Form data', values);
	onSubmitProps.resetForm();
};

const validationSchema = yup.object().shape({
	name: yup.string().typeError('Most be a string!').required('Necessarily'),
	secondName: yup.string().typeError('Most be a string!').required('Necessarily'),
	password: yup.string().required('Necessarily'),
	email: yup
		.string()
		.min(3, 'minimum three symbol')
		.email('enter your email')
		.required('Necessarily'),
});
export default function OldLoginForm() {
	return (
		<>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				<div className={s.wrapper}>
					<Form>
						<div className={s.group}>
							<label className={s.label} htmlFor={'name'}>
								Login
							</label>{' '}
							<br />
							<Field
								type='text'
								name='name'
								id='name'
								placeholder='Enter login'
								className='form-control'
							/>
							<ErrorMessage name='name' component={TextError} />
						</div>

						<div>
							<label htmlFor={'password'}>Password</label> <br />
							<Field
								id='password'
								type='password'
								name='password'
								className='form-control'
								placeholder='Password'
							/>
							<ErrorMessage name='password' component={TextError} />
						</div>
						<div>
							<label htmlFor={'email'}>Email address</label> <br />
							<Field
								id='email'
								type='email'
								name='email'
								className='form-control'
								placeholder='Enter email'
							/>
							<ErrorMessage name='email' component={TextError} />
						</div>

						{/* <Field type='checkbox' name='checkbox' /> */}
						<button className={`btn ${s.btn}`} type='submit'>
							Remember Me{' '}
						</button>
						<button className='btn' type='submit'>
							{' '}
							Submit{' '}
						</button>
					</Form>
				</div>
			</Formik>
		</>
	);
}
