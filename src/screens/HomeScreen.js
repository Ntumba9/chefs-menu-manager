import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import SearchBar from '../components/SearchBar';
import CourseFilterBar from '../components/CourseFilterBar';
import MenuItemCard from '../components/MenuItemCard';
import EmptyState from '../components/EmptyState';
import { colors, spacing, radius, RESTAURANT_NAME } from '../theme/theme';
import { computeMenuStats, formatPrice } from '../utils/menuStats';
import { ALL_COURSES, filterMenuItems, countByCourse } from '../utils/menuFilters';

// The chef's full menu. Shows every dish, lets the chef search by name
// and filter by course (Final PoE - "Search and Filter"), summarises the
// menu at the top, and links to the full Statistics screen. Tapping a
// dish opens it for editing or deleting; the "+" button adds a new one.
export default function HomeScreen({ navigation, menuItems }) {
  const insets = useSafeAreaInsets();

  const [searchText, setSearchText] = useState('');
  const [courseFilter, setCourseFilter] = useState(ALL_COURSES);

  const { totalItems, averagePrice } = computeMenuStats(menuItems);

  // Apply the search text and the course filter together.
  const visibleItems = useMemo(
    () => filterMenuItems(menuItems, { searchText, course: courseFilter }),
    [menuItems, searchText, courseFilter]
  );
  const courseCounts = useMemo(
    () => countByCourse(menuItems, searchText),
    [menuItems, searchText]
  );

  const hasAnyItems = totalItems > 0;
  const isFiltering = searchText.trim() !== '' || courseFilter !== ALL_COURSES;

  // Only the id is passed; the Edit screen looks the dish up itself so
  // it always works with the latest version of it.
  function openEditScreen(item) {
    navigation.navigate('EditMenuItem', { itemId: item.id });
  }

  function clearSearchAndFilters() {
    setSearchText('');
    setCourseFilter(ALL_COURSES);
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Menu Manager"
        subtitle={RESTAURANT_NAME}
        onBack={() => navigation.goBack()}
        rightAction={{
          icon: 'stats-chart',
          label: 'View menu statistics',
          onPress: () => navigation.navigate('MenuStatistics'),
        }}
      />

      <View style={styles.body}>
        <View style={styles.listHeaderRow}>
          <Text style={styles.listHeaderTitle}>Menu Items</Text>
          <Text style={styles.listHeaderCount}>
            {isFiltering && hasAnyItems
              ? `${visibleItems.length} of ${totalItems} shown`
              : `${totalItems} ${totalItems === 1 ? 'dish' : 'dishes'}${
                  hasAnyItems ? `  ·  avg ${formatPrice(averagePrice)}` : ''
                }`}
          </Text>
        </View>

        {hasAnyItems ? (
          <>
            <SearchBar
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search dishes by name"
            />
            <CourseFilterBar
              selected={courseFilter}
              onSelect={setCourseFilter}
              counts={courseCounts}
            />
            {visibleItems.length > 0 ? (
              <Text style={styles.hint}>Tap a dish to edit or delete it.</Text>
            ) : null}
          </>
        ) : null}

        {!hasAnyItems ? (
          <EmptyState />
        ) : visibleItems.length === 0 ? (
          <EmptyState
            icon="search-outline"
            title="No dishes match"
            message={buildNoMatchMessage(searchText, courseFilter)}
            actionLabel="Clear search & filters"
            onAction={clearSearchAndFilters}
          />
        ) : (
          <FlatList
            data={visibleItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MenuItemCard item={item} onPress={openEditScreen} />
            )}
            contentContainerStyle={[
              styles.listContent,
              { paddingBottom: insets.bottom + 96 },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </View>

      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + spacing.lg }]}
        onPress={() => navigation.navigate('AddMenuItem')}
        accessibilityLabel="Add a new menu item"
        accessibilityRole="button"
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={28} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

// Explains exactly what was searched for when nothing matched, e.g.
// No dishes named "soup" in Dessert.
function buildNoMatchMessage(searchText, courseFilter) {
  const query = searchText.trim();
  const namePart = query ? ` named "${query}"` : '';
  const coursePart = courseFilter !== ALL_COURSES ? ` in ${courseFilter}` : '';
  return `No dishes${namePart}${coursePart}. Try a different name or course.`;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  listHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  listHeaderCount: {
    fontSize: 12,
    color: colors.textGrey,
  },
  hint: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  listContent: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl * 2,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: radius.pill + 4,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
});
