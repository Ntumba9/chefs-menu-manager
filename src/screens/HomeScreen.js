import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import SearchBar from '../components/SearchBar';
import CourseFilterBar, { ALL_COURSES } from '../components/CourseFilterBar';
import MenuItemCard from '../components/MenuItemCard';
import EmptyState from '../components/EmptyState';
import { colors, spacing, radius } from '../theme/theme';
import { computeMenuStats, formatPrice } from '../utils/menuStats';

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
  const visibleItems = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return menuItems.filter((item) => {
      const matchesCourse =
        courseFilter === ALL_COURSES || item.course === courseFilter;
      const matchesSearch =
        query === '' || item.name.toLowerCase().includes(query);
      return matchesCourse && matchesSearch;
    });
  }, [menuItems, searchText, courseFilter]);

  const hasAnyItems = totalItems > 0;
  const isFiltering = searchText.trim() !== '' || courseFilter !== ALL_COURSES;

  function openEditScreen(item) {
    navigation.navigate('EditMenuItem', { item });
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Menu Manager"
        subtitle="Christoffel's Kitchen"
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
            <CourseFilterBar selected={courseFilter} onSelect={setCourseFilter} />
          </>
        ) : null}

        {!hasAnyItems ? (
          <EmptyState />
        ) : visibleItems.length === 0 ? (
          <EmptyState
            icon="search-outline"
            title="No dishes match"
            message="Try a different name or course filter."
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
  listContent: {
    paddingTop: spacing.md,
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
