import { createSlice } from '@reduxjs/toolkit';

import { fetchSymbols } from './thunks';

interface InitialState {
	selectedSymbol: string | null,
	isLoading: boolean,
	error: any,
	availableSymbols: { [key: string]: string }[]
}

const initialState: InitialState = {
	selectedSymbol: null,
	isLoading: false,
	error: null,
	availableSymbols: []
};

const slice = createSlice({
	name: 'tickerSymbol',
	initialState,
	reducers: {
		setSymbol: (state, action) => {
			state.selectedSymbol = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchSymbols.fulfilled, (state, action) => {
			state.availableSymbols = action.payload;
		});

		builder.addCase(fetchSymbols.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});

		builder.addCase(fetchSymbols.rejected, (state, payload) => {
			state.isLoading = false;
			state.error = payload?.error;
		});
	},
});

export const { setSymbol} = slice.actions;
export default slice.reducer;
