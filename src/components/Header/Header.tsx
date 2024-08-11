import React from 'react';
import {
	AppBar,
	Box,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Stack,
	Toolbar,
	Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.scss';

export function Header() {
	const [isOpened, setIsOpened] = React.useState(false);

	const navigate = useNavigate();

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}
			setIsOpened(open);
		};


	return (
		<AppBar className={styles.container} color='transparent' position='static'>
			<Toolbar className={styles.appBar}>
				<Stack direction={'row'} alignItems='center'>
					<IconButton onClick={toggleDrawer(true)}>
						<MenuIcon className={styles.icon} />
					</IconButton>
					<Drawer
						anchor="left"
						open={isOpened}
						onClose={toggleDrawer(false)}
						className={styles.drawerContainer}
					>
						<Box
							onClick={toggleDrawer(false)}
							onKeyDown={toggleDrawer(false)}
							className={styles.drawerWrapper}
						>
							<List>
								<ListItem key="drawer-time-series">
									<ListItemButton onClick={() => navigate('/time-series')}>
										<ListItemText className={styles.link} primary={'Time Series'}/>
									</ListItemButton>
								</ListItem>
								<ListItem key="drawer-quote">
									<ListItemButton onClick={() => navigate('/quote')}>
										<ListItemText className={styles.link} primary={'Quote'}/>
									</ListItemButton>
								</ListItem>
							</List>
						</Box>
					</Drawer>
					<Typography className={styles.title} variant={ 'h6' }>
						Alpha Vantage API
					</Typography>
				</Stack>
			</Toolbar>
		</AppBar>
	)
}
