// Validation rules for a menu item, kept as plain functions outside the
// form so the rules are written once, are easy to read in one place,
// and can be checked without rendering any screen.

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 50;
export const DESCRIPTION_MAX_LENGTH = 200;
export const MAX_PRICE = 10000;

// A positive number with up to 2 decimal places, e.g. 145 or 145.50.
const PRICE_PATTERN = /^\d+(\.\d{1,2})?$/;

// Many South African phone keyboards type a comma as the decimal
// separator ("145,50"), so commas are accepted and treated as a point.
// Spaces and a leading "R" are ignored too.
export function normalisePrice(rawPrice) {
  return rawPrice.trim().replace(/^R/i, '').replace(/\s/g, '').replace(',', '.');
}

// Returns an object of { fieldName: message } for every invalid field.
// An empty object means the values are valid.
//
//   values        - { name, description, course, price } from the form
//   existingItems - the current menu, used to stop duplicate dish names
//   currentId     - id of the dish being edited (so it doesn't clash
//                   with its own name); undefined when adding
export function validateMenuItem(values, existingItems = [], currentId) {
  const errors = {};
  const name = values.name.trim();
  const description = values.description.trim();
  const price = normalisePrice(values.price);

  if (!name) {
    errors.name = 'Please enter a dish name.';
  } else if (name.length < NAME_MIN_LENGTH) {
    errors.name = `Dish name must be at least ${NAME_MIN_LENGTH} characters.`;
  } else if (name.length > NAME_MAX_LENGTH) {
    errors.name = `Dish name must be ${NAME_MAX_LENGTH} characters or fewer.`;
  } else if (isDuplicateName(name, existingItems, currentId)) {
    errors.name = `"${name}" is already on the menu. Please use a different name.`;
  }

  if (!description) {
    errors.description = 'Please enter a short description.';
  } else if (description.length > DESCRIPTION_MAX_LENGTH) {
    errors.description = `Description must be ${DESCRIPTION_MAX_LENGTH} characters or fewer.`;
  }

  if (!values.course) {
    errors.course = 'Please select a course.';
  }

  if (!price) {
    errors.price = 'Please enter a price.';
  } else if (!PRICE_PATTERN.test(price)) {
    errors.price = 'Price must be a number with up to 2 decimals, e.g. 145.50.';
  } else if (Number(price) <= 0) {
    errors.price = 'Price must be greater than zero.';
  } else if (Number(price) > MAX_PRICE) {
    errors.price = `Price must be R${MAX_PRICE} or less.`;
  }

  return errors;
}

function isDuplicateName(name, existingItems, currentId) {
  const lowerName = name.toLowerCase();
  return existingItems.some(
    (item) => item.id !== currentId && item.name.trim().toLowerCase() === lowerName
  );
}
