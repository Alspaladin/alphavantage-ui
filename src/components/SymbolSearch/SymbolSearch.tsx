import React from 'react';
import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchSymbols } from '../../store/tickerSymbols/thunks';
import { setSymbol } from '../../store/tickerSymbols/slice';

export function SymbolSearch() {
	const tickerSymbolsState = useAppSelector((state) => state.tickerSymbols);
	const [searchValue, setSearchValue] = useState('');
	const [prevSearch, setPrevSearch] = useState<string>('');
	const dispatch = useAppDispatch();

	const debouncedSearchSymbols = useCallback((search: string) => {
		dispatch(fetchSymbols({ keywords: search }));
	}, [dispatch]);

	const debouncedDispatch = useMemo(() => debounce(debouncedSearchSymbols, 500), [debouncedSearchSymbols]);

	useEffect(() => {
		if (!searchValue || prevSearch === searchValue) {
			return;
		}
		debouncedDispatch(searchValue);
	}, [searchValue, prevSearch]);

	const tickerOptions = useMemo(() => {
		if (!tickerSymbolsState.availableSymbols || tickerSymbolsState.availableSymbols.length < 1) {
			return [];
		}
		return tickerSymbolsState.availableSymbols.map(symbol => {
			return symbol['1. symbol'];
		})
	}, [tickerSymbolsState.availableSymbols]);

	const setSelectedTicker = useCallback((value: string | null) => {
		setPrevSearch(value || '');
		dispatch(setSymbol(value));
	}, []);

	return (
		<Stack
			direction={'row'}
			alignItems={'center'}
			spacing={1}
		>
			<Typography>Please search and select ticker</Typography>
			<Autocomplete
				options={tickerOptions}
				value={searchValue}
				selectOnFocus={false}
				sx={{ width: 300 }}
				onChange={(event: any, newValue: string | null) => {
					setSelectedTicker(newValue);
				}}
				onInputChange={(event: any, newValue: string | null) => {
					setSearchValue(newValue || '');
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search input"
						InputProps={{
							...params.InputProps,
							type: 'search',
						}}
					/>
				)}
			/>
		</Stack>
	)
}
