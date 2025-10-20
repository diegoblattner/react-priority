import type {
	InputHTMLAttributes,
	ReactNode,
	SelectHTMLAttributes,
} from "react";

type Defined<T> = Exclude<T, undefined>;

type InputProps = Readonly<{
	id: Defined<InputHTMLAttributes<HTMLInputElement>["id"]>;
	name: Defined<InputHTMLAttributes<HTMLInputElement>["name"]>;
	type: Defined<InputHTMLAttributes<HTMLInputElement>["type"]>;
	value: InputHTMLAttributes<HTMLInputElement>["value"];
	onChange: InputHTMLAttributes<HTMLInputElement>["onChange"];
	placeholder: InputHTMLAttributes<HTMLInputElement>["placeholder"];
	["aria-label"]?: InputHTMLAttributes<HTMLInputElement>["aria-label"];
	className?: string;
}>;

const inputClx =
	"border border-gray-300 rounded px-3 py-2 w-full group-hover:border-gray-500 hover:border-gray-500 focus:outline outline-blue-600/50";

export function Input({ className = "", ...props }: InputProps) {
	return <input className={`${inputClx} ${className}`} {...props} />;
}

type FieldProps = InputProps &
	Readonly<{
		label: string;
		error?: string[];
		children: ReactNode;
	}>;

function getErrorId(id: string) {
	return `${id}-error`;
}

function Field({ children, label, error, ...inputProps }: FieldProps) {
	return (
		<div className="flex flex-col w-full group">
			<label
				className="text-sm font-medium mb-1"
				htmlFor={inputProps.id}
				aria-describedby={getErrorId(inputProps.id)}
			>
				{label}
			</label>
			{children}
			<div
				className="text-red-700"
				id={getErrorId(inputProps.id)}
				aria-live="polite"
			>
				{error?.map((e) => (
					<p key={e}>{e}</p>
				))}
			</div>
		</div>
	);
}

export function InputField(props: Exclude<FieldProps, "children">) {
	return (
		<Field {...props}>
			<Input {...props} />
		</Field>
	);
}

type SelectProps = Exclude<FieldProps, "children" | "type" | "placeholder"> &
	Readonly<{
		onChange: SelectHTMLAttributes<HTMLSelectElement>["onChange"];
		options: {
			value: string;
			label: string;
		}[];
	}>;

export function SelectField({ options, ...props }: SelectProps) {
	return (
		<Field {...props}>
			<select {...props} className={inputClx}>
				{options.map(({ value, label }) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</select>
		</Field>
	);
}
