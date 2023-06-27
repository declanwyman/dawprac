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
	Drawer,
	MenuItem,
	Select,
	InputLabel,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState, useEffect } from "react";
import * as Tone from "tone";
import Instrument from "./Instrument.jsx";
import Channel from "./Channel.jsx";
import AddBoxIcon from "@mui/icons-material/AddBox";
const PlayList = () => {
	const [channels, setChannels] = useState([
		{ name: "channel 1", instruments: [] },
	]);
	const [open, setOpen] = useState(false);

	const handleAddChannel = () => {
		setChannels((prev) => [
			...prev,
			{ name: "channel " + (channels.length + 1), instruments: [] },
		]);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleUpdateChannels = (data) => {
		console.log(data);
	};

	return (
		<Box
			justifyContent="center"
			alignItems="center"
			display="flex"
			flexDirection="row"
		>
			<Button onClick={handleOpen} width="100px">
				Channels
			</Button>
			<Drawer open={open}>
				<Button
					onClick={handleClose}
					sx={{
						background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
						color: "#c8fedc", // Change the color to your desired color
					}}
				>
					<ArrowForwardIcon />
				</Button>
				<Box
					justifyContent="center"
					alignItems="center"
					display="flex"
					flexDirection="column"
				>
					{channels.map((item, index) => {
						return (
							<Channel
								channelName={item.name}
								updatePlaylist={handleUpdateChannels}
								key={index}
							/>
						);
					})}
				</Box>
				<Button
					onClick={handleAddChannel}
					sx={{
						background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
						color: "#c8fedc", // Change the color to your desired color
					}}
				>
					Add Channel
					<AddBoxIcon />
				</Button>
			</Drawer>
		</Box>
	);
};

export default PlayList;
