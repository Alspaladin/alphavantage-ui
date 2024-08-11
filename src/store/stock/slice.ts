import { createSlice } from '@reduxjs/toolkit';

import { fetchQuote, fetchTimeSeries } from './thunks';

interface InitialState {
	timeSeries: { [date: string]: { [key: string]: string } } | null,
	quote: { [key: string]: string } | null,
}

const initialState: InitialState = {
	timeSeries: null,
	quote: null,
};

const slice = createSlice({
	name: 'stockData',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTimeSeries.fulfilled, (state, action) => {
				state.timeSeries = action.payload;
			});
		builder
			.addCase(fetchQuote.fulfilled, (state, action) => {
				state.quote = action.payload;
			});
	},
});

export default slice.reducer;
