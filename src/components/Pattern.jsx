import React from "react";

import {
	Box,
	Typography,
	Button,
	Slider,
	FormControl,
	Input,
	Dialog,
	DialogContent,
} from "@mui/material";
import { useState, useEffect } from "react";
import * as Tone from "tone";
import PianoRoll from "./PianoRoll.jsx";
const Pattern = ({ type }) => {
	Tone.Transport.bpm.value = 120; // Set the BPM to 120
	const synth = new Tone.PolySynth().toDestination();
	const [inistrument, setInstrument] = useState();
	const [open, setOpen] = useState(false);
	const [patterns, setPatterns] = useState([]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const testFinal = [];

	const collectPatterns = (note, indices) => {
		console.log(note, indices);
		let consecutiveIndices = [];
		for (let i = 0; i < indices.length; i++) {
			if (i < indices.length - 1 && indices[i] + 1 === indices[i + 1]) {
				consecutiveIndices.push(indices[i]);
			} else {
				consecutiveIndices.push(indices[i]);

				testFinal.push({ note, timeStamps: [consecutiveIndices] });
				consecutiveIndices = [];
			}
		}
		if (consecutiveIndices.length > 0) {
			console.log(consecutiveIndices);
		}
		setPatterns(testFinal);
	};
	console.log(patterns);

	const handleSchedule = () => {
		Tone.Transport.cancel();
		Tone.Transport.stop();
		Tone.Transport.position = 0;

		console.log(patterns);
		Tone.start().then(() => {
			for (let x of patterns) {
				console.log(x.timeStamps);
				if (x.timeStamps.length !== 0) {
					let duration = x.timeStamps.length / 32;
					let time = x.timeStamps[0] / 32;
					let note = x.note;
					Tone.Transport.schedule(() => {
						synth.triggerAttackRelease(note, duration);
						console.log(note, duration);
					}, time);
				}
			}
			Tone.Transport.start();
		});
	};

	// Start the transport

	return (
		<Box
			justifyContent="center"
			alignItems="center"
			display="flex"
			flexDirection="row"
			width="100%"
			height="100%"
			sx={{
				background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
			}}
		>
			<Button onClick={handleSchedule}>Play</Button>
			<Button onClick={handleOpen}>open</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="lrg"
				sx={{
					"& .MuiDialog-paper": {
						background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
					},
				}}
				width="100%"
				height="100%"
			>
				<DialogContent
					dividers
					sx={{
						"& .MuiDialog-paper": {
							background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
						},
					}}
					width="100%"
					height="100%"
				>
					<Box
						sx={{
							background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
						}}
						width="100%"
						height="100%"
					>
						<PianoRoll sendData={collectPatterns} width="100%" height="100%" />
					</Box>
				</DialogContent>
			</Dialog>
		</Box>
	);
};

export default Pattern;
