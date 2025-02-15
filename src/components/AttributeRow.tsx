import React from 'react';

interface AttributeRowProps {
    attributes: Record<string, number>;
    updateAttribute: (attr: string, change: number) => void;
}

const AttributeRow:  React.FC<AttributeRowProps> = ({ attributes, updateAttribute }) => {
      return (
        <div>
          {Object.entries(attributes).map(([attr, value]) => (
        <div key={attr}>
          <span>{attr}</span>
          <div>
            <button onClick={() => updateAttribute(attr, -1)}>
              -
            </button>
            <span>{value}</span>
            <button onClick={() => updateAttribute(attr, 1)}>+</button>
          </div>
        </div>
      ))}
        </div>
      );
}

export default AttributeRow;