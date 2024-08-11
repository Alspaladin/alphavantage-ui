import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
	Box, MenuItem,
	Paper, Select, Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTimeSeries } from '../../store/stock/thunks';
import { SymbolSearch } from '../../components/SymbolSearch';

import styles from '../quote/index.module.scss';

const SERIES_FUNCTIONS: { [key: string]: string } = {
	'TIME_SERIES_INTRADAY': 'Interday',
	'TIME_SERIES_DAILY': 'Daily',
	'TIME_SERIES_DAILY_ADJUSTED': 'Daily adjusted',
	'TIME_SERIES_WEEKLY': 'Weekly',
	'TIME_SERIES_WEEKLY_ADJUSTED': 'Weekly adjusted',
	'TIME_SERIES_MONTHLY': 'Monthly',
	'TIME_SERIES_MONTHLY_ADJUSTED': 'Monthly adjusted',
};

const SERIES_INTERVALS: { [key: string]: string } = {
	'1min': '1 minute',
	'5min': '5 minutes',
	'15min': '15 minutes',
	'30min': '30 minutes',
	'60min': '60 minutes',
};

const SERIES_OUTPUT_SIZE: { [key: string]: string } = {
	'compact': 'Compact',
	'full': 'Full',
};

export function TimeSeries() {
	const dispatch = useAppDispatch();
	const tickerSymbolsState = useAppSelector((state) => state.tickerSymbols);
	const stockData = useAppSelector((state) => state.stockData);

	const [selectedFunction, setSelectedFunction] = useState<string>('TIME_SERIES_INTRADAY');
	const [selectedInterval, setSelectedInterval] = useState<string>('60min');
	const [selectedOutputSize, setSelectedOutputSize] = useState<string>('compact');

	const onFunctionChange = useCallback((event: SelectChangeEvent) => {
		const newValue = event.target.value && SERIES_FUNCTIONS[event.target.value] ? event.target.value : undefined;
		if (newValue) {
			setSelectedFunction(newValue);
		}
	}, []);

	const onIntervalChange = useCallback((event: SelectChangeEvent) => {
		const newValue = event.target.value && SERIES_INTERVALS[event.target.value] ? event.target.value : undefined;
		if (newValue) {
			setSelectedInterval(newValue);
		}
	}, []);

	const onOutputSizeChange = useCallback((event: SelectChangeEvent) => {
		const newValue = event.target.value && SERIES_OUTPUT_SIZE[event.target.value] ? event.target.value : undefined;
		if (newValue) {
			setSelectedOutputSize(newValue);
		}
	}, []);

	useEffect(() => {
		if (tickerSymbolsState.selectedSymbol) {
			dispatch(
				fetchTimeSeries({
					function: selectedFunction,
					interval: selectedInterval,
					symbol: tickerSymbolsState.selectedSymbol,
					outputSize: selectedOutputSize,
				})
			)
		}
	}, [tickerSymbolsState.selectedSymbol, selectedFunction, selectedInterval, selectedOutputSize]);

	const timeSeriesData = useMemo(() => {
		return stockData.timeSeries;
	}, [stockData.timeSeries]);

	return (
		<Box className={styles.container}>
			<SymbolSearch />
			<Stack sx={{ mt: 4 }} direction={'row'} spacing={1} alignItems={'center'}>
				<Typography>Select function, interval and output size</Typography>
				<Select
					value={selectedFunction}
					label="Function"
					onChange={onFunctionChange}
				>
					{Object.entries(SERIES_FUNCTIONS).map(([key, title]) => {
						return (<MenuItem key={key} value={key}>{title}</MenuItem>);
					})}
				</Select>
				<Select
					value={selectedInterval}
					label="Interval"
					onChange={onIntervalChange}
				>
					{Object.entries(SERIES_INTERVALS).map(([key, title]) => {
						return (<MenuItem key={key} value={key}>{title}</MenuItem>);
					})}
				</Select>
				<Select
					value={selectedOutputSize}
					label="Output size"
					onChange={onOutputSizeChange}
				>
					{Object.entries(SERIES_OUTPUT_SIZE).map(([key, title]) => {
						return (<MenuItem key={key} value={key}>{title}</MenuItem>);
					})}
				</Select>
			</Stack>
			<Typography>Time series data</Typography>
			{timeSeriesData ? (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 300 }} aria-label="time series data">
						<TableHead>
							<TableRow>
								<TableCell>Date</TableCell>
								<TableCell>Open</TableCell>
								<TableCell>High</TableCell>
								<TableCell>Low</TableCell>
								<TableCell>Close</TableCell>
								<TableCell>Volume</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{Object.entries(timeSeriesData).map((pair) => (
								<TableRow key={pair[0]}>
									<TableCell component="th" scope="row">{pair[0]}</TableCell>
									<TableCell>{pair[1]['1. open']}</TableCell>
									<TableCell>{pair[1]['2. high']}</TableCell>
									<TableCell>{pair[1]['3. low']}</TableCell>
									<TableCell>{pair[1]['4. close']}</TableCell>
									<TableCell>{pair[1]['5. volume']}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<Typography>No Data</Typography>
			)}
		</Box>
	)
}
