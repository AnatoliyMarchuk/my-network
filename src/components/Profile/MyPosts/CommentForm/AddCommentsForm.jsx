import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import s from './AddCommentsForm.module.css';
import TextError from '../../../News/YouTubeFormFomik/TextError';

const initialValues = {
	comment: '',
};

export default function AddCommentForm(props) {
	const onSubmit = (values, onSubmitProps) => {
		// console.log('Forms data', values);
		props.addPost(values.comment);
		onSubmitProps.resetForm();
	};
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			<Form className={`form-control ${s.form} `}>
				<div className={s.input}>
					<label htmlFor='comment'>Comment</label>
					<Field as='textarea' id='comment' type='text' name='comment' />
				</div>
				<ErrorMessage name='comment' component={TextError} />

				<button className={`btn ${s.btn}`} type='submit'>
					Add{' '}
				</button>
			</Form>
		</Formik>
	);
}
