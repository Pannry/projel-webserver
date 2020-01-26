exports.getDisplayName = inputObj => inputObj.map((num) => {
  const obj = num;
  let str = num.file_name;
  str = str.split('/');
  str = str[str.length - 1];
  obj.displayName = decodeURI(str);
  return obj;
});
