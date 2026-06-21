import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Data from "@/context/AppContext";

function Score() {
	const { Quiz, setQuiz } = Data();

	React.useEffect(() => {
		if (Quiz) return
		function set() {
			setQuiz(JSON.parse(localStorage.getItem("data") || "{}"))
		}
		set()
	}, [Quiz, setQuiz])

	return (
		<div className="flex h-screen flex-col justify-center items-center gap-8">
			<div
				className={`flex justify-center items-center flex-col capitalize text-3xl font-bold gap-4 ${((Quiz?.score || 0) / (Quiz?.numberOfQuestions || 0)) > 0.5 ? "text-green-600" : "text-red-600"}`}
			>
				<div>score</div>
				<div>
					{Quiz?.score} / {Quiz?.numberOfQuestions || 0}
				</div>
			</div>
			<div className="flex flex-col w-full p-10 gap-4 md:flex-row justify-center items-center">
				<Button>
					<Link to="/">go home</Link>
				</Button>
			</div>
		</div>
	);
}

export default Score;
