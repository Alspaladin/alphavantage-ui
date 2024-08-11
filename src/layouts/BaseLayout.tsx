import React, { PropsWithChildren } from "react";
import { Box } from '@mui/material';

import { Header } from '../components/Header/Header';

export default function BaseLayout (props: PropsWithChildren) {
	return (
		<Box>
			<Header />
			{props.children}
		</Box>
	)
}
