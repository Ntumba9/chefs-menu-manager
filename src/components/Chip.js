import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../theme/theme';

// A single tappable pill. Both the course picker on the Add / Edit form
// and the course filter on Home are made of these, so they share one
// look and one "selected" style instead of two copies of the same
// styles that could drift apart.
export default function Chip({ label, active, onPress, accessibilityLabel, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive, style]}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={accessibilityLabel ?? label}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
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
