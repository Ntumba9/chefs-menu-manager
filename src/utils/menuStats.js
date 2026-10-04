import { courseOptions } from '../theme/theme';

// Turns the raw menu list into the summary figures shown on the
// Statistics screen and in the Home header (Final PoE - "Display Menu
// Statistics"). Kept as a plain function, separate from any screen, so
// the same numbers can be reused in more than one place and the maths
// is easy to check on its own.
export function computeMenuStats(menuItems) {
  const totalItems = menuItems.length;
  const averagePrice = averagePriceOf(menuItems);

  // One row per course, in the same fixed order used everywhere else
  // in the app (Starter, Main Course, Dessert). `share` is the course's
  // percentage of the whole menu, used for the bar on the Statistics
  // screen.
  const byCourse = courseOptions.map((course) => {
    const itemsForCourse = menuItems.filter((item) => item.course === course);

    return {
      course,
      count: itemsForCourse.length,
      averagePrice: averagePriceOf(itemsForCourse),
      share: totalItems > 0 ? Math.round((itemsForCourse.length / totalItems) * 100) : 0,
    };
  });

  // The priciest and cheapest dishes give the chef a quick sense of the
  // menu's price range. null when the menu is empty.
  const sortedByPrice = [...menuItems].sort((a, b) => Number(a.price) - Number(b.price));
  const cheapestItem = sortedByPrice[0] ?? null;
  const mostExpensiveItem = sortedByPrice[sortedByPrice.length - 1] ?? null;

  return { totalItems, averagePrice, byCourse, cheapestItem, mostExpensiveItem };
}

function averagePriceOf(items) {
  if (items.length === 0) {
    return 0;
  }
  const total = items.reduce((sum, item) => sum + Number(item.price), 0);
  return total / items.length;
}

// Consistent price formatting for the whole app, e.g. 145 -> "R145.00".
export function formatPrice(value) {
  return `R${Number(value).toFixed(2)}`;
}
