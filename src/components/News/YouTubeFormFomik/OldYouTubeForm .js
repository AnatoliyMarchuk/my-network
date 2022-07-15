import React from 'react';
import s from './YouTubeForm.module.css';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';

const initialValues = { name: '', email: '', channel: '' };

const onSubmit = (values) => {
	console.log('Form data', values);
};
const validate = (values) => {
	let errors = {};
	if (!values.name) {
		errors.name = 'Required';
	}
	if (!values.email) {
		errors.email = 'Required';
	}
	if (!values.channel) {
		errors.channel = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}
	return errors;
};
const validationSchema = yup.object().shape({
	name: yup.string().required('Required'),
	email: yup.string().email('Invalid email format ').required('Required'),
	channel: yup.string().required('Required'),
});
export default function OldYouTubeForm() {
	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});
	// console.log('Formil values', formik.values);
	console.log('Form errors', formik.errors);
	console.log('Visited fields', formik.touched);
	console.log('Validation schema', validationSchema);

	return (
		<>
			{/* <Formik validationScheme={validationScheme}> */}
			<div className={s.wrapper}>
				<form onSubmit={formik.handleSubmit}>
					<div className='form-control'>
						<label htmlFor='name'>Name</label>
						<input
							type='text'
							id='name'
							name='name'
							onChange={formik.handleChange}
							value={formik.values.name}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.name && formik.errors.name ? (
							<div className='error'>{formik.errors.name}</div>
						) : null}
					</div>
					<div className='form-control'>
						<label htmlFor='email'>E-mail</label>
						<input
							type='email'
							id='email'
							name='email'
							onChange={formik.handleChange}
							value={formik.values.email}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.email && formik.errors.email ? (
							<div className='error'>{formik.errors.email}</div>
						) : null}
					</div>
					<div className='form-control'>
						<label htmlFor='channel'>Channel</label>
						<input
							type='text'
							id='channel'
							name='channel'
							onChange={formik.handleChange}
							value={formik.values.channel}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.channel && formik.errors.channel ? (
							<div className='error'>{formik.errors.channel}</div>
						) : null}
					</div>
					<div>
						<button className='btn ' type='submit'>
							{' '}
							Submit{' '}
						</button>
					</div>
				</form>
			</div>
			{/* </Formik> */}
		</>
	);
}
