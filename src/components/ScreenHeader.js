import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme/theme';

// A reusable header bar used by every screen, so the app has one
// consistent look for titles, back navigation and screen-level actions
// instead of each screen building its own header. Uses the device's
// safe-area inset so the title never sits under a notch or the phone's
// status bar.
//
// Props:
//   title, subtitle - text shown in the middle
//   onBack          - if given, shows a back chevron on the left
//   rightAction     - { icon, onPress, label } for an icon button on
//                     the right (e.g. "view statistics")
export default function ScreenHeader({ title, subtitle, onBack, rightAction }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
      {onBack ? (
        <TouchableOpacity
          onPress={onBack}
          style={styles.iconButton}
          accessibilityLabel="Go back"
          accessibilityRole="button"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={26} color={colors.white} />
        </TouchableOpacity>
      ) : null}

      <View style={styles.titleBlock}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {rightAction ? (
        <TouchableOpacity
          onPress={rightAction.onPress}
          style={styles.iconButton}
          accessibilityLabel={rightAction.label}
          accessibilityRole="button"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name={rightAction.icon} size={22} color={colors.white} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.onPrimaryMuted,
    fontSize: 12,
    marginTop: 2,
  },
});
