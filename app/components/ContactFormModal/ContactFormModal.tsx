import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, FieldApi } from '@tanstack/react-form';
import { z } from 'zod';
import * as Toast from '@radix-ui/react-toast';
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
	const { t } = useTranslation();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [toastOpen, setToastOpen] = useState(false);
	const [toastData, setToastData] = useState<{
		message: string;
		type: 'success' | 'error';
	}>({ message: '', type: 'success' });

	const form = useForm<FormValues>({
		defaultValues: {
			name: '',
			company: '',
			email: '',
			subject: '',
			message: '',
		},
		onSubmit: async (values) => {
			setIsSubmitting(true);
			setSubmitError(null);

			try {
				const formData = {
					name: values.value.name,
					company: values.value.company,
					email: values.value.email,
					subject: values.value.subject,
					message: values.value.message,
				};

				const response = await fetch('/api/contact', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || t('contactForm.errorMessage'));
				}

				setToastData({
					message: t('contactForm.successMessage'),
					type: 'success',
				});
				setToastOpen(true);
				form.reset();
				setTimeout(() => {
					onClose();
				}, 3000);
			} catch (error) {
				console.error('Error submitting form:', error);
				const errorMessage =
					error instanceof Error
						? error.message
						: t('contactForm.errorMessage');
				setSubmitError(errorMessage);
				setToastData({ message: errorMessage, type: 'error' });
				setToastOpen(true);
			} finally {
				setIsSubmitting(false);
			}
		},
	});

	if (!isOpen) return null;

	const Field = ({
		name,
		label,
		type = 'text',
		placeholder,
	}: {
		name: keyof FormValues;
		label: string;
		type?: string;
		placeholder: string;
	}) => {
		return (
			<form.Field name={name}>
				{(field: FieldApi<FormValues, typeof name>) => (
					<div className={styles.field}>
						<label htmlFor={name}>{label}</label>
						{type === 'textarea' ? (
							<textarea
								id={name}
								name={name}
								value={field.state.value as string}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder={placeholder}
							/>
						) : (
							<input
								id={name}
								name={name}
								type={type}
								value={field.state.value as string}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder={placeholder}
							/>
						)}
						{field.state.meta.errors ? (
							<span className={styles.error}>{field.state.meta.errors[0]}</span>
						) : null}
					</div>
				)}
			</form.Field>
		);
	};

	return (
		<Toast.Provider swipeDirection='right'>
			<div className={styles.modalWrapper}>
				<div className={styles.modalContent}>
					<h2 className={styles.title}>{t('contactForm.title')}</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							void form.handleSubmit();
						}}
					>
						<Field
							name='name'
							label={t('contactForm.name')}
							placeholder={t('contactForm.placeholders.name')}
						/>
						<Field
							name='company'
							label={t('contactForm.company')}
							placeholder={t('contactForm.placeholders.company')}
						/>
						<Field
							name='email'
							label={t('contactForm.email')}
							type='email'
							placeholder={t('contactForm.placeholders.email')}
						/>
						<Field
							name='subject'
							label={t('contactForm.subject')}
							placeholder={t('contactForm.placeholders.subject')}
						/>
						<Field
							name='message'
							label={t('contactForm.message')}
							type='textarea'
							placeholder={t('contactForm.placeholders.message')}
						/>

						<div className={styles.actions}>
							<button
								type='submit'
								disabled={isSubmitting}
								className={styles.submitButton}
							>
								{isSubmitting
									? t('contactForm.sending')
									: t('contactForm.send')}
							</button>
							<button
								type='button'
								onClick={onClose}
								disabled={isSubmitting}
								className={styles.cancelButton}
							>
								{t('contactForm.cancel')}
							</button>
						</div>

						{submitError && <div className={styles.error}>{submitError}</div>}
					</form>
					<button
						onClick={onClose}
						className={styles.closeButton}
						aria-label={t('contactForm.close')}
					>
						×
					</button>
				</div>
			</div>
			<Toast.Root
				className={styles.ToastRoot}
				open={toastOpen}
				onOpenChange={setToastOpen}
			>
				<Toast.Title className={styles.ToastTitle}>
					{toastData.type === 'success'
						? t('contactForm.success')
						: t('contactForm.error')}
				</Toast.Title>
				<Toast.Description className={styles.ToastDescription}>
					{toastData.message}
				</Toast.Description>
				<Toast.Action
					className={styles.ToastAction}
					asChild
					altText={t('contactForm.close')}
				>
					<button
						className={styles.ToastButton}
						onClick={() => setToastOpen(false)}
					>
						{t('contactForm.close')}
					</button>
				</Toast.Action>
			</Toast.Root>
			<Toast.Viewport className={styles.ToastViewport} />
		</Toast.Provider>
	);
};

export default ContactFormModal;
