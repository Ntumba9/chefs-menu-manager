import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../theme/theme';

// The app's landing screen and the first thing the chef sees when the
// app opens. It introduces the app and then leads into the menu itself
// (Home). Keeping this separate from the menu list means the menu
// screen stays focused on one job: showing and adding dishes.
export default function WelcomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.screen,
        { paddingTop: insets.top + spacing.xl, paddingBottom: insets.bottom + spacing.lg },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.logoCircle}>
          <Ionicons name="restaurant" size={44} color={colors.white} />
        </View>
        <Text style={styles.title}>Chef's Menu Manager</Text>
        <Text style={styles.subtitle}>Christoffel's Kitchen</Text>
        <Text style={styles.blurb}>
          Build and manage tonight's menu from your phone. Add dishes,
          set their course and price, and see the whole menu at a glance.
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="View the menu"
        >
          <Text style={styles.primaryButtonText}>View Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('AddMenuItem')}
          activeOpacity={0.6}
          accessibilityRole="button"
          accessibilityLabel="Add a new dish"
        >
          <Text style={styles.secondaryButtonText}>Add a Dish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#BFD4C8',
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  blurb: {
    fontSize: 14,
    color: '#D8E4DC',
    textAlign: 'center',
    lineHeight: 21,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  actions: {
    gap: spacing.sm,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3C5B4D',
  },
  secondaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
