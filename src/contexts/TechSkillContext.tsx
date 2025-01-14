/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Skill, SkillRefObject } from '../types';
import { freshSkillMap } from '../utils/constants';

export type TechSkillContextType = {
	unselectedTechSkills: Skill[];
	setUnselectedTechSkills: (techSkills: Skill[]) => void;
	skillMap: SkillRefObject;
	setSkillMap: (map: SkillRefObject) => void;
};

/**
 *
 * context for the selected/unselected tech skills
 */
const TechSkillContext = React.createContext<TechSkillContextType>(
	{} as TechSkillContextType
);

export const useTechSkillContext = () => React.useContext(TechSkillContext);

type TechSkillProviderProps = {
	/** initial full list of skills */
	fullList: Skill[];
	children: React.ReactNode;
};

export const TechSkillProvider: React.FC<TechSkillProviderProps> = ({
	fullList,
	children,
}) => {
	const [unselectedTechSkills, setUnselectedTechSkills] =
		React.useState<Skill[]>(fullList);

	const [skillMap, setSkillMap] = React.useState<SkillRefObject>({
		...freshSkillMap,
	});

	return (
		<TechSkillContext.Provider
			value={{
				unselectedTechSkills,
				setUnselectedTechSkills,
				skillMap,
				setSkillMap,
			}}
		>
			{children}
		</TechSkillContext.Provider>
	);
};
