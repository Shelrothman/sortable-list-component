import React from 'react';
import { MenuItem, Autocomplete, TextField } from '@mui/material';
import { Skill, SkillPosition } from '../../../types';

import './inputItem.css';

type InputItemProps = {
	options: Skill[];
	onSelectionChange: (s: Skill) => void;
	/** position (1-5) in the skill list */
	position: SkillPosition;
	/** disabled when user needs to choose above first */
	isDisabled?: boolean;
};

export const InputItem: React.FC<InputItemProps> = ({
	options,
	onSelectionChange,
	position,
	isDisabled = false,
}) => {
	return (
		<>
			<Autocomplete
				disabled={isDisabled}
				options={options}
				clearIcon={null}
				getOptionLabel={(option) => `${position}. ${option.name}`}
				renderOption={(props, option) => (
					<MenuItem {...props} key={option.name}>
						{option.name}
					</MenuItem>
				)}
				sx={{
					backgroundColor: '#ffffffbb',
					borderRadius: '6px',
					opacity: isDisabled ? 0.5 : 1,
				}}
				onChange={(_event, value) => value && onSelectionChange(value)}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder={`${position}. Add skill`}
						// cred: https://github.com/mui/material-ui/issues/20286
						onMouseDownCapture={(e) => e.stopPropagation()}
						sx={{ color: '#03103b' }}
					/>
				)}
			/>
		</>
	);
};
