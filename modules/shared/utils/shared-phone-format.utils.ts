export function keepOnlyPhoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}

// 18095550101 → +1 (809) 555-0101
export function formatPhoneForDisplay(phone: string) {
  const digits = keepOnlyPhoneDigits(phone);
  if (digits.length !== 11) return phone;
  return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
}
