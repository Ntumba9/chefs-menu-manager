import React from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import ScreenHeader from './ScreenHeader';
import { colors, spacing } from '../theme/theme';

// Shared page layout for the Add and Edit screens: header with a back
// button, then a scrolling body that moves out of the way of the
// keyboard. Both screens previously repeated this setup line for line.
export default function FormScreen({ title, onBack, children }) {
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 44 : 0}
    >
      <ScreenHeader title={title} onBack={onBack} />

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  bodyContent: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
});
