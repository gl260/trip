import dayjs from "dayjs";

// 获取 XX月XX日 format:格式
export function formatMonthDay(date, format = "MM月DD日") {
  return dayjs(date).format(format);
}

// 获取时间差
export function getDiffDay(start, end) {
  return dayjs(end).diff(start, "day");
}
