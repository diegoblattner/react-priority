import { useCallback, useState } from "react";
import UserForm from "./components/users/user-form";
import { UsersPanel } from "./components/users/users-panel";
import { type User, users } from "./data";
import { IconPlus, IconUsers } from "./icons";

const tabs = {
	"users-list": [<IconUsers key="" />, "All users"] as const,
	"new-user": [<IconPlus key="" />, "New user"] as const,
} as const;

type TabName = keyof typeof tabs;
const allTabs = Object.keys(tabs) as TabName[];

const tabPanelId = "tab-content";

function App() {
	const [selectedTab, setSelectedTab] = useState<TabName>("users-list");

	const onAddUser = useCallback((user: User) => {
		users.unshift(user);
		setSelectedTab("users-list");
	}, []);

	return (
		<div className="pt-4">
			<div
				role="tablist"
				className="flex lg:w-[100ch] px-2 lg:px-4 lg:m-auto justify-start"
			>
				{allTabs.map((key) => (
					<button
						key={key}
						id={key}
						type="button"
						role="tab"
						aria-controls={tabPanelId}
						aria-selected={key === selectedTab}
						className="cursor-pointer group ps-4 pe-6 py-2 border-s-2 border-s-transparent bg-gray-200 scale-95 aria-selected:scale-100 aria-selected:bg-white aria-selected:border-s-current/40 aria-selected:text-blue-600"
						onClick={() => setSelectedTab(key)}
					>
						<div
							className={`flex items-center justify-center gap-2 text-nowrap group-hover:scale-105 ${key === selectedTab ? "scale-105" : ""}`}
						>
							{tabs[key][0]}
							{tabs[key][1]}
						</div>
					</button>
				))}
			</div>
			<div
				id={tabPanelId}
				role="tabpanel"
				aria-describedby={selectedTab}
				tabIndex={-1}
				className="flex-grow overflow-auto px-4 bg-white shadow"
			>
				<UsersPanel users={users} show={selectedTab === "users-list"} />
				<UserForm onAddUser={onAddUser} show={selectedTab === "new-user"} />
			</div>
		</div>
	);
}

export default App;
