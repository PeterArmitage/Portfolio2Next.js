import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './ContactFormModal.module.scss';

const formSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	company: z.string().optional(),
	email: z.string().email('Invalid email address'),
	subject: z.string().min(1, 'Subject is required'),
	message: z.string().min(1, 'Message is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
	isOpen,
	onClose,
}) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		setIsSubmitting(true);
		setSubmitError(null);

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			console.log('Full response:', response);

			// Log the response text
			console.log('Response status:', response.status);
			console.log('Response headers:', response.headers);
			const responseText = await response.text();
			console.log('Response text:', responseText);

			if (!response.ok) {
				let errorMessage: string;
				try {
					const errorData = JSON.parse(responseText);
					errorMessage = errorData.message || 'Failed to submit form';
				} catch (parseError) {
					console.error('Error parsing response:', parseError);
					errorMessage = 'Received an invalid response from the server';
				}
				throw new Error(errorMessage);
			}

			// Form submitted successfully
			reset();
			onClose();
		} catch (error) {
			console.error('Error submitting form:', error);
			setSubmitError(
				error instanceof Error
					? error.message
					: 'An error occurred while submitting the form. Please try again.'
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className={styles.modalWrapper}>
			<div className={styles.modalContent}>
				<h2 className={styles.title}>Contact Me</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.field}>
						<label htmlFor='name'>Name *</label>
						<input id='name' {...register('name')} placeholder='Your Name' />
						{errors.name && (
							<span className={styles.error}>{errors.name.message}</span>
						)}
					</div>

					<div className={styles.field}>
						<label htmlFor='company'>Company</label>
						<input
							id='company'
							{...register('company')}
							placeholder='Your Company (Optional)'
						/>
					</div>

					<div className={styles.field}>
						<label htmlFor='email'>Email *</label>
						<input
							id='email'
							type='email'
							{...register('email')}
							placeholder='your.email@example.com'
						/>
						{errors.email && (
							<span className={styles.error}>{errors.email.message}</span>
						)}
					</div>

					<div className={styles.field}>
						<label htmlFor='subject'>Subject *</label>
						<input
							id='subject'
							{...register('subject')}
							placeholder='Subject'
						/>
						{errors.subject && (
							<span className={styles.error}>{errors.subject.message}</span>
						)}
					</div>

					<div className={styles.field}>
						<label htmlFor='message'>Message *</label>
						<textarea
							id='message'
							{...register('message')}
							placeholder='Your message here...'
						/>
						{errors.message && (
							<span className={styles.error}>{errors.message.message}</span>
						)}
					</div>

					<div className={styles.actions}>
						<button
							type='submit'
							disabled={isSubmitting}
							className={styles.submitButton}
						>
							{isSubmitting ? 'Sending...' : 'Send Message'}
						</button>
						<button
							type='button'
							onClick={onClose}
							disabled={isSubmitting}
							className={styles.cancelButton}
						>
							Cancel
						</button>
					</div>

					{submitError && <div className={styles.error}>{submitError}</div>}
				</form>
				<button
					onClick={onClose}
					className={styles.closeButton}
					aria-label='Close'
				>
					×
				</button>
			</div>
		</div>
	);
};

export default ContactFormModal;
