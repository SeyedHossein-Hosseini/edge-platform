const clearSeconds = (date: moment.Moment) => {
  date.set('s', 0);
  date.set('ms', 0);
  return date;
};

export { clearSeconds };
