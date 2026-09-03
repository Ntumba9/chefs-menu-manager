import { useCallback, useMemo, useState } from 'react';

// Single source of truth for the menu.
//
// Every screen goes through this hook instead of touching the list
// directly, so an add / edit / delete made on one screen is reflected
// everywhere the moment it happens (Final PoE - "all changes are
// immediately reflected throughout the application"). Pulling it out
// of App.js also keeps the state logic in one small, testable place
// rather than spread across components.
export default function useMenuItems(initialItems = []) {
  const [menuItems, setMenuItems] = useState(initialItems);

  const addMenuItem = useCallback((newItem) => {
    setMenuItems((previousItems) => [
      { ...newItem, id: createId() },
      ...previousItems,
    ]);
  }, []);

  const updateMenuItem = useCallback((id, updatedFields) => {
    setMenuItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      )
    );
  }, []);

  const deleteMenuItem = useCallback((id) => {
    setMenuItems((previousItems) =>
      previousItems.filter((item) => item.id !== id)
    );
  }, []);

  const getMenuItemById = useCallback(
    (id) => menuItems.find((item) => item.id === id) ?? null,
    [menuItems]
  );

  return useMemo(
    () => ({
      menuItems,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      getMenuItemById,
    }),
    [menuItems, addMenuItem, updateMenuItem, deleteMenuItem, getMenuItemById]
  );
}

// Small unique-id helper. Date.now() alone can collide if two items are
// added in the same millisecond, so a random suffix is added.
function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
