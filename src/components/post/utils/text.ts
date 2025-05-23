export function limitText(text: string, maxLength: number = 150): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  // Cắt đến vị trí maxLength và tìm khoảng trắng gần nhất để tránh cắt giữa từ
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  // Nếu không tìm thấy khoảng trắng hoặc khoảng trắng ở đầu, cắt tại maxLength
  const breakpoint = lastSpace > 0 ? lastSpace : maxLength;

  return text.substring(0, breakpoint) + "...";
}
