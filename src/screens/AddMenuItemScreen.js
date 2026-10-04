import React from 'react';
import FormScreen from '../components/FormScreen';
import MenuItemForm from '../components/MenuItemForm';
import { showMessage } from '../utils/feedback';

// Screen for adding a brand-new dish. The page layout comes from
// FormScreen and the fields and validation from MenuItemForm; this
// screen only decides what happens on save.
export default function AddMenuItemScreen({ navigation, menuItems, addMenuItem }) {
  function handleAdd(values) {
    addMenuItem(values);

    showMessage('Menu item added', `"${values.name}" has been added to the menu.`, () =>
      navigation.goBack()
    );
  }

  return (
    <FormScreen title="Add Menu Item" onBack={() => navigation.goBack()}>
      <MenuItemForm
        existingItems={menuItems}
        submitLabel="Save Menu Item"
        onSubmit={handleAdd}
        onCancel={() => navigation.goBack()}
      />
    </FormScreen>
  );
}
