import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { ItemWrapper } from '../ItemWrapper';
import { IconButton, Typography } from '@mui/material';

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
		<ItemWrapper
			id={`skill-display-${position}`}
			draggable={true}
			itemState={'set'}
			style={{ cursor: 'grab' }}
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
		</ItemWrapper>
	);
};
