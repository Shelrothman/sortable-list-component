import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { ItemState } from '@/types';

// todo: set | disabled | active to be just one flag instead of multiple props

// export type ItemState = 'set' | 'disabled' | 'active';

type ItemWrapperProps = {
	children: React.ReactNode;
	// isSet: boolean;
	// disabled?: boolean;
	itemState: ItemState;
} & BoxProps;

const getBgColor = (itemState: ItemState) => {
	if (itemState === 'disabled') return 'grey';
	if (itemState === 'set') return '#03103b';
	return '#ffffffbb'; // active one
};

const getBorder = (itemState: ItemState) => {
	if (itemState === 'disabled' || itemState === 'set')
		return '1px solid #03103b';
	return '1px solid #03103b';
};

export const ItemWrapper: React.FC<ItemWrapperProps> = ({
	children,
	// isSet,
	// disabled = false,
	itemState,
	...rest
}) => {
	return (
		<Box
			{...rest}
			sx={{
				width: '100%',
				border: getBorder(itemState),
				bgcolor: getBgColor(itemState),
				color: itemState === 'set' ? '#fff' : '#03103b',
				display: 'flex',
				cursor: itemState === 'active' ? 'pointer' : 'initial',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: '0.75rem 0.5rem',
				borderRadius: '6px',
				opacity: itemState === 'disabled' ? 0.5 : 1,
			}}
		>
			{children}
		</Box>
	);
};
