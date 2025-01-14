export type Skill = {
	id: number;
	name: string;
	icon: string;
	level: number;
};

export type SkillPosition = 1 | 2 | 3 | 4 | 5;

export type SkillRefObject = {
  [ key in SkillPosition ]: Skill;
};

export type ItemState = 'set' | 'disabled' | 'active';
