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
import { useDispatch, useSelector } from "react-redux";
import {
	modifyInstrument,
	addInstrument,
	removeInstrument,
} from "../state/dataSlice.js";
import RemoveIcon from "@mui/icons-material/Remove";
const Channel = ({ channelName, updatePlaylist, channelIndex }) => {
	const channels = useSelector((state) => state.channels);
	const dispatch = useDispatch();

	const [instruments, setInstruments] = useState(
		channels[channelIndex].instruments
	);
	const [selectedValue, setSelectedValue] = useState("");
	const handleChange = (event) => {
		setSelectedValue(event.target.value);
	};
	const handleAddInstrument = () => {
		console.log(selectedValue);
		if (selectedValue !== "") {
			dispatch(
				addInstrument({
					channelIndex,
					data: { instrument: selectedValue, noteData: [] },
				})
			);
			setSelectedValue("");
			setInstruments(() => channels[channelIndex].instruments);
		}
	};

	const handleRemoveInstrument = (instrumentIndex) => {
		console.log(instrumentIndex);
		dispatch(removeInstrument({ channelIndex, instrumentIndex }));
		setInstruments(() => channels[channelIndex].instruments);
	};

	const handleUpdateInstrumentRollData = (data) => {
		console.log(data);
		updatePlaylist(index, data);
	};
	useEffect(() => {
		setInstruments(channels[channelIndex]?.instruments ?? []);
	}, [channels, channelIndex]);

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
						onClick={handleAddInstrument}
						sx={{
							background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
							color: "white", // Change the color to your desired color
						}}
					>
						<AddBoxIcon />
					</Button>
				</FormControl>
			</Box>
			{instruments.map((item, instIndex) => {
				return (
					<Box
						justifyContent="center"
						alignItems="center"
						display="flex"
						flexDirection="column"
					>
						<Instrument
							type={item.instrument}
							updateChannel={handleUpdateInstrumentRollData}
							key={instIndex}
							instrumentIndex={instIndex}
						/>
						<Button
							onClick={() => handleRemoveInstrument(instIndex)}
							sx={{
								background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
								color: "pink", // Change the color to your desired color
							}}
						>
							<RemoveIcon />
						</Button>
					</Box>
				);
			})}
		</Box>
	);
};

export default Channel;
