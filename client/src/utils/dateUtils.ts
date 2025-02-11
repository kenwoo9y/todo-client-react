export function formatDateTime(originalDateTime: string | null | undefined) {
  // originalDateTime が null、undefined、または空文字の場合は空文字を返す
  if (!originalDateTime) return '';

  const date = new Date(originalDateTime);

  // 日本時間に変換
  date.setHours(date.getHours() + 9);

  // 年、月、日、時、分を取得
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1し、2桁にパディング
  const day = String(date.getDate()).padStart(2, '0'); // 日を2桁にパディング
  const hours = String(date.getHours()).padStart(2, '0'); // 時を2桁にパディング
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 分を2桁にパディング

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDateTime;
}
