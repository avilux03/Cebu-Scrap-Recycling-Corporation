"use client"
import { useState, useEffect } from "react";

export default function ContactForm() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		contactNumber: "",
		message: "",
		consent: false
	});
	const [errors] = useState({
		firstName: "First name is required",
		lastName: "",
		email: "",
		contactNumber: "",
		message: "",
		consent: ""
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value
		}))
	}

	const handleSubmit = () => {
		alert(`Form has been submitted with these values: ${JSON.stringify(formData)}`)
	}

	useEffect(() => {
		console.log(formData)
	}, [formData])

	return (
		<form
			className="flex flex-wrap gap-3"
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<div className="flex items-center gap-2 w-1/2">
				<label>First Name</label>
				<div className="flex flex-col gap-1">
					<input
						name="firstName"
						type="text"
						className="w-full h-7.5 border border-gray-300 rounded-md hover:border-blue-500 hover:outline-0"
						onChange={(event) => handleChange(event)}
					/>
					{errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
				</div>

			</div>

			<div className="flex items-center gap-2 w-1/2">
				<label>Last Name</label>
				<input
					name="lastName"
					type="text"
					className="w-full h-7.5 border border-gray-300 rounded-md hover:border-blue-500 hover:outline-0"
					onChange={(event) => handleChange(event)}
				/>
			</div>

			<div className="flex items-center gap-2 w-1/2">
				<label>Email</label>
				<input
					name="email"
					type="email"
					className="w-full h-7.5 border border-gray-300 rounded-md hover:border-blue-500 hover:outline-0"
					onChange={(event) => handleChange(event)}
				/>
			</div>

			<div className="flex items-center gap-2 w-1/2">
				<label>Contact Number</label>
				<input
					name="contactNumber"
					type="tel"
					className="w-full h-7.5 border border-gray-300 rounded-md hover:border-blue-500 hover:outline-0"
					onChange={(event) => handleChange(event)}
				/>
			</div>

			<div className="flex items-center gap-2">
				<input name="consent" type="checkbox" onChange={(event) => handleChange(event)} />
				<label>I agree with terms and conditions</label>
			</div>

			<div className="w-full flex justify-end">
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded-md"
				>
					Submit
				</button>
			</div>
		</form>
	)
}