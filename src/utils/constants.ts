import { Skill, SkillRefObject } from '@/types';

export const freshSkillMap = {
	1: {} as Skill,
	2: {} as Skill,
	3: {} as Skill,
	4: {} as Skill,
	5: {} as Skill,
};

export const isFull = (obj: SkillRefObject) =>
	Object.values(obj).every((s) => s.id);
