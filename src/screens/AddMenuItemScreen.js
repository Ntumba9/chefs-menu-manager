import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import MenuItemForm from '../components/MenuItemForm';
import { colors, spacing } from '../theme/theme';

// Screen for adding a brand-new dish. The actual fields and validation
// live in the shared MenuItemForm; this screen only supplies the header
// and decides what happens on save.
export default function AddMenuItemScreen({ navigation, addMenuItem }) {
  function handleAdd(values) {
    addMenuItem(values);

    Alert.alert(
      'Menu item added',
      `"${values.name}" has been added to the menu.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 44 : 0}
    >
      <ScreenHeader title="Add Menu Item" onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        keyboardShouldPersistTaps="handled"
      >
        <MenuItemForm
          submitLabel="Save Menu Item"
          onSubmit={handleAdd}
          onCancel={() => navigation.goBack()}
        />
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
