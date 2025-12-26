
const generateSlots = (start, end) => {
  const slots = [];

  let [startHour] = start.split(":").map(Number);
  let [endHour] = end.split(":").map(Number);

  while (startHour + 2 <= endHour) {
    const from = formatTime(startHour);
    const to = formatTime(startHour + 2);

    slots.push(`${from}-${to}`);
    startHour += 2;
  }

  return slots;
};

const formatTime = (hour) => {
  const period = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 || 12;
  return `${h}:00 ${period}`;
};

module.exports = generateSlots;
