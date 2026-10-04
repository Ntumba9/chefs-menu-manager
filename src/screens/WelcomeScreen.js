import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import { colors, spacing, RESTAURANT_NAME } from '../theme/theme';

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
        <Text style={styles.subtitle}>{RESTAURANT_NAME}</Text>
        <Text style={styles.blurb}>
          Build and manage tonight's menu from your phone. Add, edit and
          remove dishes, find them quickly by name or course, and see
          menu statistics at a glance.
        </Text>
      </View>

      <View style={styles.actions}>
        <AppButton
          title="View Menu"
          onPress={() => navigation.navigate('Home')}
          accessibilityLabel="View the menu"
        />
        <AppButton
          title="Add a Dish"
          variant="secondary"
          onPress={() => navigation.navigate('AddMenuItem')}
          accessibilityLabel="Add a new dish"
        />
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
    color: colors.onPrimaryMuted,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  blurb: {
    fontSize: 14,
    color: colors.onPrimarySoft,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  actions: {
    gap: spacing.sm,
  },
});
