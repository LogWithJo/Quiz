import type React from "react";
import { useEffect, useState } from "react";
import { BiMath } from "react-icons/bi";
import { CgGym } from "react-icons/cg";
import { IoIosCode } from "react-icons/io";
import { LuCookingPot } from "react-icons/lu";
import { MdMovieEdit, MdScience } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Data from "@/context/AppContext";
import {
	type catogries,
	type dataType,
	priorities,
	type priority,
} from "@/Types/Project";

const Datas: catogries[] = [
	"programming",
	"cooking",
	"gym",
	"movie",
	"science",
	"math",
];

type QuizBank = Record<catogries, Record<priority, dataType[]>>;

const icons: Record<catogries, React.ReactNode> = {
	programming: <IoIosCode />,
	cooking: <LuCookingPot />,
	gym: <CgGym />,
	movie: <MdMovieEdit />,
	science: <MdScience />,
	math: <BiMath />,
};

const priorityTypes = [
	{ title: priorities.easy, color: "bg-yellow-400" },
	{ title: priorities.medium, color: "bg-orange-400" },
	{ title: priorities.hard, color: "bg-red-400" },
];

function Cards() {
	const { setQuiz } = Data();
	const navigate = useNavigate();
	const [quizBank, setQuizBank] = useState<QuizBank | null>(null);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		let ignore = false;

		async function fetchData() {
			try {
				const res = await fetch(`${import.meta.env.BASE_URL}data.json`);
				const info = (await res.json()) as QuizBank;

				if (!ignore) {
					setQuizBank(info);
				}
			} catch (error) {
				console.error("Failed to load quiz data", error);
				setError(true);
			}
		}

		fetchData();
		return () => {
			ignore = true;
		};
	}, []);

	useEffect(() => {
		function set() {
			setError(false);
		}
		if (error) {
			toast("error happend");
			set();
		}
	});

	function startQuiz(subject: catogries, selectedPriority: priority) {
		if (!quizBank) return;
		const selectedData = quizBank?.[subject]?.[selectedPriority] ?? [];
		if (selectedData.length === 9) return;

		setQuiz({
			catogery: subject,
			priority: selectedPriority,
			questionIndex: 0,
			numberOfQuestions: selectedData.length,
			score: 0,
			data: selectedData,
		});

		sessionStorage.setItem(
			"data",
			JSON.stringify({
				catogery: subject,
				priority: selectedPriority,
				questionIndex: 0,
				numberOfQuestions: selectedData.length,
				score: 0,
				data: selectedData,
			}),
		);
		navigate("/Questions");
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-20 rounded-lg">
			{Datas.map((subject: catogries) => (
				<Card
					key={subject}
					className="bg-white relative p-4 shadow-md rounded-lg group"
				>
					<CardHeader className=" *:text-5xl flex justify-center items-center font-bold p-5 text-blue-800">
						{icons[subject]}
					</CardHeader>
					<CardContent className="flex justify-center items-center capitalize p-2">
						<div className="font-bold text-lg">{subject}</div>
					</CardContent>
					<div className="flex max-lg:justify-center max-lg:items-center gap-1 p-3 lg:-translate-y-1/2 lg:flex-col lg:-left-1/2 lg:absolute lg:top-1/2 capitalize lg:cursor-pointer lg transition-all lg:duration-300 lg:-left1/2 lg:group-hover:left-0">
						{priorityTypes.map((item: { title: priority; color: string }) => (
							<Button
								key={item.title}
								className={item.color}
								disabled={!quizBank}
								onClick={() => startQuiz(subject, item.title)}
							>
								{item.title}
							</Button>
						))}
					</div>
				</Card>
			))}
		</div>
	);
}

export default Cards;
