import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../theme/theme';

// The app's one button component. Every full-width button (save,
// cancel, delete, the Welcome screen actions, "clear filters") uses it,
// so buttons look and feel the same on every screen.
//
// variant:
//   'primary'   - gold call-to-action (Save, View Menu)
//   'secondary' - outlined, for use on the dark green Welcome screen
//   'danger'    - red outline, for destructive actions (Delete)
//   'text'      - plain text link (Cancel, Clear filters)
export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  icon,
  accessibilityLabel,
  style,
}) {
  const variantStyles = VARIANTS[variant];

  return (
    <TouchableOpacity
      style={[styles.base, variantStyles.button, style]}
      onPress={onPress}
      activeOpacity={variant === 'text' ? 0.6 : 0.85}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
    >
      {icon ? (
        <Ionicons name={icon} size={18} color={variantStyles.text.color} />
      ) : null}
      <Text style={[styles.text, variantStyles.text]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    borderRadius: radius.md,
    paddingVertical: 14,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

const VARIANTS = {
  primary: StyleSheet.create({
    button: {
      backgroundColor: colors.accent,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
    text: { color: colors.white },
  }),
  secondary: StyleSheet.create({
    button: { borderWidth: 1, borderColor: colors.onPrimaryBorder },
    text: { color: colors.white, fontWeight: '600' },
  }),
  danger: StyleSheet.create({
    button: {
      borderWidth: 1,
      borderColor: colors.error,
      backgroundColor: colors.errorBg,
      paddingVertical: 12,
    },
    text: { color: colors.error, fontSize: 14 },
  }),
  text: StyleSheet.create({
    button: { paddingVertical: spacing.md },
    text: { color: colors.textGrey, fontSize: 13, fontWeight: '600' },
  }),
};
