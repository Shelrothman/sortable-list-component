import React from 'react';

import { useTechSkillContext } from '@contexts/TechSkillContext';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { InputItem } from '@components/InputItem';
import { DisplayItem } from '@/components/DisplayItem';
import { Skill, SkillPosition, SkillRefObject } from '@/types';
import { freshSkillMap } from '@utils/constants';

import './techSkillModal.css';

// todo: obvs clean modulate this whole file up
// clean up/ modernize and make more efficient

// todo: all reducer logic into our context file

type SkillState = {
	unselectedTechSkills: Skill[];
	currentPosition: SkillPosition;
};

type SkillAction =
	| { type: 'RESET'; payload: Skill[] }
	| { type: 'ADD_SKILL'; payload: Skill }
	| {
			type: 'REMOVE_SKILL';
			payload: { skill: Skill; position: SkillPosition; isFull: boolean };
	  };

const isFull = (obj: SkillRefObject) => Object.values(obj).every((s) => s.id);

const initialSkillState = (fullList: Skill[]): SkillState => ({
	unselectedTechSkills: fullList,
	currentPosition: 1,
});

const skillReducer = (state: SkillState, action: SkillAction): SkillState => {
	switch (action.type) {
		case 'RESET':
			return initialSkillState(action.payload);
		case 'ADD_SKILL':
			return {
				...state,
				unselectedTechSkills: state.unselectedTechSkills.filter(
					(s) => s.id !== action.payload.id
				),
				currentPosition: (state.currentPosition >= 5
					? state.currentPosition
					: state.currentPosition + 1) as SkillPosition,
			};
		case 'REMOVE_SKILL':
			return {
				...state,
				unselectedTechSkills: [
					...state.unselectedTechSkills,
					action.payload.skill,
				],
				currentPosition: action.payload.isFull
					? 5
					: ((state.currentPosition - 1) as SkillPosition),
			};
		default:
			return state;
	}
};

interface TechSkillModalProps {
	show: boolean;
	onClose: () => void;
}

export const TechSkillModal: React.FC<TechSkillModalProps> = ({
	show,
	onClose,
}) => {
	const { fullList, skillMap, setSkillMap } = useTechSkillContext();

	const [state, dispatch] = React.useReducer(
		skillReducer,
		fullList,
		initialSkillState
	);

	const handleCloseModal = () => {
		onClose();
		dispatch({ type: 'RESET', payload: fullList });
		// ^resets, todo: change if u wanna persist.. maybe instead of calling reste it calls to save in local..
		setSkillMap({
			...freshSkillMap,
		});
	};

	const handleAddSelectedSkill = (skill: Skill) => {
		if (isFull(skillMap)) {
			return alert('You have already selected 5 skills');
		}
		dispatch({ type: 'ADD_SKILL', payload: skill });
		const previousMapObject = { ...skillMap };
		previousMapObject[state.currentPosition] = skill;
		setSkillMap(previousMapObject);
	};

	const handleRemoveSelectedSkill = (skill: Skill, position: SkillPosition) => {
		const _isFull = isFull(skillMap);
		dispatch({
			type: 'REMOVE_SKILL',
			payload: { skill, position, isFull: _isFull },
		});
		const newMapObject = { ...skillMap };
		for (let i = position; i < 5; i++) {
			newMapObject[i] = newMapObject[(i + 1) as SkillPosition];
		}
		if (_isFull) {
			newMapObject[5] = freshSkillMap[5];
			setSkillMap(newMapObject);
			return;
		}
		setSkillMap(newMapObject);
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
				{Object.entries(skillMap).map(([key, skill]) => {
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
									skillMap[+key as SkillPosition],
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
