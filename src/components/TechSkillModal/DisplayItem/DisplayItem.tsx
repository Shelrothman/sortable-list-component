import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography, Box } from '@mui/material';

type DisplayItemProps = {
	onRemove: () => void;
	name: string;
	position: number;
};

/**
 * Displayed selected item.
 */
export const DisplayItem: React.FC<DisplayItemProps> = ({
	onRemove,
	name,
	position,
}) => {
	return (
		<Box
			id={`skill-display-${position}`}
			draggable={true}
			sx={{
				width: '100%',
				border: '1px solid #03103b',
				bgcolor: '#03103b',
				color: '#fff',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: '0.75rem 0.5rem',
				borderRadius: '6px',
				cursor: 'grab',
			}}
		>
			<Typography>
				{position}. {name}
			</Typography>
			<IconButton
				color="inherit"
				onClick={onRemove}
				sx={{
					padding: 0,
					'&:hover': {
						backgroundColor: 'rgba(85, 238, 169, 0.438)',
					},
				}}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</Box>
	);
};
