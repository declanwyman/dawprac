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
import { useDispatch, useSelector } from "react-redux";
import {
	addChannel,
	modifyChannel,
	removeChannel,
} from "../state/dataSlice.js";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
const PlayList = () => {
	const channels = useSelector((state) => state.channels);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const handleAddChannel = () => {
		dispatch(
			addChannel({ name: "channel " + (channels.length + 1), instruments: [] })
		);
	};
	const handleRemoveChannel = (index) => {
		dispatch(removeChannel(index));
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleUpdateChannels = (index, data) => {
		console.log(index, data);
		dispatch(modifyChannel({ index, data }));
	};

	useEffect(() => {
		console.log(channels);
	}),
		[channels];

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
							<Box
								justifyContent="center"
								alignItems="center"
								display="flex"
								flexDirection="column"
								key={index}
								margin="4px"
							>
								<Channel
									channelName={"channel " + (index + 1)}
									updatePlaylist={handleUpdateChannels}
									key={index}
									channelIndex={index}
								/>
								<Button
									onClick={(index) => handleRemoveChannel(index)}
									sx={{
										background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
										color: "pink", // Change the color to your desired color
									}}
								>
									<PlaylistRemoveIcon />
								</Button>
							</Box>
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
