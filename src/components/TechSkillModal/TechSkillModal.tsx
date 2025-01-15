import React from 'react';

import {
	useTechSkillContext,
	useTechSkillDispatch,
} from '@contexts/TechSkillContext';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { InputItem } from '@components/InputItem';
import { DisplayItem } from '@/components/DisplayItem';
import { Skill, SkillPosition } from '@/types';
import { isFull } from '@utils/constants';
// import { tech } from '@data/tech';

import './techSkillModal.css';

// todo: obvs clean modulate this whole file up
// clean up/ modernize and make more efficient

interface TechSkillModalProps {
	show: boolean;
	onClose: () => void;
}

export const TechSkillModal: React.FC<TechSkillModalProps> = ({
	show,
	onClose,
}) => {
	// const { fullList, skillMap, setSkillMap } = useTechSkillContext();

	// const [state, dispatch] = React.useReducer(
	// 	skillReducer,
	// 	fullList,
	// 	initialSkillState
	// );
	const { state, fullList } = useTechSkillContext();
	const dispatch = useTechSkillDispatch();
	// const { fullList } = state;

	const handleCloseModal = () => {
		onClose();
		dispatch({ type: 'RESET', payload: fullList });
		// ^resets, todo: change if u wanna persist.. maybe instead of calling reste it calls to save in local..
		// setSkillMap({
		// 	...freshSkillMap,
		// });
	};

	const handleAddSelectedSkill = (skill: Skill) => {
		if (isFull(state.skillMap)) {
			return alert('You have already selected 5 skills');
		}
		dispatch({ type: 'ADD_SKILL', payload: { skill } });
		// const previousMapObject = { ...skillMap };
		// previousMapObject[state.currentPosition] = skill;
		// setSkillMap(previousMapObject);
	};

	const handleRemoveSelectedSkill = (skill: Skill, position: SkillPosition) => {
		// const _isFull = isFull(skillMap);
		dispatch({
			type: 'REMOVE_SKILL',
			payload: { skill, position },
		});
		// const newMapObject = { ...skillMap };
		// for (let i = position; i < 5; i++) {
		// 	newMapObject[i] = newMapObject[(i + 1) as SkillPosition];
		// }
		// if (_isFull) {
		// 	newMapObject[5] = freshSkillMap[5];
		// 	setSkillMap(newMapObject);
		// 	return;
		// }
		// setSkillMap(newMapObject);
	};

	if (!show) return <></>;

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
				<h4 className="modal-sidebar-title">Suggested Skills</h4>
				{state.unselectedTechSkills.map((s) => (
					<div
						key={s.name}
						className="skill-item"
						title={`add ${s.name} skill`}
						onClick={() => handleAddSelectedSkill(s)}
					>
						<span className="skill-item-title">+&nbsp;{s.name}</span>
					</div>
				))}
			</div>
		</div>
	);
};
