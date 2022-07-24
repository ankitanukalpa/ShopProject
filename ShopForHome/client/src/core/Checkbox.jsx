import React, { useState } from 'react';
import CheckboxM from '@material-ui/core/Checkbox';

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setCheked] = useState([]);

  const handleToggle = (c) => () => {

    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
   
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
 
    setCheked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((c, i) => (
    <li key={i} className='list-unstyled'>
      <CheckboxM
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id === -1)}
      />
      <label className='form-check-label'>{c.name}</label>
    </li>
  ));
};

export default Checkbox;
