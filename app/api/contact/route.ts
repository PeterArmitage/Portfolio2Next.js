import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const formSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	company: z.string().optional(),
	email: z.string().email('Invalid email address'),
	subject: z.string().min(1, 'Subject is required'),
	message: z.string().min(1, 'Message is required'),
});

export async function POST(request: NextRequest) {
	console.log('Received POST request to /api/contact');

	try {
		const body = await request.json();
		console.log('Request body:', body);

		const validatedData = formSchema.parse(body);
		console.log('Validated data:', validatedData);

		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: parseInt(process.env.EMAIL_PORT || '587'),
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		try {
			await transporter.sendMail({
				from: process.env.EMAIL_FROM,
				to: process.env.EMAIL_TO,
				subject: `New contact form submission: ${validatedData.subject}`,
				text: `
          Name: ${validatedData.name}
          Company: ${validatedData.company || 'N/A'}
          Email: ${validatedData.email}
          Subject: ${validatedData.subject}
          Message: ${validatedData.message}
        `,
			});

			console.log('Email sent successfully');
			return NextResponse.json(
				{ message: 'Form submitted successfully' },
				{ status: 200 }
			);
		} catch (emailError) {
			console.error('Error sending email:', emailError);
			return NextResponse.json(
				{ message: 'Error sending email' },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error('Error processing form submission:', error);
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ message: 'Invalid form data', errors: error.errors },
				{ status: 400 }
			);
		}
		return NextResponse.json(
			{ message: 'Error submitting form' },
			{ status: 500 }
		);
	}
}
