/* eslint-disable react-hooks/exhaustive-deps */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import React from "react";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Data from "@/context/AppContext";

function ActionButtons() {
	const { Quiz, setQuiz } = Data();
	const navigate = useNavigate();

	const handleClick = React.useCallback(() => {
		if (!Quiz?.data[Quiz?.questionIndex]?.isClicked) return;
		// setColor({ title: "", correct: "" });
		setQuiz((prev) =>
			prev
				? {
						...prev,
						questionIndex: prev?.questionIndex + 1,
					}
				: null,
		);

		if (
			Quiz?.questionIndex ===
			((Quiz?.data?.length && Quiz?.data?.length - 1) ?? 0)
		) {
			navigate("/Score");
			return;
		}
	}, [Quiz, navigate]);

	React.useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Enter") {
				handleClick();
			}
		}
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleClick]);
	return (
		<div className="flex w-full justify-between items-center p-10">
			<Button
				className="flex justify-center items-center gap-4 p-5"
				onClick={() => {
					navigate("/");
					setQuiz(null);
				}}
			>
				<div>back home</div>
			</Button>
			<Button
				className="flex group justify-center items-center gap-4 p-5 relative"
				onClick={handleClick}
			>
				<div>next</div>
				<MdNavigateNext />
				<div className="absolute top-full text-white bg-black opacity-60 px-0.5 hidden group-hover:flex text-sm ">
					press "Enter"
				</div>
			</Button>
		</div>
	);
}

export default ActionButtons;
