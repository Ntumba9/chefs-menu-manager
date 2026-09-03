import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import MenuItemForm from '../components/MenuItemForm';
import { colors, spacing, radius } from '../theme/theme';

// Screen for changing or removing an existing dish (Final PoE - "Manage
// Menu Items"). It reuses the same MenuItemForm as the Add screen, just
// pre-filled with the selected dish, and adds a Delete action.
export default function EditMenuItemScreen({
  navigation,
  route,
  updateMenuItem,
  deleteMenuItem,
}) {
  const { item } = route.params;

  function handleUpdate(values) {
    updateMenuItem(item.id, values);

    Alert.alert(
      'Menu item updated',
      `"${values.name}" has been updated.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  }

  function handleDelete() {
    Alert.alert(
      'Delete menu item',
      `Remove "${item.name}" from the menu? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteMenuItem(item.id);
            navigation.goBack();
          },
        },
      ]
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 44 : 0}
    >
      <ScreenHeader title="Edit Menu Item" onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        keyboardShouldPersistTaps="handled"
      >
        <MenuItemForm
          initialValues={item}
          submitLabel="Save Changes"
          onSubmit={handleUpdate}
          onCancel={() => navigation.goBack()}
        />

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Delete ${item.name}`}
        >
          <Ionicons name="trash-outline" size={18} color={colors.error} />
          <Text style={styles.deleteButtonText}>Delete this menu item</Text>
        </TouchableOpacity>
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
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.lg,
    paddingVertical: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.error,
    backgroundColor: colors.errorBg,
  },
  deleteButtonText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: '700',
  },
});
