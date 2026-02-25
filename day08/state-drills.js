function deriveVisibleItems(items, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return items;
  else {
    return items.filter((item) =>
      item.title?.toLowerCase().includes(normalizedQuery),
    );
  }
}

function deriveStats(items, visibleItems) {
  return {
    total: items.length,
    visible: visibleItems.length,
  };
}

function deriveUIState(items, visibleItems) {
  return {
    isEmptyAll: items.length === 0,
  };
}
