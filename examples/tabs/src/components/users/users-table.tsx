import type { User } from "../../data";

type UsersTableProps = Readonly<{
	users: User[];
}>;

export function UsersTable({ users }: UsersTableProps) {
	return (
		<table className="min-w-full bg-white border border-gray-300 mb-4">
			<thead className="sticky top-0 bg-gray-100 shadow-sm shadow-gray-400">
				<tr>
					<th className="ps-4 pe-2 py-2 text-left w-12">
						<span className="sr-only">Avatar</span>
					</th>
					<th className="ps-4 pe-2 py-2 text-left">Name</th>
					<th className="ps-4 pe-2 py-2 text-left">Email</th>
					<th className="ps-4 pe-2 py-2 text-left">Role</th>
					<th className="ps-4 pe-2 py-2 text-left">Status</th>
				</tr>
			</thead>
			<tbody className="overflow-y-auto">
				{users.map((user) => (
					<tr
						key={user.id}
						className="border-b last:border-b-0 border-gray-300 hover:bg-gray-50 transition-colors"
					>
						<td className="ps-4 me-2 py-2 w-12">
							<img
								src={user.avatar}
								alt={`avatar for ${user.name}`}
								className="min-w-8 min-h-8"
							/>
						</td>
						<td className="ps-4 pe-2 py-2 font-medium">{user.name}</td>
						<td className="ps-4 pe-2 py-2">{user.email}</td>
						<td className="ps-4 pe-2 py-2 capitalize">{user.role}</td>
						<td className="ps-4 pe-2 py-2">
							<span
								className={`inline-block w-3 h-3 rounded-full mr-2 ${
									user.online ? "bg-green-500" : "bg-gray-400"
								}`}
							></span>
							{user.online ? "Online" : "Offline"}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
