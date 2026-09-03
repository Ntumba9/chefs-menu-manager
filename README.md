# Chef's Menu Manager

A React Native (Expo) mobile application built for Christoffel's restaurant,
allowing the chef to manage the menu from a mobile device instead of paper.

This is the **Final PoE** submission. It builds on the Part 2 app (add and
view menu items) and adds full menu management, search, filtering, menu
statistics and a round of refactoring.

## Features

### Menu list (Home)

- View the chef's full menu in a scrollable, colour-tagged list
- Menu summary in the list header: total number of dishes and their
  average price
- **Search** menu items by name, in real time, with a clear (x) button
- **Filter** menu items by course (All / Starter / Main Course / Dessert)
- When a search or filter is active the header shows "N of M shown"
- Two distinct empty states: "no menu items yet" (menu is empty) and
  "no dishes match" (search/filter matched nothing)
- A floating "+" button to add a new dish
- A statistics button in the header

### Add / Edit / Delete a menu item

- Add a new dish: Dish Name, Description, Course, Price
- Tap any dish in the list to open it for editing (form pre-filled)
- Save Changes updates the dish; the list, search results and
  statistics all update immediately
- Delete a dish, with a confirmation dialog first
- Validation on every field with inline error messages, and a success
  message after add / update
- Add and Edit share one `MenuItemForm` component, so the two screens
  stay identical and only need to be maintained once

### Menu statistics

- Total number of dishes and overall average price
- Per-course breakdown: how many dishes each course has and its
  average price, colour-matched to the course tags used in the list
- Its own empty state when the menu has no dishes yet

### Throughout

- Consistent layout, spacing and colour system across all six screens
  (shared design tokens in `src/theme/theme.js`)
- Safe-area aware layout (headers and the floating button respect
  notches and home indicators on real devices)
- Native icons (via `@expo/vector-icons`) instead of text characters
- Keyboard-aware forms: "next" moves focus field to field and the form
  scrolls correctly when the keyboard is open

## Tech stack

- [Expo](https://expo.dev) SDK 54 (React Native 0.81)
- [React Navigation](https://reactnavigation.org) (native stack navigator)

## Project structure

```
index.js                       Expo entry point (registerRootComponent)
App.js                         Sets up navigation; owns the menu via useMenuItems
src/
  theme/theme.js               Shared colours, spacing, radii and course-tag colours
  hooks/
    useMenuItems.js            Single source of truth for the menu (add/update/delete)
  utils/
    menuStats.js               computeMenuStats() and formatPrice() helpers
  components/
    ScreenHeader.js            Reusable header bar (title, subtitle, back, right action)
    CourseSelector.js          Chip-style course picker used by the form
    CourseFilterBar.js         "All + course" chips used to filter the list
    SearchBar.js               Search-by-name input with a clear button
    MenuItemForm.js            Shared Dish Name / Description / Course / Price form
    MenuItemCard.js            One tappable menu item in the list
    EmptyState.js              Configurable icon + message for empty / no-results
  screens/
    WelcomeScreen.js           Landing screen (entry point of the app)
    HomeScreen.js              Menu list: search, filter, summary, tap to edit
    AddMenuItemScreen.js       Add a dish (wraps MenuItemForm)
    EditMenuItemScreen.js      Edit or delete a dish (wraps MenuItemForm)
    MenuStatisticsScreen.js    Totals and per-course averages
```

## Application flow

```
Welcome ──"View Menu"──▶ Home ──"+"──────────▶ Add Menu Item
        └─"Add a Dish"──▶ Add   ──tap a dish──▶ Edit Menu Item ──Delete──▶ (confirm) ─▶ Home
                                └─stats icon──▶ Menu Statistics
```

## Running the project

1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npx expo start
   ```
3. Scan the QR code with **Expo Go** on your phone (Android/iOS), or press
   `a` for an Android emulator / `i` for an iOS simulator. If the phone
   cannot reach the dev server on the local network, use
   `npx expo start --tunnel`.

## Validation rules

| Field       | Rule                                                     |
|-------------|----------------------------------------------------------|
| Dish Name   | Required                                                 |
| Description | Required                                                 |
| Course      | Must select one of Starter / Main Course / Dessert       |
| Price       | Required, a valid number, greater than zero (e.g. 145.00)|

---

# Change log (Part 2 → Final PoE)

## New features

- **Edit menu items.** Tapping a dish opens a new `EditMenuItemScreen`
  pre-filled with its details; "Save Changes" calls `updateMenuItem`.
- **Delete menu items.** The Edit screen has a "Delete this menu item"
  button that asks for confirmation before removing the dish.
- **Search by name.** New `SearchBar` component on Home filters the list
  live as the chef types; case-insensitive; clear (x) button.
- **Filter by course.** New `CourseFilterBar` component (All / Starter /
  Main Course / Dessert). Search and filter apply together.
- **Menu statistics.** New `MenuStatisticsScreen` reachable from a header
  button: total dishes, overall average price, and per-course count and
  average price.
- **Welcome screen.** New `WelcomeScreen` landing page ("View Menu" /
  "Add a Dish") set as the initial route.
- **Menu summary on Home.** The list header shows the total dish count
  and average price, and switches to "N of M shown" while filtering.
- **Second empty state.** `EmptyState` is now configurable so it can say
  either "No menu items yet" or "No dishes match".

## Refactoring

- **`useMenuItems` hook.** Menu state and the add / update / delete
  logic moved out of `App.js` into `src/hooks/useMenuItems.js`, so every
  screen changes the menu through one place and all views stay in sync.
- **`MenuItemForm` component.** The dish form (fields + validation) was
  extracted from `AddMenuItemScreen` into a shared component; `Add` and
  `Edit` are now thin wrappers around it.
- **`menuStats` util.** Statistics maths and price formatting moved to
  `src/utils/menuStats.js` (`computeMenuStats`, `formatPrice`) and reused
  by Home, the card and the statistics screen instead of being repeated.
- **`ScreenHeader`** gained an optional `rightAction` prop for
  screen-level buttons (used for the statistics button), replacing what
  would have been a one-off header on Home.
- **Unique ids.** New items now get a timestamp + random-suffix id
  instead of `Date.now()` alone, which could collide.
- **Tighter validation.** Price must now be greater than zero, not just
  numeric.
- **Entry point.** Switched from the deprecated `expo/AppEntry.js` to a
  project `index.js` with `registerRootComponent` (Expo SDK 54 default),
  and removed an invalid `expo-status-bar` entry from `app.json` plugins.
- **Naming and comments.** Consistent handler names (`handleAdd`,
  `handleUpdate`, `handleDelete`), and every file has a short comment
  explaining why it exists.
