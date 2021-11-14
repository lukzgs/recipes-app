export const handleChecked = (e) => {
  if (e.target.checked) {
    e.target.parentNode.className = 'checkedInput';
  } if (!e.target.checked) {
    e.target.parentNode.className = '';
  }
};

export const checkedLocal = (ingredient, saveMade, id) => {
  if (saveMade.length === 0) return '';
  if (saveMade[id].length !== 0) {
    const b = saveMade[id].some((m) => m === ingredient[1]);
    if (b) return 'checkedInput';
  }
};

export const checkedDefault = (ingredient, saveMade, id) => {
  if (saveMade.length === 0) return false;
  if (saveMade[id].length !== 0) {
    return saveMade[id].some((m) => m === ingredient[1]);
  }
};
