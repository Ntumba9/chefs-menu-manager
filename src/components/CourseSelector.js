import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, courseOptions } from '../theme/theme';

// Tappable chip group used to pick a course. Reused as-is by the
// Add screen now, and will be reused again for filtering in the
// Final PoE, which is the point of pulling it out as its own
// component rather than writing the chips inline on one screen.
export default function CourseSelector({ selected, onSelect, error }) {
  return (
    <View>
      <View style={styles.row}>
        {courseOptions.map((option) => {
          const isActive = selected === option;
          return (
            <TouchableOpacity
              key={option}
              onPress={() => onSelect(option)}
              style={[styles.chip, isActive && styles.chipActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
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
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: -4,
    marginBottom: spacing.sm,
  },
});
