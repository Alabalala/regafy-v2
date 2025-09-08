export function convertDate(birthday) {
  const parsedDate = Date.parse(birthday);
  const date = new Date(parsedDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = new Date().getFullYear();
  let spelledMonth = "";
  switch (month) {
  case 1:
    spelledMonth = "enero";
    break;
  case 2:
    spelledMonth = "febrero";
    break;
  case 3:
    spelledMonth = "marzo";
    break;
  case 4:
    spelledMonth = "abril";
    break;
  case 5:
    spelledMonth = "mayo";
    break;
  case 6:
    spelledMonth = "junio";
    break;
  case 7:
    spelledMonth = "julio";
    break;
  case 8:
    spelledMonth = "agosto";
    break;
  case 9:
    spelledMonth = "septiembre";

    break;
  case 10:
    spelledMonth = "octubre";
    break;
  case 11:
    spelledMonth = "noviembre";
    break;
  case 12:
    spelledMonth = "diciembre";
    break;

  }
  const formattedDate = `${day} de ${spelledMonth} del ${year}` ;
  return formattedDate;
}