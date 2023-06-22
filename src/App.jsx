import { useState } from "react";
import { Box, Dialog, DialogContent, Button } from "@mui/material";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PianoRoll from "./components/PianoRoll.jsx";
import Channel from "./components/Channel.jsx";

function App() {
	return (
		<Box
			justifyContent="center"
			alignItems="center"
			display="flex"
			flexDirection="row"
			onContextMenu={(e) => (e.buttons !== 1 ? e.preventDefault() : null)}
			sx={{
				background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
			}}
		>
			<Channel type="PluckSynth" width="1500px" />
		</Box>
	);
}

export default App;
