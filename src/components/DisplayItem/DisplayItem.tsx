import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { ItemWrapper } from '../ItemWrapper';
import { IconButton, Typography } from '@mui/material';
import { ItemState } from '@/types';

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
	const [itemState, setItemState] = React.useState<ItemState>('set');

	return (
		<ItemWrapper
			id={`skill-display-${position}`}
			draggable={true}
			// isSet={true}
			itemState={itemState}
			style={{ cursor: 'grab' }}
			// onClick={onClick}
		>
			<Typography>
				{position}. {name}
			</Typography>
			<IconButton
				color="inherit"
				onClick={() => {
          // setItemState('disabled');
					onRemove();
				}}
				sx={{ padding: 0 }}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</ItemWrapper>
	);
};
