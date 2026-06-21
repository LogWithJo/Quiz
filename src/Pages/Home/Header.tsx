import { FaGithub } from "react-icons/fa";
import Data from "@/context/AppContext";

function Header({ type }: { type: string }) {
	const { Quiz } = Data();
	return (
		<header className="flex justify-between items-center p-4">
			<div className="font-bold px-4 py-2 shadow-lg text-2xl rounded-full">
				<div className="flex items-center gap-2">
					<div className="w-5 h-5">
						<img src={`${import.meta.env.BASE_URL}vite.svg`} alt="" />
					</div>
					<div>Youssef</div>
				</div>
			</div>
			<div className="font-bold text-2xl capitalize px-4 py-2 shadow-lg rounded-full hidden md:block">
				<div>quiz app</div>
			</div>
			<div className="font-bold text-2xl capitalize px-4 py-2 shadow-lg rounded-full">
				<div className="flex items-center justify-center gap-3">
					{type === "Que" ? (
						`score: ${Quiz?.score}/${Quiz?.numberOfQuestions}`
					) : (
						<a
							href="https://github.com/LogWithJo"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className='flex justify-center items-center flex-col'>
								<FaGithub />
								<div>github</div>
							</div>
						</a>
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;
