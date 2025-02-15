import React, { useState } from 'react';
import { Attributes, Class } from '../types';


interface ClassListProps {
    classList: Record<Class, Attributes>;
    attributeSelection: Attributes;
    selectedClass: Class;
    setSelectedClass: (res: Class) => void
}

const ClassList: React.FC<ClassListProps> = ({ classList, attributeSelection, setSelectedClass,  selectedClass}) => {
      

      const meetCharactersRequirments = (requirements, attributeSelection) => {
            var minimumReqMeets = Object.keys(requirements).every((attr) => {
                const min = requirements[attr as keyof Attributes];
                //console.log("selection:", attributeSelection);
                const currentValue  = attributeSelection[attr as keyof Attributes];
                return currentValue >= min;
            });
            return minimumReqMeets;
      }

      const showBasicStats = (className: Class) => {
        setSelectedClass(className);
      }

      const statsModifier = (value: number) => {
        var res = Math.floor((value -10) / 2);
        return res;
      }
    
      return (
            <div className="class-list">
                <h2>Class Selection :</h2>
                <ul>
                    {Object.entries(classList).map(([className, requirements]) => {
                    const meetsFlag = meetCharactersRequirments(requirements, attributeSelection);
                    return (
                        <li key={className} style={{color: meetsFlag? "green": "red"}} onClick={()=> showBasicStats(className as Class)}>
                        { className } {meetsFlag && "class has met minimum requirments based on your selection"}
                        </li>
                    );
                     })}
                </ul>
                {selectedClass && (
                <div className="class-stats">
                    <h3>{selectedClass} Stats:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Attribute</th>
                                <th>Value</th>
                                <th>Skill Modifier</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(classList[selectedClass]).map(([attr, value]) => (
                                <tr key={attr}>
                                    <td>{attr}</td>
                                    <td>{value}</td>
                                    <td>{statsModifier(value)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            </div>

      );
}


export default ClassList;