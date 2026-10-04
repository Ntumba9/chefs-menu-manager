import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppButton from './AppButton';
import { colors, spacing } from '../theme/theme';

// A centred icon + message used whenever a screen has nothing to show.
// It takes props so the same component can explain different situations
// (Final PoE - "appropriate empty-state messaging"):
//   - the menu is genuinely empty,
//   - a search / filter matched no dishes, or
//   - there are no statistics yet.
// An optional action button gives the chef a way out (e.g. "Clear
// search & filters") instead of a dead end.
export default function EmptyState({
  icon = 'restaurant-outline',
  title = 'No menu items yet',
  message = 'Tap the + button below to add your first dish to the menu.',
  actionLabel,
  onAction,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={32} color={colors.textMuted} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{message}</Text>
      {actionLabel && onAction ? (
        <AppButton title={actionLabel} onPress={onAction} variant="text" style={styles.action} />
      ) : null}
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
  action: {
    marginTop: spacing.sm,
  },
});
