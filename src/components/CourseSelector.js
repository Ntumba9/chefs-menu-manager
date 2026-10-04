import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Chip from './Chip';
import { colors, spacing, courseOptions } from '../theme/theme';

// Chip group used on the Add / Edit form to pick a dish's course. Built
// from the same Chip component as the Home screen's course filter, so
// choosing a course looks the same everywhere in the app.
export default function CourseSelector({ selected, onSelect, error }) {
  return (
    <View>
      <View style={styles.row}>
        {courseOptions.map((option) => (
          <Chip
            key={option}
            label={option}
            active={selected === option}
            onPress={() => onSelect(option)}
            style={styles.chip}
          />
        ))}
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
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: -4,
    marginBottom: spacing.sm,
  },
});
