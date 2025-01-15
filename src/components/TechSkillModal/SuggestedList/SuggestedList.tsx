import React from 'react';
import { Skill } from '@/types';

// PICKUP: herre implementing this modulated from parentttttt
type SuggestedListProps = {
	skills: Skill[];
	handleAdd: (skill: Skill) => void;
};

export const SuggestedList: React.FC<SuggestedListProps> = ({
	skills,
	handleAdd,
}) => {
	return (
		<>
			<h4 className="modal-sidebar-title">Suggested Skills</h4>
			{skills.map((s) => (
				<div
					key={s.name}
					className="skill-item"
					title={`add ${s.name} skill`}
					onClick={() => handleAdd(s)}
				>
					<span className="skill-item-title">+&nbsp;{s.name}</span>
				</div>
			))}
		</>
	);
};
