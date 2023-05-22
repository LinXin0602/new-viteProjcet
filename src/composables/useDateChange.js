export const changeDate = () => {
  function TimeDate(time) {
    const localDate = new Date(time * 1000);
    return localDate.toLocaleString();
  }
  function DayDate(time) {
    const localDate = new Date(time * 1000);
    return localDate.toLocaleDateString();
  }
  return {
    TimeDate,
    DayDate,
  };
};
