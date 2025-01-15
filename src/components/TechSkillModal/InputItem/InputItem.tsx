import React from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ItemWrapper } from '@components/ItemWrapper';
import { Skill, SkillPosition } from '../../../types';
import { useTechSkillContext } from '@contexts/TechSkillContext';

/*
use the mui and then use that phone screenshot i just took to make th it take the right width and the
in parent, once gets added, then  it turns into a `DisplayItem` component
fixme: the width of the menu is not correct,
try the thing from screenshot soon...future:
*/

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
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const { skillMap } = useTechSkillContext().state;
	const open = Boolean(anchorEl);

	const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (
		_event: React.MouseEvent<HTMLElement>,
		index: number
	) => {
		const itemToSelect = options[index];
		onSelectionChange(itemToSelect);
		setAnchorEl(null);
	};

	const handleClose = () => setAnchorEl(null);

	return (
		<>
			<ItemWrapper
				id={`skill-selector-${position}`}
				aria-haspopup="listbox"
				aria-controls="lock-menu"
				aria-label={`skill-selector-${position}`}
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClickListItem}
				itemState={isDisabled ? 'disabled' : 'active'}
			>
				<Typography>
					{position}.{' '}
					{skillMap[position].name ? skillMap[position].name : 'Add skill'}
				</Typography>
				{!isDisabled && <ExpandMoreIcon color="inherit" />}
			</ItemWrapper>
			<Menu
				id="lock-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': `skill-selector-${position}`,
					role: 'listbox',
					sx: { width: anchorEl && anchorEl.clientWidth },
				}}
			>
				{options.map((option, index) => (
					<MenuItem
						key={option.name}
						selected={skillMap[position].id === option.id}
						onClick={(event) => handleMenuItemClick(event, index)}
					>
						{option.name}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};
