import { useState } from "react";
import { Box, Dialog, DialogContent, Button } from "@mui/material";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PianoRoll from "./components/PianoRoll.jsx";
import Instrument from "./components/Instrument.jsx";
import PlayList from "./components/PlayList.jsx";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PlayList />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
