import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import BaseLayout from './layouts/BaseLayout';
import { TimeSeries } from './pages/timeSeries';
import { Quote } from './pages/quote';

const App = () => {
	return (
		<BrowserRouter basename={'/'}>
			<BaseLayout>
				<Routes>
					<Route path="/" element={<Navigate to="/time-series" />} />
					<Route path="/time-series" element={<TimeSeries />} />
					<Route path="/quote" element={<Quote />} />
				</Routes>
			</BaseLayout>
		</BrowserRouter>
);
};

export default App;
