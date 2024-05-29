import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

// Esta funcion transofrma un string en formato "YYYY/MM/DD hh:mm A" a un objeto Date
export const parseDate = (date: string) => {
  const input = date;
  const dayjsDate = dayjs(input, "YYYY/MM/DD hh:mm A");
  const jsDate = dayjsDate.toDate();
  return jsDate;
};

export const dateToString = (date: Date) => {
  const dayjsDate = dayjs(date);
  return dayjsDate.format("YYYY/MM/DD hh:mm A");
};
