import { courseOptions } from '../theme/theme';

// Turns the raw menu list into the summary figures shown on the
// Statistics screen and in the Home header (Final PoE - "Display Menu
// Statistics"). Kept as a plain function, separate from any screen, so
// the same numbers can be reused in more than one place and the maths
// is easy to check on its own.
export function computeMenuStats(menuItems) {
  const totalItems = menuItems.length;

  const totalPrice = menuItems.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );
  const averagePrice = totalItems > 0 ? totalPrice / totalItems : 0;

  // One row per course, in the same fixed order used everywhere else
  // in the app (Starter, Main Course, Dessert).
  const byCourse = courseOptions.map((course) => {
    const itemsForCourse = menuItems.filter((item) => item.course === course);
    const courseTotal = itemsForCourse.reduce(
      (sum, item) => sum + Number(item.price),
      0
    );

    return {
      course,
      count: itemsForCourse.length,
      averagePrice:
        itemsForCourse.length > 0 ? courseTotal / itemsForCourse.length : 0,
    };
  });

  return { totalItems, averagePrice, byCourse };
}

// Consistent price formatting for the whole app, e.g. 145 -> "R145.00".
export function formatPrice(value) {
  return `R${Number(value).toFixed(2)}`;
}
