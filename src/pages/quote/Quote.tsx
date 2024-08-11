import React, { useEffect, useMemo } from 'react';
import {
	Box,
	Paper,
	Table, TableBody, TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchQuote } from '../../store/stock/thunks';
import { SymbolSearch } from '../../components/SymbolSearch';

import styles from './index.module.scss';

export function Quote() {
	const dispatch = useAppDispatch();
	const tickerSymbolsState = useAppSelector((state) => state.tickerSymbols);
	const stockData = useAppSelector((state) => state.stockData);

	useEffect(() => {
		if (tickerSymbolsState.selectedSymbol) {
			dispatch(
				fetchQuote({ symbol: tickerSymbolsState.selectedSymbol })
			)
		}
	}, [dispatch, tickerSymbolsState.selectedSymbol]);

	const quoteData = useMemo(() => {
		return stockData.quote || undefined;
	}, [stockData.quote]);

	return (
		<Box className={styles.container}>
			<SymbolSearch />
			<Typography>Quote data</Typography>
			{quoteData ? (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 300 }} aria-label="quote data">
						<TableHead>
							<TableRow>
								<TableCell>Key</TableCell>
								<TableCell>Value</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{Object.entries(quoteData).map((pair) => (
								<TableRow key={pair[0]}>
									<TableCell component="th" scope="row">{pair[0]}</TableCell>
									<TableCell>{pair[1]}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<Typography>No Data available</Typography>
			)}
		</Box>
	)
}
