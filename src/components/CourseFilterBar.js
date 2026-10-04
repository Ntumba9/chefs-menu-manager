import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Chip from './Chip';
import { spacing, courseOptions } from '../theme/theme';
import { ALL_COURSES } from '../utils/menuFilters';

const FILTER_OPTIONS = [ALL_COURSES, ...courseOptions];

// Horizontal row of chips used to filter the menu list by course
// (Final PoE - "Search and Filter Menu Items"). Each chip shows how many
// dishes it would show, e.g. "Starter (2)", so the chef can see at a
// glance where the dishes are before tapping.
//
// counts - optional { [course]: number } from countByCourse()
export default function CourseFilterBar({ selected, onSelect, counts }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.bar}
      contentContainerStyle={styles.row}
    >
      {FILTER_OPTIONS.map((option) => {
        const count = counts?.[option];
        return (
          <Chip
            key={option}
            label={count === undefined ? option : `${option} (${count})`}
            active={selected === option}
            onPress={() => onSelect(option)}
            accessibilityLabel={`Filter by ${option}`}
            style={styles.chip}
          />
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
  },
});
