import type { QuizType } from "@/Types/Project";
import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";




interface AppContextValue {
	Quiz: QuizType | null,
	setQuiz: Dispatch<SetStateAction<QuizType | null>>
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
	const [Quiz, setQuiz] = useState<QuizType | null>(null)

	return (
		<AppContext.Provider
			value={{
				Quiz,
				setQuiz
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export default function Data() {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within an AppProvider");
	}
	return context;
}
