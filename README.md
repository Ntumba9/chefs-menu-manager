# Chef's Menu Manager

React Native (Expo) mobile application created for Christoffel's restaurant,
which lets the chef manage the menu on a mobile device instead of on paper.

This is the **Final Portfolio of Evidence (PoE)** submission. It builds on
the Part 2 app (adding and viewing menu items) and adds menu management,
search and filtering, menu statistics, and a round of refactoring and UX
improvements.

## Video demonstration

▶️ **[Watch the app demo on YouTube](https://youtu.be/Oq46crFxqYI)**: https://youtu.be/Oq46crFxqYI

## Features

### Welcome screen

- Landing page that introduces the app, with **View Menu** and **Add a
  Dish** buttons.

### Menu list (Home)

- Scrollable list of every dish, with course labels in colour, built
  with React Native's `FlatList` component (Meta Platforms, Inc., n.d.b).
- The list header shows the total number of dishes and the average
  price, or "N of M shown" while a search or filter is active.
- **Search** by dish name. Results update live as you type, the search
  ignores upper/lower case, and the (x) button clears it.
- **Filter** by course (All / Starter / Main Course / Dessert). Each chip
  shows how many dishes it holds, e.g. "Starter (2)". Search and filter
  work together.
- If nothing matches, the message says what was searched for, e.g.
  _No dishes named "soup" in Dessert_. A **Clear search & filters**
  button resets everything in one tap.
- Separate empty state when the menu has no dishes yet.
- A hint line, "Tap a dish to edit or delete it.", tells the chef what
  the cards do.
- Floating **+** button to add a dish, and a statistics button in the
  header.

### Add / Edit / Delete a menu item

- **Add**: dish name, description, course and price.
- **Edit**: tapping a dish opens it with the form already filled in.
  "Save Changes" updates the dish, and the list, search results and
  statistics update straight away.
- **Delete**: the Edit screen has a "Delete this menu item" button. It
  asks for confirmation first and shows a message once the dish is
  removed.
- Success messages after every add, edit and delete.
- Validation, with an error shown under each field:
  - every field is required
  - the name must be 2–50 characters and **must not duplicate** an
    existing dish (case-insensitive)
  - the description is limited to 200 characters, with a live counter
  - the price must be a number above 0 and no more than R10 000, with at
    most 2 decimal places. **"145,50" (comma) and "R145" are accepted.**
- A field's error message disappears as soon as the chef starts fixing
  it.
- Saving an edit with nothing changed shows "No changes to save" instead
  of a misleading success message.
- Add and Edit use the same `MenuItemForm`, so the two screens look and
  behave the same.

### Menu statistics

- Total number of dishes and average price of all dishes.
- For each course: number of dishes, average price, and a bar showing
  that course's percentage of the menu. Colours match the course labels
  in the list.
- Price range: the most expensive and least expensive dishes.
- Its own empty state, with an **Add a dish** button, when the menu is
  empty.

### Throughout

- The same layout, spacing and colours on all five screens, using shared
  theme tokens from `src/theme/theme.js` (no colour values hard-coded in
  screens).
- Shared components for buttons, chips, course tags, headers and empty
  states, so every screen looks the same.
- Safe-area aware: the header and floating button stay clear of notches
  and the home indicator, using `react-native-safe-area-context`
  (Expo, n.d.d).
- Icons come from `@expo/vector-icons` (Expo, n.d.c), using the Ionicons
  icon set (Ionic, n.d.).
- Keyboard-friendly forms: "next" moves between fields, "done" on the
  price field submits, and the screen scrolls clear of the keyboard using
  React Native's `KeyboardAvoidingView` (Meta Platforms, Inc., n.d.c).
- Accessibility labels on every button and input.
- Messages and confirmations also work in the web build (React Native's
  `Alert` does nothing on web).

## Tech stack

- Expo SDK 57 (React Native 0.86). The project was set up and is run
  with Expo and the Expo Go app (Expo, n.d.a). Open it with an up-to-date
  Expo Go app from the App Store / Play Store.
- React Navigation 7, using the native stack navigator to move between
  screens (React Navigation, n.d.).
- React hooks (`useState`, `useMemo`, `useCallback`, `useRef`) for state
  and performance (Meta Platforms, Inc., n.d.a).

## Project structure

```
index.js                     Entry point (registerRootComponent)
App.js                       Navigation + shared menu state
src/
  theme/theme.js             Colours, spacing, radii, course list, restaurant name
  hooks/
    useMenuItems.js          Menu state: add / update / delete / find by id
  utils/
    menuStats.js             Statistics maths + price formatting
    menuFilters.js           Search + course filter logic, chip counts
    menuValidation.js        Form validation rules + price normalising
    feedback.js              Success / error / confirm messages (mobile + web)
  components/
    AppButton.js             The app's one button (primary/secondary/danger/text)
    Chip.js                  Tappable pill used by the course picker and filter
    CourseTag.js             Colour-coded course label
    CourseSelector.js        Course picker on the form
    CourseFilterBar.js       Course filter on Home (with counts)
    SearchBar.js             Search box with clear button
    MenuItemForm.js          Shared Add/Edit form with validation
    MenuItemCard.js          One dish in the list
    EmptyState.js            Icon + message + optional action
    ScreenHeader.js          Header bar with back / right action
    FormScreen.js            Shared layout for the Add and Edit screens
  screens/
    WelcomeScreen.js
    HomeScreen.js
    AddMenuItemScreen.js
    EditMenuItemScreen.js
    MenuStatisticsScreen.js
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
3. Scan the QR code with Expo Go on your phone (Android/iOS), or press
   `a` for an Android emulator / `i` for an iOS simulator. If the phone
   cannot reach the dev server on the local network, start it with
   `npx expo start --tunnel` instead.

### Running in a web browser (no phone needed)

```
npx expo start --web
```

Expo runs the app in the browser through React Native for Web
(Expo, n.d.b). The app opens in your browser at `http://localhost:8081`. For a phone-like
view, open the browser's developer tools and turn on device / mobile view
(F12, then Ctrl+Shift+M in Chrome or Edge).

Menu items are kept in memory while the app is running, so the menu
starts empty each time the app is opened.

---

# Change log (Part 2 → Final PoE)

## New features

- **Edit menu items.** Tapping a dish opens the new `EditMenuItemScreen`
  with its details already filled in. "Save Changes" calls
  `updateMenuItem`.
- **Delete menu items.** The Edit screen has a "Delete this menu item"
  button. It asks for confirmation, then shows a success message after
  removing the dish.
- **Search by name.** New `SearchBar` component on Home. It filters the
  list live as the chef types, ignores upper/lower case, and has a clear
  (x) button.
- **Filter by course.** New `CourseFilterBar` component (All / Starter /
  Main Course / Dessert), with a count on each chip. Search and filter
  work together.
- **Clear search & filters.** The "No dishes match" state explains what
  was searched for and offers a one-tap reset.
- **Menu statistics.** New `MenuStatisticsScreen`, opened from a header
  button. It shows total dishes, overall average price, per-course count
  and average price, each course's share of the menu as a bar, and the
  most and least expensive dishes.
- **Welcome screen.** New `WelcomeScreen` landing page ("View Menu" /
  "Add a Dish"), set as the first screen.
- **Menu summary on Home.** The list header shows the total dish count
  and average price, and switches to "N of M shown" while filtering.
- **Better empty states.** `EmptyState` now takes options, so it can
  say "No menu items yet", "No dishes match" or "No statistics yet", and
  can show an action button.

## Validation and user feedback

- Duplicate dish names are rejected (case-insensitive; when editing, a
  dish does not clash with its own name).
- Name must be 2–50 characters; description is limited to 200
  characters with a live counter.
- Price must be greater than zero and at most R10 000. A comma decimal
  ("145,50") and a leading "R" are now accepted. Before, a phone keyboard
  set to South African number format could not enter a valid price.
- Each field's error message clears as soon as the chef edits that
  field.
- A "Please check the form" message appears when saving with errors, and
  a "No changes to save" message when saving an unchanged edit.
- Success messages after add, edit **and delete** (before, delete gave
  no feedback).
- Messages and confirmations go through `utils/feedback.js`, which falls
  back to browser dialogs on web. Before, the Add/Edit screens never
  returned to the menu on web because `Alert` callbacks do not fire
  there.

## Refactoring

- **`useMenuItems` hook.** Menu state and the add / update / delete /
  find-by-id logic moved out of `App.js` into `src/hooks/useMenuItems.js`.
  Every screen changes the menu through this one place, so all views stay
  in sync. This follows the custom hook approach for sharing stateful
  logic described in the React documentation (Meta Platforms, Inc., n.d.d).
- **`MenuItemForm` component.** The dish form was moved out of
  `AddMenuItemScreen` into a shared component. Its state is now a single
  `values` object, with small `FieldLabel` / `FieldError` helpers.
- **`menuValidation` util.** Validation rules moved out of the form into
  plain functions (`validateMenuItem`, `normalisePrice`), with the limits
  stored as named constants.
- **`menuFilters` util.** Search and course filtering moved out of
  `HomeScreen` into `filterMenuItems` and `countByCourse`.
- **`menuStats` util.** Statistics maths and price formatting
  (`computeMenuStats`, `formatPrice`) now live in one place and are reused
  by Home, the card and the statistics screen. Repeated averaging code was
  merged into a single `averagePriceOf` helper.
- **`feedback` util.** Every `Alert.alert` call was replaced by
  `showMessage` / `confirmAction`, so messages look and behave the same
  everywhere.
- **New reusable components:**
  - `AppButton` replaces five hand-styled buttons (form save/cancel,
    delete, Welcome screen buttons).
  - `Chip` replaces two copies of identical chip styles in
    `CourseSelector` and `CourseFilterBar`.
  - `CourseTag` replaces copies of the course label in `MenuItemCard`
    and `MenuStatisticsScreen`.
  - `FormScreen` replaces the KeyboardAvoidingView + header + ScrollView
    setup that was repeated in the Add and Edit screens. Those screens
    are now short wrappers.
- **Edit screen looks dishes up by id.** Home passes only `itemId`, and
  the Edit screen reads the current dish from shared state. Before, it
  received a copy of the dish that could go out of date. If the dish no
  longer exists, the screen shows a friendly "Dish not found" message
  instead of crashing.
- **`ScreenHeader`** gained an optional `rightAction` prop for
  screen-level buttons (used for the statistics button).
- **Theme tokens.** Hard-coded colours on the Welcome screen and header
  (`#BFD4C8`, `#D8E4DC`, `#3C5B4D`) moved into `theme.js` as
  `onPrimaryMuted`, `onPrimarySoft` and `onPrimaryBorder`. The restaurant
  name is now one `RESTAURANT_NAME` constant instead of being repeated in
  three screens.
- **Unique ids.** New items get a timestamp plus a random suffix as
  their id, instead of `Date.now()` alone, which could collide.
- **Entry point.** Switched from the deprecated `expo/AppEntry.js` to a
  project `index.js` with `registerRootComponent` (the Expo SDK
  default), and removed an invalid `expo-status-bar` entry from the
  `app.json` plugins.
- **Dependencies.** Added the missing `expo-font` peer dependency
  required by `@expo/vector-icons`. `npx expo-doctor` now passes all
  checks.
- **Upgraded to Expo SDK 57.** The project moved from SDK 54 (React
  Native 0.81) to SDK 57 (React Native 0.86, React 19.2) so it opens in
  the current Expo Go app, which only supports the latest SDK on iPhone.
  React Navigation moved from v6 (no longer supported) to v7; the app's
  navigation code did not need to change. The `expo-status-bar` config
  plugin was added back to `app.json`, where it is valid in SDK 57.
- **Web support.** Added `react-dom` and `react-native-web` so the app
  also runs in a browser with `npx expo start --web`. Messages and
  confirmations use browser dialogs there (see `utils/feedback.js`).
- **Naming and comments.** Handler names are consistent (`handleAdd`,
  `handleUpdate`, `handleDelete`, `clearSearchAndFilters`), and every
  file starts with a short comment explaining why it exists.

---

# Declaration of AI use

I used Claude, an AI assistant (Anthropic, 2026), while completing this
Final PoE. I built the original Part 2 application myself. For this
submission, I used Claude to:

- review my application against the PoE requirements and rubric
- suggest and implement improvements: bug fixes, extra validation,
  search and filter enhancements, additional menu statistics, and
  refactoring into reusable components and utility functions
- draft the README change log, the references and the submission
  document

I reviewed and tested all of the changes, upgraded the project to Expo
SDK 57, and recorded the video demonstration myself. I understand the
code in this submission and can explain how it works.

---

# References

Anthropic. 2026. *Claude (Opus 5.5)* [Large language model]. Available at: https://claude.ai [Accessed 5 October 2026].

Expo. n.d.a. *Create a project*. [Online]. Available at: https://docs.expo.dev/get-started/create-a-project/ [Accessed 20 September 2026].

Expo. n.d.b. *Develop websites with Expo*. [Online]. Available at: https://docs.expo.dev/workflow/web/ [Accessed 20 September 2026].

Expo. n.d.c. *Expo Vector Icons*. [Online]. Available at: https://docs.expo.dev/guides/icons/ [Accessed 20 September 2026].

Expo. n.d.d. *react-native-safe-area-context*. [Online]. Available at: https://docs.expo.dev/versions/latest/sdk/safe-area-context/ [Accessed 20 September 2026].

Ionic. n.d. *Ionicons: Premium Open Source Icon Pack for Ionic Framework*. [Online]. Available at: https://ionic.io/ionicons [Accessed 20 September 2026].

Meta Platforms, Inc. n.d.a. *Built-in React Hooks*. [Online]. Available at: https://react.dev/reference/react/hooks [Accessed 20 September 2026].

Meta Platforms, Inc. n.d.b. *FlatList*. [Online]. Available at: https://reactnative.dev/docs/flatlist [Accessed 20 September 2026].

Meta Platforms, Inc. n.d.c. *KeyboardAvoidingView*. [Online]. Available at: https://reactnative.dev/docs/keyboardavoidingview [Accessed 20 September 2026].

Meta Platforms, Inc. n.d.d. *Reusing Logic with Custom Hooks*. [Online]. Available at: https://react.dev/learn/reusing-logic-with-custom-hooks [Accessed 20 September 2026].

React Navigation. n.d. *Native Stack Navigator*. [Online]. Available at: https://reactnavigation.org/docs/native-stack-navigator [Accessed 20 September 2026].
