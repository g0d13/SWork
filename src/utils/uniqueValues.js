function uniqueValues(array, itemKey) {
  let uniqueValues = [];
  for (let i = 0; i < array.length; i++) {
    let actualItem = array[i];
    let callback = uniqueValues.findIndex(
      (item) => actualItem[itemKey] === item[itemKey]
    );
    if (callback === -1) {
      uniqueValues.push(actualItem);
    } else {
      uniqueValues = uniqueValues.filter(
        (el) => el[itemKey] !== actualItem[itemKey]
      );
    }
  }

  return uniqueValues;
}
export default uniqueValues;
