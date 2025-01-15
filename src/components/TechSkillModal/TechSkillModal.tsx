import React from 'react';

import {
	useTechSkillContext,
	useTechSkillDispatch,
} from '@contexts/TechSkillContext';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { InputItem } from './InputItem';
import { DisplayItem } from './DisplayItem';
import { SuggestedList } from './SuggestedList';
import { Skill, SkillPosition } from '@/types';
import { isFull } from '@utils/constants';

import './techSkillModal.css';

interface TechSkillModalProps {
	show: boolean;
	onClose: () => void;
}

export const TechSkillModal: React.FC<TechSkillModalProps> = ({
	show,
	onClose,
}) => {
	const { state, fullList } = useTechSkillContext();
	const dispatch = useTechSkillDispatch();

	if (!show) return <></>;

	const handleCloseModal = () => {
		onClose();
		dispatch({ type: 'RESET', payload: fullList });
		// ^resets, todo: change if u wanna persist.. maybe instead of calling reste it calls to save in local..
	};

	const handleAddSelectedSkill = (skill: Skill) => {
		if (isFull(state.skillMap)) {
			return alert('You have already selected 5 skills');
		}
		dispatch({ type: 'ADD_SKILL', payload: { skill } });
	};

	const handleRemoveSelectedSkill = (skill: Skill, position: SkillPosition) => {
		dispatch({
			type: 'REMOVE_SKILL',
			payload: { skill, position },
		});
	};

	return (
		<div className="modal">
			<div className="modal-header">
				<IconButton
					onClick={handleCloseModal}
					className="btn btn-close"
					aria-label="close"
					color="inherit"
				>
					<CloseIcon />
				</IconButton>
			</div>
			<div className="modal-content">
				{Object.entries(state.skillMap).map(([key, skill]) => {
					if (!skill || !skill.id)
						return (
							<InputItem
								key={`${key}-empty`}
								options={state.unselectedTechSkills}
								onSelectionChange={handleAddSelectedSkill}
								position={+key as SkillPosition}
								isDisabled={+key > state.currentPosition}
							/>
						);
					return (
						<DisplayItem
							key={`${skill.name}-${skill.id}`}
							name={skill.name}
							position={+key}
							onRemove={() =>
								handleRemoveSelectedSkill(
									state.skillMap[+key as SkillPosition],
									+key as SkillPosition
								)
							}
						/>
					);
				})}
			</div>
			<div className="modal-sidebar">
				<SuggestedList
					skills={state.unselectedTechSkills}
					handleAdd={handleAddSelectedSkill}
				/>
			</div>
		</div>
	);
};
