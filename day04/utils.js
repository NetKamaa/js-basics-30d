export function normalizeText(text) {
  return text.trim();
}

export function formatItems(items) {
  if (items.length === 0) {
    return "Empty";
  } else {
    return items.map((item, index) => `#${index + 1}: ${item.text}`).join(", ");
  }
}

export function getValidationError(text) {
  const trimmed = text.trim();
  if (trimmed.length === 0) return "Введите текст";
  if (trimmed.length > 60)
    return "Слишком длинный текст, длина не должна превышать 60 символов";
  else return "";
}

export function getVisibleItems(items, text) {
  return items.filter((item) =>
    item.text.toLowerCase().includes(text.toLowerCase()),
  );
}

export function getStats(items, visibleItems) {
  return {
    total: items.length,
    visible: visibleItems.length,
  };
}
