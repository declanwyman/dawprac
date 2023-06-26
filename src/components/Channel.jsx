import React from "react";

import {
	Box,
	Typography,
	Button,
	Slider,
	FormControl,
	Input,
	Select,
	MenuItem,
	InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import * as Tone from "tone";
import PianoRoll from "./PianoRoll.jsx";
import Instrument from "./Instrument.jsx";
import AddBoxIcon from "@mui/icons-material/AddBox";
const Channel = ({ channelName, updatePlaylist }) => {
	const chanskiName = channelName;
	const [instruments, setInstruments] = useState([
		{ instrument: "PolySynth", pianoRollData: [] },
	]);
	const [selectedValue, setSelectedValue] = useState("");
	const handleChange = (event) => {
		setSelectedValue(event.target.value);
	};
	const handleSubmit = () => {
		console.log(selectedValue);
		if (selectedValue !== "") {
			setInstruments((prev) => [...prev, { instrument: selectedValue }]);
			console.log(instruments);
		}

		setSelectedValue("");
	};

	const handleUpdateInstrumentRollData = (type, data) => {
		const tempInst = instruments;
		for (let x of tempInst) {
			if (x.instrument === type) {
				x.pianoRollData = data;
				return;
			}
		}
		setInstruments(tempInst);
		updatePlaylist(chanskiName, tempInst);
		console.log(tempInst);
	};

	return (
		<Box
			justifyContent="center"
			alignItems="center"
			display="flex"
			flexDirection="column"
			margin="5px"
			height="100%"
			width="200px"
		>
			<Typography
				margin="5px"
				fontSize="10px"
				sx={{
					background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
					color: "white", // Change the color to your desired color
				}}
			>
				{channelName}
			</Typography>

			<Box>
				<FormControl>
					<InputLabel id="dropdown-label"></InputLabel>
					<Select
						labelId="dropdown-label"
						id="dropdown-menu"
						value={selectedValue}
						onChange={handleChange}
					>
						<MenuItem value="PolySynth">PolySynth</MenuItem>
						<MenuItem value="Synth">Synth </MenuItem>
						<MenuItem value="FMSynth">FMSynth </MenuItem>
					</Select>
					<Button
						onClick={handleSubmit}
						sx={{
							background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
							color: "white", // Change the color to your desired color
						}}
					>
						<AddBoxIcon />
					</Button>
				</FormControl>
			</Box>
			{instruments.map((item, index) => {
				return (
					<Instrument
						type={item.instrument}
						updateChannel={handleUpdateInstrumentRollData}
						key={index}
					/>
				);
			})}
		</Box>
	);
};

export default Channel;
