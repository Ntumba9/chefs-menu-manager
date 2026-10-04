import { Alert, Platform } from 'react-native';

// One place for every success / error / confirmation message in the app,
// so they all look and behave the same way.
//
// React Native's Alert does nothing on the web build (its buttons and
// callbacks never fire), which would leave the chef stuck on a screen.
// These helpers fall back to the browser's own dialogs there, so the
// app behaves the same on a phone and in a browser.

// Shows a simple message with an OK button. `onClose` runs after the
// chef dismisses it (e.g. to go back to the menu).
export function showMessage(title, message, onClose) {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
    onClose?.();
    return;
  }

  Alert.alert(title, message, [{ text: 'OK', onPress: onClose }], {
    cancelable: false,
  });
}

// Asks the chef to confirm an action. `onConfirm` only runs if they
// choose the confirm button; cancelling does nothing.
export function confirmAction({
  title,
  message,
  confirmLabel = 'OK',
  destructive = false,
  onConfirm,
}) {
  if (Platform.OS === 'web') {
    if (window.confirm(`${title}\n\n${message}`)) {
      onConfirm();
    }
    return;
  }

  Alert.alert(title, message, [
    { text: 'Cancel', style: 'cancel' },
    {
      text: confirmLabel,
      style: destructive ? 'destructive' : 'default',
      onPress: onConfirm,
    },
  ]);
}
