import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from '../../utils/apiClient';

export const fetchTimeSeries = createAsyncThunk(
	'stock/fetchTimeSeries',
	async (payload: { function: string, symbol: string, interval: string, outputSize?: string }) => {
		const query = [
			`function=${payload.function}`,
			`symbol=${payload.symbol}`,
			`interval=${payload.interval}`,
		];
		if (payload.outputSize) {
			query.push(`outputsize=${payload.outputSize}`)
		}
		const response = await ApiClient({
			url: query.join('&'),
			method: 'GET',
		});
		const data = response[`Time Series (${payload.interval})`];
		return data;
	}
);

export const fetchQuote = createAsyncThunk(
	'stock/fetchQuote',
	async (payload: { symbol: string }) => {
		const query = [
			`function=GLOBAL_QUOTE`,
			`symbol=${payload.symbol}`,
		];
		const response = await ApiClient({
			url: query.join('&'),
			method: 'GET',
		});
		const data = response['Global Quote'];
		return data;
	}
);
