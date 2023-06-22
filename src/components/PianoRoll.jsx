import React from "react";
import {
	Box,
	Typography,
	Button,
	Slider,
	FormControl,
	Input,
} from "@mui/material";
import { useState, useEffect } from "react";
const PianoRoll = ({ sendData }) => {
	const [patterns, setPatterns] = useState([]);
	const [pianoRoll, setPianoRoll] = useState([]);
	const [dimensions, setDimensions] = useState(27);
	const [sliderVal, setSliderVal] = useState(9);

	const noteData = [
		{
			note: "C",
			noteLength: "8n",
		},
		{
			note: "Db",
			noteLength: "8n",
		},

		{
			note: "D",
			noteLength: "8n",
		},
		{
			note: "Eb",
			noteLength: "8n",
		},
		{
			note: "E",
			noteLength: "8n",
		},
		{
			note: "F",
			noteLength: "8n",
		},
		{
			note: "Gb",
			noteLength: "8n",
		},
		{
			note: "G",
			noteLength: "8n",
		},
		{
			note: "Ab",
			noteLength: "8n",
		},
		{
			note: "A",
			noteLength: "8n",
		},
		{
			note: "Bb",
			noteLength: "8n",
		},
		{
			note: "B",
			noteLength: "8n",
		},
	];

	useEffect(() => {
		let loadArr = [];
		for (let i = 1; i < 8; ++i) {
			for (let x of noteData) {
				let toString = `${noteData[x]}` + i;
				let rollObject = {
					note: x.note + i,
					activeUnits: Array.from({ length: 128 }, () => ({
						isActive: false,
					})),
				};
				loadArr.push(rollObject);
			}
		}
		setPianoRoll(loadArr);
	}, []);

	const changeUnitStateMouseOver = (e, note, index) => {
		if (e.buttons !== 0) {
			e.preventDefault();
			console.log(note, index);
			let tempRoll = pianoRoll;
			let isFound = tempRoll.find((item) => item.note === note);
			console.log(isFound);
			if (isFound) {
				const indexOf = tempRoll.indexOf(isFound);
				console.log(indexOf);
				console.log(tempRoll[indexOf].activeUnits[index]);
				tempRoll[indexOf].activeUnits[index].isActive =
					!tempRoll[indexOf].activeUnits[index].isActive;
				console.log(tempRoll[indexOf].activeUnits[index]);
			}
			setPianoRoll(tempRoll);
			let findId = (note + index).toString();
			let changeUnitColor = document.getElementById(findId);
			console.log(changeUnitColor);
			{
				e.buttons === 1
					? (changeUnitColor.style.background =
							"linear-gradient(to right, #c8fedc, #4ADEDE)")
					: (changeUnitColor.style.backgroundColor = "white");
			}
			{
				e.buttons === 2
					? (changeUnitColor.style.background = "white")
					: (changeUnitColor.style.backgroundColor =
							"linear-gradient(to right, #c8fedc, #4ADEDE)");
			}
			console.log(pianoRoll);
		}
	};
	const changeUnitStateElse = (e, note, index) => {
		e.preventDefault();
		console.log(note, index);
		let tempRoll = pianoRoll;
		let isFound = tempRoll.find((item) => item.note === note);
		console.log(isFound);
		if (isFound) {
			const indexOf = tempRoll.indexOf(isFound);
			console.log(indexOf);
			console.log(tempRoll[indexOf].activeUnits[index]);
			tempRoll[indexOf].activeUnits[index].isActive =
				!tempRoll[indexOf].activeUnits[index].isActive;
			console.log(tempRoll[indexOf].activeUnits[index]);
		}
		setPianoRoll(tempRoll);
		let findId = (note + index).toString();
		let changeUnitColor = document.getElementById(findId);
		console.log(changeUnitColor);
		{
			e.button === 0
				? (changeUnitColor.style.background =
						"linear-gradient(to right, #c8fedc, #4ADEDE)")
				: (changeUnitColor.style.backgroundColor = "white");
		}
		{
			e.button === 2
				? (changeUnitColor.style.background = "white")
				: (changeUnitColor.style.backgroundColor = "white");
		}
		console.log(pianoRoll);
	};

	const changeDim = (value) => {
		setDimensions(value);
	};

	const handleSendActiveUnits = () => {
		pianoRoll.forEach((item, index) => {
			const trueIndices = item.activeUnits.reduce(
				(indices, unit, unitIndex) => {
					if (unit.isActive) {
						indices.push(unitIndex);
					}
					return indices;
				},
				[]
			);

			sendData(item.note, trueIndices);
		});
	};
	const handleDrag = (e) => {
		e.preventDefault();
	};

	return (
		<Box
			display="flex"
			flexDirection="column-reverse"
			width="100%"
			justifyContent="center"
			onContextMenu={(e) => e.preventDefault()}
			sx={{
				background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
				color: "#c8fedc", // Change the color to your desired color
			}}
		>
			{pianoRoll.map((item, index) => {
				return (
					<Box
						key={index}
						display="flex"
						flexDirection="row"
						width="100%"
						onDrag={handleDrag}
						onClick={handleDrag}
						onMouseDown={handleDrag}
						onMouseUp={handleDrag}
						sx={{
							background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
							color: "#c8fedc", // Change the color to your desired color
						}}
					>
						<Box width="20px" marginRight="15px" marginLeft="15px">
							<Typography
								onDrag={handleDrag}
								onClick={handleDrag}
								onMouseDown={handleDrag}
								onMouseUp={handleDrag}
								width="20px"
								height="10px"
								color="#4ADEDE"
								sx={{
									userSelect: "none",
								}}
							>
								{item.note}
							</Typography>
						</Box>
						{item.activeUnits.map((unit, indexOfUnit) => {
							let isActive = unit.isActive;
							let uniqueId = (item.note + indexOfUnit).toString();
							return (
								<Box
									width="80%"
									key={indexOfUnit}
									onDrag={handleDrag}
									onClick={handleDrag}
									onMouseDown={handleDrag}
									onMouseUp={handleDrag}
								>
									{" "}
									<Box
										s
										width={`${dimensions}px`}
										height={`${dimensions}px`}
										border="1px solid gray"
										backgroundColor="white"
										id={uniqueId}
										onMouseOver={(e) =>
											changeUnitStateMouseOver(e, item.note, indexOfUnit)
										}
										onClick={(e) =>
											changeUnitStateElse(e, item.note, indexOfUnit)
										}
										onContextMenu={(e) =>
											changeUnitStateElse(e, item.note, indexOfUnit)
										}
									></Box>
								</Box>
							);
						})}
					</Box>
				);
			})}
			<Box
				width="100%"
				flexDirection="column"
				display="flex"
				justifyContent="center"
				sx={{
					background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
					color: "#c8fedc", // Change the color to your desired color
				}}
			>
				<Slider
					onChange={(event, value) => changeDim(value)}
					min={27}
					max={90}
					value={dimensions}
					sx={{
						background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
						color: "#c8fedc", // Change the color to your desired color
					}}
				/>
				<Button
					sx={{
						background: "linear-gradient(to right, #c8fedc, #4ADEDE)",
						color: "#c8fedc", // Change the color to your desired color
					}}
					onClick={handleSendActiveUnits}
				>
					Send
				</Button>
			</Box>
		</Box>
	);
};

export default PianoRoll;
