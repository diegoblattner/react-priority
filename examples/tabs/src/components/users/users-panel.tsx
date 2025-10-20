import { useEffect, useState } from "react";
import type { User } from "../../data";
import { IconLayoutGrid, IconLayoutTable } from "../../icons";
import { QuickSearch } from "../quick-search";
import { UserCard } from "./user-card";
import { UsersTable } from "./users-table";

type UsersPanelProps = Readonly<{
	users: User[];
	show: boolean;
	initialText?: string;
}>;

function filterUsers(allUsers: User[], text: string): User[] {
	if (!text) return allUsers;

	const lText = text.toLowerCase();

	const filtered = allUsers.filter(
		(u) =>
			u.name.toLowerCase().includes(lText) ||
			u.email.toLowerCase().includes(lText) ||
			u.role.toLowerCase().includes(lText) ||
			(u.online && "online".includes(lText)) ||
			(!u.online && "offline".includes(lText)),
	);

	return filtered;
}

function useFilteredUsers(allUsers: User[], text: string): User[] {
	const [filtered, setFiltered] = useState(allUsers);

	useEffect(() => {
		setFiltered(filterUsers(allUsers, text));
	}, [allUsers, text]);

	return filtered;
}

type ViewType = "table" | "card";

export function UsersPanel({ users, show, initialText = "" }: UsersPanelProps) {
	const [view, setView] = useState<ViewType>("table");
	const [text, setText] = useState(initialText);
	const filteredUsers = useFilteredUsers(users, text);
	return show ? (
		<div className="lg:max-w-[100ch] lg:m-auto">
			<div className="flex justify-between gap-2">
				<QuickSearch onSearch={setText} />
				<div className="hidden sm:flex self-center items-center justify-center border rounded divide-x divide-gray-300 border-gray-300 text-gray-800">
					<button
						type="button"
						onClick={() => setView("table")}
						aria-pressed={view === "table"}
						aria-label="Table view"
						className="cursor-pointer px-3 py-1 bg-white aria-pressed:bg-gray-100 aria-pressed:cursor-default"
					>
						<IconLayoutTable />
					</button>
					<button
						type="button"
						onClick={() => setView("card")}
						aria-pressed={view === "card"}
						aria-label="Table view"
						className="cursor-pointer px-3 py-1 bg-white aria-pressed:bg-gray-100 aria-pressed:cursor-default"
					>
						<IconLayoutGrid />
					</button>
				</div>
			</div>
			{view === "table" && <UsersTable users={filteredUsers} />}
			{view === "card" && (
				<div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{filteredUsers.map((u) => (
						<UserCard key={u.id} user={u} />
					))}
				</div>
			)}
		</div>
	) : null;
}
