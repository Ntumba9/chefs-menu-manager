import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme/theme';

// A centred icon + message used whenever the menu list has nothing to
// show. It takes props so the same component can explain two different
// situations (Final PoE - "appropriate empty-state messaging"):
//   - the menu is genuinely empty, or
//   - a search / filter matched no dishes.
export default function EmptyState({
  icon = 'restaurant-outline',
  title = 'No menu items yet',
  message = 'Tap the + button below to add your first dish to the menu.',
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={32} color={colors.textMuted} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xl * 2,
    paddingHorizontal: spacing.lg,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textGrey,
    textAlign: 'center',
    lineHeight: 18,
  },
});
