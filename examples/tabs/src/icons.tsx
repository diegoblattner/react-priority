type IconProps = Readonly<{
	className?: string;
}>;

const commonStyles = {
	display: "inline-block",
	width: "1.2em",
};

export const IconUsers = ({ className }: IconProps) => (
	<svg
		stroke="currentColor"
		fill="none"
		strokeWidth="2"
		viewBox="0 0 24 24"
		strokeLinecap="round"
		strokeLinejoin="round"
		xmlns="http://www.w3.org/2000/svg"
		style={commonStyles}
		className={className}
	>
		<title>users icon</title>
		<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
		<circle cx="9" cy="7" r="4"></circle>
		<path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
		<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
	</svg>
);

export const IconPlus = ({ className }: IconProps) => (
	<svg
		stroke="currentColor"
		fill="none"
		strokeWidth="2"
		viewBox="0 0 24 24"
		strokeLinecap="round"
		strokeLinejoin="round"
		xmlns="http://www.w3.org/2000/svg"
		style={commonStyles}
		className={className}
	>
		<title>plus icon</title>
		<path d="M5 12h14"></path>
		<path d="M12 5v14"></path>
	</svg>
);

export const IconLayoutGrid = ({ className }: IconProps) => (
	<svg
		stroke="currentColor"
		fill="none"
		strokeWidth="2"
		viewBox="0 0 24 24"
		strokeLinecap="round"
		strokeLinejoin="round"
		xmlns="http://www.w3.org/2000/svg"
		style={commonStyles}
		className={className}
	>
		<title>grid layout icon</title>
		<rect width="7" height="7" x="3" y="3" rx="1"></rect>
		<rect width="7" height="7" x="14" y="3" rx="1"></rect>
		<rect width="7" height="7" x="14" y="14" rx="1"></rect>
		<rect width="7" height="7" x="3" y="14" rx="1"></rect>
	</svg>
);

export const IconLayoutTable = ({ className }: IconProps) => (
	<svg
		stroke="currentColor"
		fill="none"
		strokeWidth="2"
		viewBox="0 0 24 24"
		strokeLinecap="round"
		strokeLinejoin="round"
		xmlns="http://www.w3.org/2000/svg"
		style={commonStyles}
		className={className}
	>
		<title>table layout icon</title>
		<rect width="18" height="18" x="3" y="3" rx="2"></rect>
		<path d="M21 7.5H3"></path>
		<path d="M21 12H3"></path>
		<path d="M21 16.5H3"></path>
	</svg>
);
