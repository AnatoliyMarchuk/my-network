import React from 'react';
import { Field, Form, Formik } from 'formik';
import s from './MessageForm.module.css';

const initialValues = {
	message: '',
};
export default function MessageForm(props) {
	const onSubmit = (values, onSubmitProps) => {
		// console.log('Form data:', values);
		props.addMessage(values.message);
		onSubmitProps.resetForm();
	};
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			<Form className={s.form}>
				<label htmlFor='Add message'> Add message</label>
				<Field as='textarea' type='text' name='message' placeholder=' Write something here...' />

				<button type='submit' className={`${s.btn} btn`}>
					{' '}
					Add{' '}
				</button>
			</Form>
		</Formik>
	);
}
