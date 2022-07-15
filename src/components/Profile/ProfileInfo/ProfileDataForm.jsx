import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import s from './ProfileDataForm.module.css';
import TextError from '../../News/YouTubeFormFomik/TextError';

const validationSchema = Yup.object({
	aboutMe: Yup.string().min(2, 'To Short!').max(70, 'To Long!').required(),
	fullName: Yup.string().min(2, 'To Short!').max(70, 'To Long!').required('Required'),
	lookingForAJob: Yup.boolean(),
});

export default function ProfileDataForm({ initialValues, updateProfile, goToEditMode }) {
	const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
		updateProfile(values, setStatus, goToEditMode);
		setSubmitting(false);
		resetForm();
	};

	return (
		<Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
			{({ status }) => {
				console.log('Status', status);
				return (
					<Form>
						<div> Start Form this! </div>

						<div className={s.container}>
							<span className='error'>{status}</span>

							<label className={s.about_me_title}> About Me </label>
							<div className={s.about_me}>
								<div className='col'>
									<Field
										type='text'
										id='aboutMe'
										name='aboutMe'
										placeholder='About Me'
										className='form-control'
									/>

									<ErrorMessage name='aboutMe' component={TextError} />
								</div>
								<div className='col'>
									<Field
										type='text'
										id='fullName'
										name='fullName'
										placeholder='Full Name'
										className='form-control'
									/>
									<ErrorMessage name='fullName' component={TextError} />
								</div>

								<div className='col-auto'>
									<div className='form-check'>
										<label className='form-check-label' htmlFor='text'>
											Looking for a job
										</label>
										<Field
											type='checkbox'
											id='lookingForAJob'
											name='lookingForAJob'
											className='form-check-input'
										/>
										<ErrorMessage name='lookingForAJob' component={TextError} />
										<div>
											<div className='col'>
												<Field
													type='text'
													id='lookingForAJobDescription'
													name='lookingForAJobDescription'
													placeholder='My skills'
													className='form-control'
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<label htmlFor='text' className={s.contacts_title}>
								{' '}
								Contacts{' '}
							</label>

							<div className={s.contacts}>
								{Object.keys(initialValues.contacts).map((key) => {
									return (
										<div key={key} className={` ${s.contacts_items} col`}>
											<Field
												type='text'
												id={key}
												name={`contacts.${key}`}
												placeholder={key}
												className='form-control'
											/>
										</div>
									);
								})}
							</div>
						</div>
						<button className='btn btn-primary' type='submit'>
							save
						</button>
					</Form>
				);
			}}
		</Formik>
	);
}
