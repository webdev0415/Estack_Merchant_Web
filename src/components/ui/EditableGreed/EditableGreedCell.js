import React from 'react';
import EditableGreedComponent from './EditableGreedComponent';

const EditableGreedCell = (props) => {
  const defaultRules = [
    {
      required: true,
      message: 'Invalid value',
    },
  ];

  return (
    <EditableGreedComponent {...props} defaultRules={defaultRules} />
  );
};

export default EditableGreedCell;
