import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// plugins
dayjs.extend(relativeTime);

const timeFormat = {
  YYMMDD_hhmmss: 'YY.MM.DD HH:mm:ss',
  YYMMDD_hhmm: 'YY.MM.DD HH:mm',
  YYMMDD: 'YY.MM.DD',
} as const;

type TimeFormatKey = keyof typeof timeFormat;

interface ChangeDateFormatProps {
  date: string | null;
  format: TimeFormatKey;
}

interface DateFromNowProps {
  date: string | null;
}

const changeDateFormat = ({ date, format }: ChangeDateFormatProps) => {
  const transformedDate = date ? dayjs(date).format(timeFormat[format]) : '';

  return transformedDate;
};

const dateFromNow = ({ date }: DateFromNowProps) => {
  const result = dayjs().to(dayjs(date));

  return result;
};

export { changeDateFormat, dateFromNow };
