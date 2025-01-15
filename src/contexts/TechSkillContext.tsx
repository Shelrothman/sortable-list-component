/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Skill, SkillRefObject, SkillPosition } from '../types';
import { freshSkillMap, isFull } from '@utils/constants';

type SkillState = {
	unselectedTechSkills: Skill[];
	currentPosition: SkillPosition;
	skillMap: SkillRefObject;
};

type SkillAction =
	| { type: 'RESET'; payload: Skill[] }
	| {
			type: 'ADD_SKILL';
			payload: { skill: Skill };
	  }
	| {
			type: 'REMOVE_SKILL';
			payload: { skill: Skill; position: SkillPosition };
	  };

const initialSkillState = (fullList: Skill[]): SkillState => ({
	unselectedTechSkills: fullList,
	currentPosition: 1,
	skillMap: { ...freshSkillMap },
});

type TechSkillContextType = {
	state: SkillState;
	fullList: Skill[];
};

/**
 *
 * context for the selected/unselected tech skills
 */
const TechSkillContext = React.createContext<TechSkillContextType>(
	{} as TechSkillContextType
);

const TechSkillDispatchContext = React.createContext<
	React.Dispatch<SkillAction>
>(() => {});

export const useTechSkillContext = () => React.useContext(TechSkillContext);
export const useTechSkillDispatch = () =>
	React.useContext(TechSkillDispatchContext);

type TechSkillProviderProps = {
	/** initial full list of skills */
	fullList: Skill[];
	children: React.ReactNode;
};

export const TechSkillProvider: React.FC<TechSkillProviderProps> = ({
	fullList,
	children,
}) => {
	const [state, dispatch] = React.useReducer(
		skillReducer,
		fullList,
		initialSkillState
	);

	return (
		<TechSkillContext.Provider value={{ state, fullList }}>
			<TechSkillDispatchContext.Provider value={dispatch}>
				{children}
			</TechSkillDispatchContext.Provider>
		</TechSkillContext.Provider>
	);
};

function skillReducer(state: SkillState, action: SkillAction): SkillState {
	switch (action.type) {
		case 'RESET':
			return initialSkillState(action.payload);
		case 'ADD_SKILL':
			return {
				...state,
				unselectedTechSkills: state.unselectedTechSkills.filter(
					(s) => s.id !== action.payload.skill.id
				),
				currentPosition: (state.currentPosition >= 5
					? state.currentPosition
					: state.currentPosition + 1) as SkillPosition,
				skillMap: {
					...state.skillMap,
					[state.currentPosition]: action.payload.skill,
				},
			};
		case 'REMOVE_SKILL': {
			const _isFull = isFull(state.skillMap);
			const newMapObject = { ...state.skillMap };
			for (let i = action.payload.position; i < 5; i++) {
				newMapObject[i] = newMapObject[(i + 1) as SkillPosition];
			}
			if (_isFull) {
				newMapObject[5] = freshSkillMap[5];
			}
			return {
				...state,
				unselectedTechSkills: [
					...state.unselectedTechSkills,
					action.payload.skill,
				],
				currentPosition: _isFull
					? 5
					: ((state.currentPosition - 1) as SkillPosition),
				skillMap: newMapObject,
			};
		}
		default:
			console.warn('Unhandled action type:', action);
			return state;
	}
}
