const generateSlots = (start, end) => {
  const slots = [];
  let current = new Date(`1970-01-01T${start}:00`);
  const endTime = new Date(`1970-01-01T${end}:00`);

  while (current < endTime) {
    const next = new Date(current);
    next.setHours(next.getHours() + 2);

    if (next > endTime) break;

    slots.push(
      `${current.toTimeString().slice(0,5)}-${next.toTimeString().slice(0,5)}`
    );

    current = next;
  }

  return slots;
};

module.exports = generateSlots;
