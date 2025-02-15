import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST } from './consts';
import AttributeRow from './components/AttributeRow';
import ClassList from './components/ClassList';
import { Attributes, Class } from './types';
import { SkillsAllocation } from './components/SkillsAllocation';
import {save_url} from './constant/Api';

function App() {
  const [attributesSelection, setAttributesSelection] = useState(
    Object.fromEntries(ATTRIBUTE_LIST.map(attr => [attr, 0])) as Attributes
  );
  const [selectedClass, setSelectedClass] = useState<Class>();

  const updateAttribute = (attr, change) => {
    setAttributesSelection(prev => ({
      ...prev,
      [attr]: prev[attr] + change
    }));
  };

  const handleClassSelection = (selected: Class) =>{
    setSelectedClass(selected);
    if (selected in CLASS_LIST) {
      setAttributesSelection(CLASS_LIST[selected]);
    }
  }

  const saveCharacter = async (attributes: Attributes, selectedClass?: Class) =>{
     const characterData = { characters:[{
          attributes: attributes,
          selectedClass
      }]};

      try{
        const res = await fetch(save_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(characterData),
        });
        console.log(res);
      }catch(error){
        console.error("something goes wrong")
      }
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <AttributeRow attributes = {attributesSelection} updateAttribute = {updateAttribute}/>
        <ClassList classList={CLASS_LIST} attributeSelection={attributesSelection} setSelectedClass={handleClassSelection} selectedClass={selectedClass} />
        <SkillsAllocation attribute={attributesSelection} selectedClass={selectedClass}/>
        <button onClick={() => saveCharacter(attributesSelection, selectedClass)}>Save</button> 
      </section>
    </div>
  );
}

export default App;
