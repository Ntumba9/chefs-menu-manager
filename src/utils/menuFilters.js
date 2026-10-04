import { courseOptions } from '../theme/theme';

// The value used by the filter bar when no course filter is applied.
export const ALL_COURSES = 'All';

// Returns only the dishes that match both the search text (by name,
// case-insensitive) and the selected course. Kept as a plain function
// so the Home screen stays focused on layout, and the matching rules
// live in one place.
export function filterMenuItems(menuItems, { searchText = '', course = ALL_COURSES }) {
  const query = searchText.trim().toLowerCase();

  return menuItems.filter((item) => {
    const matchesCourse = course === ALL_COURSES || item.course === course;
    const matchesSearch = query === '' || item.name.toLowerCase().includes(query);
    return matchesCourse && matchesSearch;
  });
}

// How many dishes each filter chip would show, e.g.
// { All: 5, Starter: 2, 'Main Course': 2, Dessert: 1 }.
// Counted against the current search text so the numbers on the chips
// always agree with what tapping them would show.
export function countByCourse(menuItems, searchText = '') {
  const searched = filterMenuItems(menuItems, { searchText });
  const counts = { [ALL_COURSES]: searched.length };

  courseOptions.forEach((course) => {
    counts[course] = searched.filter((item) => item.course === course).length;
  });

  return counts;
}
