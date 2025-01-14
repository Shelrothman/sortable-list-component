import React from 'react';

import { useTechSkillContext } from '../../contexts/TechSkillContext';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { InputItem } from '../InputItem/InputItem';
import { Skill, SkillPosition } from '../../types';
import { tech } from '../../data/tech';

import './techSkillModal.css';

interface TechSkillModalProps {
	show: boolean;
	onClose: () => void;
}

const positionArray = [1, 2, 3, 4, 5] as SkillPosition[];

export const TechSkillModal: React.FC<TechSkillModalProps> = ({
	show,
	onClose,
}) => {
	const {
		unselectedTechSkills,
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
			1: {} as Skill,
			2: {} as Skill,
			3: {} as Skill,
			4: {} as Skill,
			5: {} as Skill,
		});
	};

	const handleSelectionChange = (skill: Skill) => {
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
		//todo: then turn it into a displayed...item and the exit logic will do opposite of above pretty much
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
				{positionArray.map((itemPosition) => {
					if (itemPosition > currentPosition)
						return (
							<InputItem
								key={itemPosition}
								options={unselectedTechSkills}
								onSelectionChange={handleSelectionChange}
								position={itemPosition}
								isDisabled={true}
							/>
						);
					return (
						<InputItem
							key={itemPosition}
							options={unselectedTechSkills}
							onSelectionChange={handleSelectionChange}
							position={itemPosition}
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
