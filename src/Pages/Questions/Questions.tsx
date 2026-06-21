/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Data from "@/context/AppContext";
import Header from "../Home/Header";
import ActionButtons from "./ActionButtons";

function Questions() {
	const { Quiz, setQuiz } = Data();
	const [color, setColor] = useState<string>("");

	React.useEffect(() => {
		const get = () => {
			setQuiz(JSON.parse(sessionStorage.getItem("data") || "[]"));
		};
		if (!Quiz) {
			get();
		}
	}, [Quiz]);

	return (
		<div className="h-screen flex flex-col gap-10">
			<div>
				<Header type={"Que"} />
				<div className="flex flex-col gap-10">
					<div className="flex flex-col justify-center items-center w-full p-6">
						<div className="p-5 shadow-2xl text-2xl rounded-full">
							{`${Quiz?.questionIndex}/${Quiz?.numberOfQuestions}`}
						</div>
						<div className="p-5 shadow-2xl text-2xl rounded-full">
							{Quiz?.data?.[Quiz.questionIndex]?.question}
						</div>
					</div>
					<div className="grid grid-cols-1 p-10 md:grid-cols-2 md:px-20 gap-4">
						{Quiz?.data?.[Quiz?.questionIndex]?.choices.map((choice, i) => (
							<Button
								className={`w-full disabled:opacity-100 flex justify-center items-center p-2 shadow-2xl rounded-full cursor-pointer  hover:shadow-xl ${color === choice ? (Quiz.data[Quiz.questionIndex].isCorrect ? "bg-green-600" : "bg-red-600") : ""}`}
								onClick={() => {
									setColor(choice);
									setQuiz((prev) =>
										prev
											? {
													...prev,
													score:
														prev?.data?.[prev?.questionIndex].answer === choice
															? prev.score + 1
															: prev.score,
													data: prev.data.map((oldData, i) => {
														return {
															...oldData,
															isClicked: i === prev.questionIndex,
															isCorrect: oldData.answer === choice,
														};
													}),
												}
											: null,
									);
								}}
								key={i + 1}
								disabled={Quiz?.data?.[Quiz?.questionIndex]?.isClicked || false}
							>
								{choice}
							</Button>
						))}
					</div>
				</div>
			</div>
			<ActionButtons />
		</div>
	);
}

export default Questions;
