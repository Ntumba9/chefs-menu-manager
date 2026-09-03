import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CourseSelector from './CourseSelector';
import { colors, spacing, radius } from '../theme/theme';

// Matches a positive number with up to 2 decimal places, e.g. 145 or
// 145.50. Used to validate the Price field.
const PRICE_PATTERN = /^\d+(\.\d{1,2})?$/;

const EMPTY_VALUES = { name: '', description: '', course: null, price: '' };

// The dish-details form. Both the Add screen and the Edit screen render
// this same component, so the chef learns one layout and one set of
// validation rules whether creating or changing a dish (Final PoE -
// "reusable components", "consistency and standards").
export default function MenuItemForm({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}) {
  const startingValues = { ...EMPTY_VALUES, ...initialValues };

  const [name, setName] = useState(startingValues.name);
  const [description, setDescription] = useState(startingValues.description);
  const [course, setCourse] = useState(startingValues.course);
  const [price, setPrice] = useState(
    startingValues.price === '' ? '' : String(startingValues.price)
  );
  const [errors, setErrors] = useState({});

  const descriptionRef = useRef(null);
  const priceRef = useRef(null);

  function validate() {
    const nextErrors = {};

    if (!name.trim()) {
      nextErrors.name = 'Please enter a dish name.';
    }
    if (!description.trim()) {
      nextErrors.description = 'Please enter a short description.';
    }
    if (!course) {
      nextErrors.course = 'Please select a course.';
    }
    if (!price.trim()) {
      nextErrors.price = 'Please enter a price.';
    } else if (!PRICE_PATTERN.test(price.trim())) {
      nextErrors.price = 'Price must be a valid number, e.g. 145.00.';
    } else if (Number(price) <= 0) {
      nextErrors.price = 'Price must be greater than zero.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) {
      return;
    }

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      course,
      price: parseFloat(price),
    });
  }

  return (
    <View>
      <Text style={styles.label}>Dish Name</Text>
      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="e.g. Grilled Sirloin"
        placeholderTextColor={colors.textMuted}
        value={name}
        onChangeText={setName}
        returnKeyType="next"
        onSubmitEditing={() => descriptionRef.current?.focus()}
        blurOnSubmit={false}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <Text style={styles.label}>Description</Text>
      <TextInput
        ref={descriptionRef}
        style={[styles.input, styles.multiline, errors.description && styles.inputError]}
        placeholder="Short description of the dish..."
        placeholderTextColor={colors.textMuted}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        returnKeyType="next"
        onSubmitEditing={() => priceRef.current?.focus()}
      />
      {errors.description ? (
        <Text style={styles.errorText}>{errors.description}</Text>
      ) : null}

      <Text style={styles.label}>Course</Text>
      <CourseSelector selected={course} onSelect={setCourse} error={errors.course} />

      <Text style={styles.label}>Price</Text>
      <View style={[styles.priceRow, errors.price && styles.inputError]}>
        <Text style={styles.priceCurrency}>R</Text>
        <TextInput
          ref={priceRef}
          style={styles.priceInput}
          placeholder="145.00"
          placeholderTextColor={colors.textMuted}
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
          returnKeyType="done"
        />
      </View>
      {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        activeOpacity={0.85}
      >
        <Text style={styles.submitButtonText}>{submitLabel}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={onCancel}
        activeOpacity={0.6}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
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
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  cancelButtonText: {
    color: colors.textGrey,
    fontSize: 13,
    fontWeight: '600',
  },
});
