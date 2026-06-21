// export type AppContextType = {
// 	id: number;
// 	question: string;
// 	choices: string[];
// 	answer: string;
// 	priority: string;
// };

export interface dataType {
	id: number;
	question: string;
	choices: string[];
	answer: string;
	priority: string;
	isClicked: boolean | null;
	isCorrect: boolean | null;
}

export type catogries =
	| "math"
	| "programming"
	| "science"
	| "cooking"
	| "gym"
	| "movie";
export type priority = "hard" | "easy" | "medium";

export const priorities = {
	hard: "hard",
	easy: "easy",
	medium: "medium",
} as const;

export type priorities = (typeof priorities)[keyof typeof priorities];

export interface QuizType {
	catogery: catogries;
	priority: priority;
	numberOfQuestions: number;
	questionIndex: number;
	score: number;
	data: dataType[];
}
