const handleChecked = (e) => {
  if (e.target.checked) {
    e.target.parentNode.className = 'checkedInput';
  } if (!e.target.checked) {
    e.target.parentNode.className = '';
  }
};

export default handleChecked;
