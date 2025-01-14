import React from 'react';

import { useTechSkillContext } from '@contexts/TechSkillContext';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { InputItem } from '@components/InputItem';
import { DisplayItem } from '@/components/DisplayItem';
import { Skill, SkillPosition } from '@/types';
import { tech } from '@data/tech';
import { freshSkillMap } from '@utils/constants';

import './techSkillModal.css';

interface TechSkillModalProps {
	show: boolean;
	onClose: () => void;
}

export const TechSkillModal: React.FC<TechSkillModalProps> = ({
	show,
	onClose,
}) => {
	const {
		unselectedTechSkills, // todo: may be able just have this local state here and not need in the context
		setUnselectedTechSkills,
		skillMap,
		setSkillMap,
	} = useTechSkillContext();

	/** the current position(1-5) the user is at to select */
	const [currentPosition, setCurrentPosition] =
		React.useState<SkillPosition>(1);

	const handleCloseModal = () => {
		onClose();
		setCurrentPosition(1);
		setUnselectedTechSkills(tech);
		setSkillMap({
			...freshSkillMap,
		});
	};

	// TODO: change state logic to a reducer (https://react.dev/learn/extracting-state-logic-into-a-reducer)

	const handleAddSelectedSkill = (skill: Skill) => {
		const newUnselectedTechSkills = unselectedTechSkills.filter(
			(s) => s.id !== skill.id
		);
		setUnselectedTechSkills(newUnselectedTechSkills);
		const previousMapObject = { ...skillMap };
		previousMapObject[currentPosition] = skill;
		setSkillMap(previousMapObject);
		if (currentPosition >= 5) return; // if at the last position, don't increment
		setCurrentPosition(
			(currentPosition) => (currentPosition + 1) as SkillPosition
		);
	};

	const handleRemoveSelectedSkill = (skill: Skill, position: SkillPosition) => {
		const newUnselectedTechSkills = [...unselectedTechSkills, skill];
		// add the skill back into the unselected list
		setUnselectedTechSkills(newUnselectedTechSkills);
		const newMapObject = { ...skillMap };
		// shift all the skills up in the objectMap
		for (let i = position; i < 5; i++) {
			newMapObject[i] = newMapObject[(i + 1) as SkillPosition];
		}
		setSkillMap(newMapObject);
		setCurrentPosition(
			(currentPosition) => (currentPosition - 1) as SkillPosition
		);
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
				{Object.entries(skillMap).map(([key, skill], index) => {
					if (!skill || !skill.id)
						return (
							<InputItem
								key={`${key}-empty`}
								options={unselectedTechSkills}
								onSelectionChange={handleAddSelectedSkill}
								position={+key as SkillPosition}
								isDisabled={+key > currentPosition}
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
				<h4>Suggested Skills</h4>
				{unselectedTechSkills.map((s) => (
					<div key={s.name} className="skill-item">
						+<span>{s.name}</span>
					</div>
				))}
			</div>
		</div>
	);
};
