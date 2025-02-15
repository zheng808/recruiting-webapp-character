import React, { useMemo, useState } from "react";
import { SKILL_LIST } from "../consts";
import {Attributes, Class} from "../types";
 
interface SkillsAllocationProps{
    attribute: Attributes;
    selectedClass?: Class;
}

export const SkillsAllocation: React.FC<SkillsAllocationProps> = ({attribute, selectedClass}) => {
    const initSkills = useMemo(()=>{
        return Object.fromEntries(
            SKILL_LIST.map((skill) => [skill.name, 0])
        );
    }, [])

    const [pointsSkill, setPointsSkill] = useState<Record<string, number>>(initSkills)
    const modifier =  Math.floor((attribute.Intelligence -10) / 2);
    const totalSkillPoints = 10 + 4 * modifier;
    const totalAllocated = Object.values(pointsSkill).reduce((sum, value) => sum + value, 0);
    const remainingPoints = totalSkillPoints - totalAllocated;

    const adjustPoints = (skillName: string, amount: number) => {
        setPointsSkill(prev => {
          const newValue = prev[skillName] + amount;
          return { ...prev, [skillName]: newValue };
        });
      };
    return (
        <div>
            {!selectedClass  ? (
                <p> Please select a class first before allocating points to skill</p>
            ):(
           <div>
                    <p>Available Points: {remainingPoints} / {totalSkillPoints}</p>
                    {SKILL_LIST.map(({ name, attributeModifier }) => {
                    const abilityModifier = Math.floor((attribute[attributeModifier] - 10) / 2);
                    const skillpoint = pointsSkill[name];
                    const totalValue = skillpoint + abilityModifier;

                    return (
                        <div key={name}>
                        <strong>{name}</strong> - Points: {skillpoint} 
                        <button onClick={() => adjustPoints(name, 1)} disabled={remainingPoints == 0}>+</button>
                        <button onClick={() => adjustPoints(name, -1)} disabled={skillpoint <= 0}>-</button>
                        Modifier ({attributeModifier}): {abilityModifier} --- Total: {totalValue}
                        </div>
                    );
                    })}
                </div>
            )}
        </div>
    );
}