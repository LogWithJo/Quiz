import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Questions from "./Pages/Questions/Questions";
import Score from "./Pages/Score/Score";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Questions" element={<Questions />} />
				<Route path="/Score" element={<Score />} />
			</Routes>
		</div>
	);
}

export default App;
