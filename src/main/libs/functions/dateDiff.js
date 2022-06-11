const _calcDays = async (data) => {
  const intDate = new Date(data);
  const currDate = new Date();

  const timeDiff = currDate.getTime() - intDate.getTime();

  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return daysDiff;
};

export { _calcDays };
