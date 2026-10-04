// Shared design tokens for the whole app.
// Keeping colours, spacing and radii in one place is what makes the
// layout consistent across every screen (Part 1, Section 2 / Part 2,
// Requirement 1 - "consistent spacing and alignment").

export const colors = {
  primary: '#173A2E',   // deep forest green - headers / primary actions
  accent: '#C8933F',    // warm gold - call-to-action buttons / FAB
  background: '#F7F5F0',
  card: '#FFFFFF',
  textDark: '#20241F',
  textGrey: '#6B7280',
  textMuted: '#9A9A92',
  border: '#E7E4DA',
  error: '#C0392B',
  errorBg: '#FBEBEA',
  success: '#1F8A55',
  successBg: '#E7F6ED',
  white: '#FFFFFF',

  // Text and outlines that sit on the dark green primary background
  // (headers and the Welcome screen). Kept here rather than hard-coded
  // in each screen so they change together.
  onPrimaryMuted: '#BFD4C8',
  onPrimarySoft: '#D8E4DC',
  onPrimaryBorder: '#3C5B4D',

  // Colour-coded course tags (kept in sync with the Part 1 wireframes)
  starterBg: '#E3F1F0',
  starterText: '#1E6E6C',
  mainBg: '#F8ECD8',
  mainText: '#8A5A17',
  dessertBg: '#F4E7F2',
  dessertText: '#7C3D74',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 24,
};

export const courseOptions = ['Starter', 'Main Course', 'Dessert'];

// Shown under the title on the Home and Statistics headers and on the
// Welcome screen, so the name only has to be changed in one place.
export const RESTAURANT_NAME = "Christoffel's Kitchen";

// Maps a course value to its tag colours so every screen (list,
// statistics, filter) uses the same mapping instead of repeating
// if/else chains everywhere.
export function getCourseColors(course) {
  switch (course) {
    case 'Starter':
      return { bg: colors.starterBg, text: colors.starterText };
    case 'Dessert':
      return { bg: colors.dessertBg, text: colors.dessertText };
    case 'Main Course':
    default:
      return { bg: colors.mainBg, text: colors.mainText };
  }
}
