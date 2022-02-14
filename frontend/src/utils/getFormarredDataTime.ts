export function getFormarredDataTime(
  timestamp: string,
  locales: string | string[] | undefined = 'ru'
): string {
  try {
    const formatter = new Intl.DateTimeFormat(locales, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    const date = new Date(timestamp);

    return formatter.format(date);
  } catch (e) {
    console.error(e);
    return '';
  }
}
