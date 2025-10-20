export const roles = [
	"admin",
	"editor",
	"viewer",
	"moderator",
	"member",
] as const;

export type User = {
	id: string;
	avatar: string;
	name: string;
	email: string;
	role: string;
	online: boolean;
};

export const users: User[] = Array.from({ length: 100 }, (_, i) => {
	const firstNames = [
		"Alice",
		"Bob",
		"Charlie",
		"Diana",
		"Ethan",
		"Fiona",
		"George",
		"Hannah",
		"Isaac",
		"Julia",
		"Kevin",
		"Liam",
		"Mia",
		"Noah",
		"Olivia",
		"Paul",
		"Quinn",
		"Ruby",
		"Sam",
		"Tara",
		"Uma",
		"Victor",
		"Willow",
		"Xavier",
		"Zoe",
		"Hugh",
		"Dilbert",
		"Evan",
		"Laura",
		"Bruno",
		"Simone",
		"Gustavo",
		"Hellen",
		"Paulo",
		"Katia",
		"Silvia",
		"Roberto",
		"Sean",
		"Chris",
		"Tim",
		"Ciara",
		"Ines",
		"Naomi",
		"David",
		"Rachel",
		"Jorge",
		"Paul",
		"Willian",
		"Richard",
		"Alex",
		"Sam",
		"Hugh",
	];

	const lastNames = [
		"Smith",
		"Johnson",
		"Brown",
		"Taylor",
		"Anderson",
		"Thomas",
		"Jackson",
		"White",
		"Harris",
		"Martin",
		"Clark",
		"Lee",
		"Lewis",
		"Walker",
		"Hall",
		"O'Connel",
		"O'Neil",
		"Oliveira",
		"Silva",
		"Santos",
		"Young",
		"Ferreira",
		"Hernandez",
		"Batista",
		"Pereira",
		"Soarez",
		"Higgins",
		"Cooper",
		"Oak",
		"Felix",
	];

	const roles = [
		"admin",
		"editor",
		"viewer",
		"moderator",
		"member",
		"developer",
		"support",
	];

	const domains = [
		"example.com",
		"gmail.com",
		"yahoo.com",
		"outlook.com",
		"company.io",
		"startup.dev",
	];

	const random = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

	const first = random(firstNames);
	const last = random(lastNames);
	const name = `${first} ${last}`;
	const domain = random(domains);

	const email =
		`${first.toLowerCase()}.${last.toLowerCase()}${i}@${domain}`.replaceAll(
			"'",
			"",
		);
	const role = random(roles);

	// Bias toward fewer online users (~40%)
	const online = Math.random() < 0.4;

	return {
		id: `u:${i + 1}`,
		avatar: getAvatar(name),
		name,
		email,
		role,
		online,
	};
}).sort((a, b) => {
	if (a.name > b.name) {
		return 1;
	} else {
		return -1;
	}
});

export function getAvatar(name: string) {
	return `https://ui-avatars.com/api/?rounded=true&size=32&background=random&name=${encodeURIComponent(name)}`;
}
