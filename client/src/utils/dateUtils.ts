export function formatDateTime(originalDateTime: string | null | undefined) {
  // originalDateTime が null、undefined、または空文字の場合は空文字を返す
  if (!originalDateTime) return '';

  const date = new Date(originalDateTime);

  // 日本時間に変換
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Tokyo', // 明示的にタイムゾーンを指定
  };

  const formattedDateTime = date
    .toLocaleDateString('ja-JP', options)
    .replace(/\//g, '-')
    .replace(/\s/g, ' ');

  return formattedDateTime;
}
