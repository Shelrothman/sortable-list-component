import React from 'react';
import { Box, BoxProps } from '@mui/material';

type ItemWrapperProps = {
	children: React.ReactNode;
	isSet: boolean;
	disabled?: boolean;
} & BoxProps;

const getBgColor = (isSet: boolean, disabled: boolean) => {
	if (disabled) return 'grey';
	if (isSet) return '#03103b';
	// return '#666';
	return '#ffffffbb'; // active one
};

const getBorder = (isSet: boolean, disabled: boolean) => {
	if (disabled || isSet) return '1px solid #03103b';
	return '1px solid #03103b';
};

export const ItemWrapper: React.FC<ItemWrapperProps> = ({
	children,
	isSet,
	disabled = false,
	...rest
}) => {
	return (
		<Box
			{...rest}
			sx={{
				width: '100%',
				border: getBorder(isSet, disabled),
				bgcolor: getBgColor(isSet, disabled),
				color: isSet ? '#fff' : '#03103b',
				display: 'flex',
				cursor: !disabled && !isSet ? 'pointer' : 'initial',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: '0.75rem 0.5rem',
				borderRadius: '6px',
				opacity: disabled ? 0.5 : 1,

				// pickup: logic for disabled based on state of selected skills
				// show look as and be disabled if not the last one in list.
				// backdropFilter: 'blur(10px)',
			}}
		>
			{children}
		</Box>
	);
};
