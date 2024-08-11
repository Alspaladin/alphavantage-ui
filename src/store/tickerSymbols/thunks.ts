import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from '../../utils/apiClient';

export const fetchSymbols = createAsyncThunk(
	'symbols/fetch',
	async (payload: { keywords: string }) => {
		const query = [
			`function=SYMBOL_SEARCH`,
			`keywords=${payload.keywords}`,
		];
		const response = await ApiClient({
			url: query.join('&'),
			method: 'GET',
		});
		const data = response['bestMatches'];
		console.log('data', data, response);
		return data;
	}
);
