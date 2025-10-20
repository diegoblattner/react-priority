import type { User } from "../../data";

type UserCardProps = Readonly<{
	user: User;
	onClose?: () => void;
}>;

export function UserCard({ user, onClose }: UserCardProps) {
	return (
		<div className="relative bg-white rounded xshadow-xs p-4 lg:p-6 w-full sm:max-w-sm border border-gray-300">
			{onClose && (
				<button
					type="button"
					onClick={onClose}
					className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
				>
					×
				</button>
			)}

			<div className="flex flex-col">
				<div className="flex items-center gap-4 md:flex-col md:text-center">
					<img
						src={user.avatar}
						alt={`avatar for ${user.name}`}
						className="w-10 h-10 lg:w-16 lg:h-16"
					/>

					<div className="md:text-center">
						<h3 className="text-xl font-semibold lg:mt-3">{user.name}</h3>
						<p className="text-gray-500 text-sm">{user.email}</p>
					</div>
				</div>
				<div className="mt-4 w-full md:border-t border-gray-100 pt-3 text-left space-y-2">
					<div className="flex justify-between">
						<span className="text-gray-600 font-medium">Role:</span>
						<span className="capitalize text-gray-800">{user.role}</span>
					</div>

					<div className="flex justify-between">
						<span className="text-gray-600 font-medium">Status:</span>
						<span
							className={`${
								user.online ? "text-green-600" : "text-gray-500"
							} font-medium`}
						>
							{user.online ? "Online" : "Offline"}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
