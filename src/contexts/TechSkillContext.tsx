/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Skill, SkillRefObject, SkillPosition } from '../types';
import { freshSkillMap, isFull } from '@utils/constants';

type SkillState = {
	unselectedTechSkills: Skill[];
	currentPosition: SkillPosition;
	skillMap: SkillRefObject;
};

type ResetPayload = Skill[];

type AddPayload = { skill: Skill };

type RemovePayload = { skill: Skill; position: SkillPosition };

type SkillAction =
	| { type: 'RESET'; payload: ResetPayload }
	| { type: 'ADD_SKILL'; payload: AddPayload }
	| { type: 'REMOVE_SKILL'; payload: RemovePayload };

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
			return handleAddSkillAction(state, action.payload);
		case 'REMOVE_SKILL':
			return handleRemoveSkillAction(state, action.payload);
		default:
			console.warn('Unhandled action type:', action);
			return state;
	}
}

/** Reducer Helper Methods */
function handleAddSkillAction(state: SkillState, payload: AddPayload) {
	return {
		...state,
		unselectedTechSkills: state.unselectedTechSkills.filter(
			(s) => s.id !== payload.skill.id
		),
		currentPosition: (state.currentPosition >= 5
			? state.currentPosition
			: state.currentPosition + 1) as SkillPosition,
		skillMap: {
			...state.skillMap,
			[state.currentPosition]: payload.skill,
		},
	};
}
function handleRemoveSkillAction(state: SkillState, payload: RemovePayload) {
	const _isFull = isFull(state.skillMap);
	const newMapObject = { ...state.skillMap };
	for (let i = payload.position; i < 5; i++) {
		newMapObject[i] = newMapObject[(i + 1) as SkillPosition];
	}
	if (_isFull) {
		newMapObject[5] = freshSkillMap[5];
	}
	return {
		...state,
		unselectedTechSkills: [...state.unselectedTechSkills, payload.skill],
		currentPosition: _isFull
			? 5
			: ((state.currentPosition - 1) as SkillPosition),
		skillMap: newMapObject,
	};
}
