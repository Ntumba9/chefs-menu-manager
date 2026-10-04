import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { radius, getCourseColors } from '../theme/theme';

// The small colour-coded course label ("Starter", "Main Course",
// "Dessert"). Used on the menu cards and on the Statistics screen so a
// course always has the same colour wherever it appears.
export default function CourseTag({ course }) {
  const courseColors = getCourseColors(course);

  return (
    <View style={[styles.tag, { backgroundColor: courseColors.bg }]}>
      <Text style={[styles.tagText, { color: courseColors.text }]}>{course}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
