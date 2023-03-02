import { createTheme } from '@mui/material/styles';

// --> theme colors for Material UI Components
const theme = createTheme({
	palette: {
		primary: {
			main: '#52758a',
		},
		light: {
			main: '#ababab',
		},

		secondary: {
			main: '#90d2d2',
		},
		warning: {
			main: '#a22929',
		},
	},
});

export default theme;
