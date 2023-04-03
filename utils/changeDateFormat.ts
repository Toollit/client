import dayjs from 'dayjs';

const timeFormat = {
  YYMMDD_hhmm: 'YY.MM.DD hh:mm',
  YYMMDD: 'YY.MM.DD',
} as const;

type TimeFormatKey = keyof typeof timeFormat;

interface UseDayjsProps {
  date: string | null;
  format: TimeFormatKey;
}

const changeDateFormat = ({ date, format }: UseDayjsProps) => {
  console.log('props data ===>', { date, format });

  const transformedDate = date ? dayjs(date).format(timeFormat[format]) : '';
  console.log('transformedDate ===>', transformedDate);
  return transformedDate;
};

export default changeDateFormat;
