export function checkDate(date) {
  const eventDate = new Date(date)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);
  return today > eventDate;
}