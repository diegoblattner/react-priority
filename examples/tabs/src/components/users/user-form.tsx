import type React from "react";
import { useState } from "react";
import { getAvatar, roles, type User } from "../../data";
import { InputField, SelectField } from "../field";

type UserFormProps = {
	onAddUser: (user: User) => void;
	show: boolean;
};

const rolesLabels: Record<(typeof roles)[number], string> = {
	admin: "Admin",
	editor: "Editor",
	member: "Member",
	moderator: "Moderator",
	viewer: "Viewer",
};

const rolesOptions = roles.map((r) => ({
	value: r,
	label: rolesLabels[r],
}));

type FormError<K extends string> = {
	[name in K]?: string[];
};

type UserFormErrors = FormError<"name" | "email" | "role">;

function UserForm({ onAddUser, show }: UserFormProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");
	const [errors, setErrors] = useState<UserFormErrors>({});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newErrors: UserFormErrors = {};

		// validation
		if (!name.trim()) {
			newErrors.name = ["The name is required."];
		}
		if (!email.trim()) {
			newErrors.name = ["The e-mail is required."];
		}
		if (!role) {
			newErrors.role = ["The role is required."];
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		// adding the user
		const newUser: User = {
			id: `u:${Date.now().toString().substring(8)}`,
			avatar: getAvatar(name),
			name,
			email,
			role,
			online: false,
		};

		onAddUser(newUser);
		setName("");
		setEmail("");
		setRole("");
	};

	return show ? (
		<form
			onSubmit={handleSubmit}
			className="px-1 py-4 flex flex-col gap-4 items-start sm:max-w-[70ch] sm:m-auto"
		>
			<InputField
				label="name"
				id="name"
				name="name"
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="John Doe"
				error={errors.name}
			/>

			<InputField
				label="e-mail"
				id="email"
				name="email"
				type="email"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="john.doe@example.com"
				error={errors.email}
			/>

			<SelectField
				label="role"
				id="role"
				name="role"
				value={role}
				onChange={(e) => setRole(e.target.value)}
				options={rolesOptions}
				error={errors.role}
			/>

			<button
				type="submit"
				className="cursor-pointer bg-blue-600 text-white rounded px-4 py-2 mt-4 mb-8 hover:bg-blue-700 transition"
			>
				Add User
			</button>
		</form>
	) : null;
}

export default UserForm;
