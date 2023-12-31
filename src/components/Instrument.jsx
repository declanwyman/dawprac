import React from "react";

import {
	Box,
	Typography,
	Button,
	Slider,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Dialog,
	DialogContent,
} from "@mui/material";
import { useState, useEffect } from "react";
import * as Tone from "tone";
import PianoRoll from "./PianoRoll.jsx";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { useDispatch, useSelector } from "react-redux";
import { modifyInstrument } from "../state/dataSlice.js";
const Instrument = ({ type, updateChannel }) => {
	const channels = useSelector((state) => state.channels);
	const dispatch = useDispatch();
	const instType = type;
	Tone.Transport.bpm.value = 120; // Set the BPM to 120
	const synth = new Tone.PolySynth().toDestination();
	const [instrument, setInstrument] = useState(type);
	const [open, setOpen] = useState(false);
	const [patterns, setPatterns] = useState([]);

	const testFinal = [];

	const collectPatterns = (data) => {
		console.log("data", data);
		setPatterns(data);
		dispatch(modifyInstrument({}));
		updateChannel({ instrument: instType, data });
	};

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
			margin="5px"
		>
			<Box
				sx={{
					background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
					color: "white", // Change the color to your desired color
				}}
				margin="2px"
				padding="2px"
				width="50px"
			>
				<Typography>{type}</Typography>
			</Box>

			<Box
				justifyContent="center"
				alignItems="center"
				display="flex"
				flexDirection="row"
				margin="2px"
				padding="2px"
				borderColor="grey"
				borderRadius="10%"
			>
				<Button
					onClick={handleSchedule}
					sx={{
						background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
						color: "#c8fedc", // Change the color to your desired color
					}}
				>
					<PlayCircleFilledWhiteIcon />
				</Button>
				<PianoRoll sendData={collectPatterns} />
			</Box>
		</Box>
	);
};

export default Instrument;
