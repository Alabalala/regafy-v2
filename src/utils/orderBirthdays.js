export default function orderBirthdays(friends) {
  const sortedEvents = friends.sort((a, b) => {
    const aDate = new Date(a.birthday);
    const bDate = new Date(b.birthday);
  
    const aMonthDay = aDate.getMonth() * 100 + aDate.getDate();
    const bMonthDay = bDate.getMonth() * 100 + bDate.getDate();
  
    return aMonthDay - bMonthDay;
  });
  
  return sortedEvents;
}
  