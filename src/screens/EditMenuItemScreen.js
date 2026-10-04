import React from 'react';
import { StyleSheet } from 'react-native';
import FormScreen from '../components/FormScreen';
import MenuItemForm from '../components/MenuItemForm';
import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import { spacing } from '../theme/theme';
import { showMessage, confirmAction } from '../utils/feedback';

// Screen for changing or removing an existing dish (Final PoE - "Manage
// Menu Items"). It reuses the same MenuItemForm as the Add screen, just
// pre-filled with the selected dish, and adds a Delete action.
//
// Only the dish's id is passed in the navigation params; the dish itself
// is looked up from the shared menu state, so this screen always shows
// the current version of the dish rather than a stale copy.
export default function EditMenuItemScreen({
  navigation,
  route,
  menuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
}) {
  const item = getMenuItemById(route.params.itemId);

  // The dish can disappear while this screen is still on the stack (for
  // example during the slide-out animation after deleting it). Show a
  // friendly message instead of crashing on a missing dish.
  if (!item) {
    return (
      <FormScreen title="Edit Menu Item" onBack={() => navigation.goBack()}>
        <EmptyState
          icon="alert-circle-outline"
          title="Dish not found"
          message="This dish is no longer on the menu."
          actionLabel="Back to menu"
          onAction={() => navigation.goBack()}
        />
      </FormScreen>
    );
  }

  function handleUpdate(values) {
    updateMenuItem(item.id, values);

    showMessage('Menu item updated', `"${values.name}" has been updated.`, () =>
      navigation.goBack()
    );
  }

  function handleDelete() {
    const deletedName = item.name;

    confirmAction({
      title: 'Delete menu item',
      message: `Remove "${deletedName}" from the menu? This cannot be undone.`,
      confirmLabel: 'Delete',
      destructive: true,
      onConfirm: () => {
        navigation.goBack();
        deleteMenuItem(item.id);
        showMessage('Menu item deleted', `"${deletedName}" has been removed from the menu.`);
      },
    });
  }

  return (
    <FormScreen title="Edit Menu Item" onBack={() => navigation.goBack()}>
      <MenuItemForm
        initialValues={item}
        existingItems={menuItems}
        submitLabel="Save Changes"
        onSubmit={handleUpdate}
        onCancel={() => navigation.goBack()}
      />

      <AppButton
        title="Delete this menu item"
        icon="trash-outline"
        variant="danger"
        onPress={handleDelete}
        accessibilityLabel={`Delete ${item.name}`}
        style={styles.deleteButton}
      />
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    marginTop: spacing.lg,
  },
});
