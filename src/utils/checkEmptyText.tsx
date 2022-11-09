const checkEmptyText: Function = (text: string): boolean => {
  if (text.trim().length === 0) {
    return true;
  }
  return false;
};

export default checkEmptyText;