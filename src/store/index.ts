import { configureStore } from '@reduxjs/toolkit';

import tickerSymbols from './tickerSymbols/slice';
import stockData from './stock/slice';

export const store= configureStore({
	reducer: {
		tickerSymbols,
		stockData
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
