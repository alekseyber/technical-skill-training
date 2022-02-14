interface GetTimeDataDiff {
  rezultTime: string;
  diff: number;
}

export const getTimeDataDiff = (
  createdAt: string | number | Date
): GetTimeDataDiff => {
  const timezoneOffset = +new Date().getTimezoneOffset();
  const diff =
    (+new Date() - timezoneOffset - +new Date(createdAt)) / 1000 / 60;

  const hour = Math.floor(diff / 60);
  const min = Math.floor(diff) % 60;
  const sec = Math.floor((diff - min) * 60);

  const rezultTime = `${('0' + hour).slice(-2)}:${('0' + min).slice(-2)}:${(
    '0' + sec
  ).slice(-2)}`;

  return { diff, rezultTime };
};
