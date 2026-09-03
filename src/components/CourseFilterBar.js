import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, courseOptions } from '../theme/theme';

// The value used by the filter bar when no course filter is applied.
export const ALL_COURSES = 'All';

const FILTER_OPTIONS = [ALL_COURSES, ...courseOptions];

// Horizontal row of chips used to filter the menu list by course
// (Final PoE - "Search and Filter Menu Items"). The selected chip is
// highlighted the same way the course chips are on the Add / Edit form,
// so the interaction feels consistent across the app.
export default function CourseFilterBar({ selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.bar}
      contentContainerStyle={styles.row}
    >
      {FILTER_OPTIONS.map((option) => {
        const isActive = selected === option;
        return (
          <TouchableOpacity
            key={option}
            onPress={() => onSelect(option)}
            style={[styles.chip, isActive && styles.chipActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`Filter by ${option}`}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Keeps the chip row only as tall as the chips themselves, instead of
  // stretching to fill the space left in the column below it.
  bar: {
    flexGrow: 0,
    flexShrink: 0,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  row: {
    gap: spacing.sm,
    alignItems: 'center',
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.textDark,
    fontWeight: '600',
    fontSize: 13,
  },
  chipTextActive: {
    color: colors.white,
  },
});
