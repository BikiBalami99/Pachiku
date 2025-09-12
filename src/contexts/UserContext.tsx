"use client";

import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserByEmail } from "@/utils/getUser";
import { User } from "@prisma/client";

type UserContextType = {
	user: User | null;
};

// Create context with default value as undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const { data: session, status } = useSession();
	const [user, setUser] = useState<User | null>(null);

	// When the session data is available, fetch the user by email
	useEffect(() => {
		if (session?.user?.email) {
			getUserByEmail(session.user.email)
				.then((fetchedUser) => {
					setUser(fetchedUser);
				})
				.catch((error) => console.error("Error fetching user:", error));
		} else {
			setUser(null);
		}
	}, [session]); // Run when session changes

	return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

// Custom hook to access the context in any component
export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUserContext must be used within a UserProvider");
	}
	return context;
};
