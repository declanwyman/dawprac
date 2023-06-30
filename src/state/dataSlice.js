import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	channels: [
		{
			instruments: [{ instrument: "PolySynth", noteData: [] }],
		},
	],
};

export const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		addChannel: (state, action) => {
			state.channels.push(action.payload);
			console.log(state.channels);
		},
		modifyChannel: (state, action) => {
			let findItem = channels[action.payload.index].instruments.find(
				(inst) => inst.instrument === action.payload.data.instrument
			);
			findItem = action.payload.data;
			console.log(channels);
		},
		removeChannel: (state, action) => {
			state.channels.splice(action.payload, 1);
			console.log(state.channels);
		},
		modifyInstrument: (state, action) => {
			state.channels[action.payload.channelIndex].instruments[
				action.payload.instrumentIndex
			] = action.payload.data;
		},
		addInstrument: (state, action) => {
			state.channels[action.payload.channelIndex].instruments.push(
				action.payload.data
			);
			console.log(state.channels);
		},
		removeInstrument: (state, action) => {
			console.log(action.payload.instrumentIndex);
			state.channels[action.payload.channelIndex].instruments.splice(
				action.payload.instrumentIndex,
				1
			);
		},
	},
});

export const {
	removeChannel,
	modifyChannel,
	addChannel,
	modifyInstrument,
	addInstrument,
	removeInstrument,
} = dataSlice.actions;
export default dataSlice.reducer;
