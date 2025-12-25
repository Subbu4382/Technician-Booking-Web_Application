// const generateSlots = (start, end) => {
//   const slots = [];
//   let current = new Date(`1970-01-01T${start}:00`);
//   const endTime = new Date(`1970-01-01T${end}:00`);

//   while (current < endTime) {
//     const next = new Date(current);
//     next.setHours(next.getHours() + 2);

//     if (next > endTime) break;

//     slots.push(
//       `${current.toTimeString().slice(0,5)}-${next.toTimeString().slice(0,5)}`
//     );

//     current = next;
//   }

//   return slots;
// };

// module.exports = generateSlots;

/**
 * Generate 2-hour slots between start and end time
 * Example: 09:00 - 17:00
 */
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
