import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import CourseSelector from './CourseSelector';
import AppButton from './AppButton';
import { colors, spacing, radius } from '../theme/theme';
import {
  validateMenuItem,
  normalisePrice,
  NAME_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH,
} from '../utils/menuValidation';
import { showMessage } from '../utils/feedback';

const EMPTY_VALUES = { name: '', description: '', course: null, price: '' };

// The dish-details form. Both the Add screen and the Edit screen render
// this same component, so the chef learns one layout and one set of
// validation rules whether creating or changing a dish (Final PoE -
// "reusable components", "consistency and standards").
//
// Props:
//   initialValues - the dish being edited (omit when adding)
//   existingItems - the current menu, used to stop duplicate names
//   submitLabel   - text on the save button
//   onSubmit      - called with clean { name, description, course, price }
//   onCancel      - called when the chef taps Cancel
export default function MenuItemForm({
  initialValues,
  existingItems = [],
  submitLabel,
  onSubmit,
  onCancel,
}) {
  const startingValues = { ...EMPTY_VALUES, ...initialValues };
  const isEditing = Boolean(initialValues?.id);

  const [values, setValues] = useState({
    name: startingValues.name,
    description: startingValues.description,
    course: startingValues.course,
    price: startingValues.price === '' ? '' : Number(startingValues.price).toFixed(2),
  });
  const [errors, setErrors] = useState({});

  const descriptionRef = useRef(null);
  const priceRef = useRef(null);

  // Updates one field and clears its error message straight away, so the
  // red warning disappears as soon as the chef starts fixing it.
  function updateField(field, value) {
    setValues((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    }
  }

  function hasChanges(cleanValues) {
    return (
      cleanValues.name !== startingValues.name ||
      cleanValues.description !== startingValues.description ||
      cleanValues.course !== startingValues.course ||
      cleanValues.price !== Number(startingValues.price)
    );
  }

  function handleSubmit() {
    const nextErrors = validateMenuItem(values, existingItems, initialValues?.id);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      showMessage(
        'Please check the form',
        'Some details are missing or invalid. Fix the fields marked in red and try again.'
      );
      return;
    }

    const cleanValues = {
      name: values.name.trim(),
      description: values.description.trim(),
      course: values.course,
      price: parseFloat(normalisePrice(values.price)),
    };

    if (isEditing && !hasChanges(cleanValues)) {
      showMessage('No changes to save', 'You have not changed any details of this dish yet.');
      return;
    }

    onSubmit(cleanValues);
  }

  return (
    <View>
      <FieldLabel text="Dish Name" />
      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="e.g. Grilled Sirloin"
        placeholderTextColor={colors.textMuted}
        value={values.name}
        onChangeText={(text) => updateField('name', text)}
        maxLength={NAME_MAX_LENGTH}
        autoCapitalize="words"
        returnKeyType="next"
        onSubmitEditing={() => descriptionRef.current?.focus()}
        blurOnSubmit={false}
        accessibilityLabel="Dish name"
      />
      <FieldError message={errors.name} />

      <FieldLabel
        text="Description"
        hint={`${values.description.length}/${DESCRIPTION_MAX_LENGTH}`}
      />
      <TextInput
        ref={descriptionRef}
        style={[styles.input, styles.multiline, errors.description && styles.inputError]}
        placeholder="Short description of the dish..."
        placeholderTextColor={colors.textMuted}
        value={values.description}
        onChangeText={(text) => updateField('description', text)}
        maxLength={DESCRIPTION_MAX_LENGTH}
        multiline
        numberOfLines={3}
        returnKeyType="next"
        onSubmitEditing={() => priceRef.current?.focus()}
        accessibilityLabel="Dish description"
      />
      <FieldError message={errors.description} />

      <FieldLabel text="Course" />
      <CourseSelector
        selected={values.course}
        onSelect={(course) => updateField('course', course)}
        error={errors.course}
      />

      <FieldLabel text="Price" />
      <View style={[styles.priceRow, errors.price && styles.inputError]}>
        <Text style={styles.priceCurrency}>R</Text>
        <TextInput
          ref={priceRef}
          style={styles.priceInput}
          placeholder="145.00"
          placeholderTextColor={colors.textMuted}
          value={values.price}
          onChangeText={(text) => updateField('price', text)}
          keyboardType="decimal-pad"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
          accessibilityLabel="Dish price in rand"
        />
      </View>
      <FieldError message={errors.price} />

      <AppButton title={submitLabel} onPress={handleSubmit} style={styles.submitButton} />
      <AppButton title="Cancel" onPress={onCancel} variant="text" />
    </View>
  );
}

// Field title, with an optional hint on the right (e.g. a character count).
function FieldLabel({ text, hint }) {
  return (
    <View style={styles.labelRow}>
      <Text style={styles.label}>{text}</Text>
      {hint ? <Text style={styles.labelHint}>{hint}</Text> : null}
    </View>
  );
}

// Red message shown under a field when its value is invalid.
function FieldError({ message }) {
  return message ? <Text style={styles.errorText}>{message}</Text> : null;
}

const styles = StyleSheet.create({
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textDark,
  },
  labelHint: {
    fontSize: 11,
    color: colors.textMuted,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.textDark,
  },
  multiline: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  priceCurrency: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textGrey,
    marginRight: spacing.xs,
  },
  priceInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.textDark,
  },
  submitButton: {
    marginTop: spacing.lg,
  },
});
