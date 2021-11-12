export const handleChecked = (e) => {
  if (e.target.checked) {
    e.target.parentNode.className = 'checkedInput';
  } if (!e.target.checked) {
    e.target.parentNode.className = '';
  }
};

export const checkedLocal = (ingredient, saveMade) => {
  if (saveMade.length !== 0) {
    const b = saveMade.some((m) => m === ingredient[1]);
    if (b) return 'checkedInput';
  }
};

export const checkedDefault = (ingredient, saveMade) => {
  if (saveMade.length !== 0) {
    return saveMade.some((m) => m === ingredient[1]);
  }
};
