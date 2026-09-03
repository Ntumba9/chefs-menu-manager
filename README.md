# Menu Management by Chef

React Native (Expo) mobile application created for Christoffel's restaurant,
which lets the chef manage the menu through a mobile device rather than a piece of paper.

This is the **Final Project of Expertise** submission. The submission is based on the app from part 2 (menu item adding & viewing) but includes more advanced features.
## Features

### Menu List (Home)

- Look through all the menu items of the chef in an easily scrollable,
  color tagged list
- Menu details in the header of the list: total number of menu items and
  average price
- **Search** the menu items by name in real-time, and there will be (x) to
  close search
- **Filter** menu items by their course (All / Starter / Main Course /
  Dessert)
- If you search or filter menu items, the header says "N of M shown"
- Two different empty states: “no menu items yet” (if the menu is empty) or
  “no dishes match” (if the search/filter returned no results)
- Floating "+" button for adding menu items
- Statistics button in the header

### Adding / Editing / Deleting a Menu Item

- Adding a new menu item: Menu item name, description, course, price
- Selecting any menu item from the list will make it editable 
  (the form will be pre-filled)
- Saving changes will edit the menu item; the list, search results,
  and stats will update automatically
- Deleting a menu item with a confirmation dialogue before deletion
- Validation on every input with error messages displayed next to
  the inputs and success message after adding/editing
- Both Adding and Editing use the same `MenuItemForm` component
  (identical screens)

### Statistics for menu

- Count of all dishes and average cost per dish
- Course-wise: count of dishes in each course and average cost per dish,
  matched in color with the course labels used in the list
- Empty state of its own, when the menu doesn’t contain any dish

### Throughout

- Uniform layout, spacing, and color palette on all six pages
  (reusable theme tokens defined in `src/theme/theme.js`)
- Layout takes into account safe area (header and floating button
  layout are compatible with device notches and home indicator bars)
- Icons native to the device rather than character text (using
  `@expo/vector-icons`)
- Keyboard-aware forms (keyboard navigation between fields
  using "next" and proper scrolling when keyboard is shown)

## Tech stack

- [Expo](https://expo.dev) SDK 54 (React Native 0.81)
- [React Navigation](https://reactnavigation.org) (native stack navigator)

## Project structure

```
index.js                      
App.js                         
src/
  theme/theme.js              
  hooks/
    useMenuItems.js            
  utils/
    menuStats.js               
  components/
    ScreenHeader.js            
    CourseSelector.js          
    CourseFilterBar.js        
    SearchBar.js              
    MenuItemForm.js           
    MenuItemCard.js         
    EmptyState.js              
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
   cannot reach the dev server on the local network
 



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
