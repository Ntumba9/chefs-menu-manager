import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import EmptyState from '../components/EmptyState';
import CourseTag from '../components/CourseTag';
import { colors, spacing, radius, getCourseColors, RESTAURANT_NAME } from '../theme/theme';
import { computeMenuStats, formatPrice } from '../utils/menuStats';

// Shows a summary of the whole menu (Final PoE - "Display Menu
// Statistics"):
//   - total number of dishes and the average price of all dishes,
//   - the number of dishes (and their average price) in each course,
//     with a bar showing each course's share of the menu,
//   - the most and least expensive dishes, for a sense of price range.
// The per-course rows use the same tag colours as the menu list so the
// two screens read as one system. Because the numbers are worked out
// from the shared menu state every time, they are always up to date
// after an add, edit or delete.
export default function MenuStatisticsScreen({ navigation, menuItems }) {
  const { totalItems, averagePrice, byCourse, cheapestItem, mostExpensiveItem } =
    computeMenuStats(menuItems);

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Menu Statistics"
        subtitle={RESTAURANT_NAME}
        onBack={() => navigation.goBack()}
      />

      {totalItems === 0 ? (
        <EmptyState
          icon="stats-chart-outline"
          title="No statistics yet"
          message="Add some dishes to the menu and their totals and averages will show up here."
          actionLabel="Add a dish"
          onAction={() => navigation.navigate('AddMenuItem')}
        />
      ) : (
        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
          <View style={styles.summaryRow}>
            <SummaryTile label="Total dishes" value={String(totalItems)} />
            <SummaryTile label="Average price" value={formatPrice(averagePrice)} />
          </View>

          <Text style={styles.sectionTitle}>Dishes per course</Text>
          {byCourse.map((row) => (
            <View key={row.course} style={styles.courseRow}>
              <View style={styles.courseTopRow}>
                <CourseTag course={row.course} />
                <View style={styles.courseNumbers}>
                  <Text style={styles.courseCount}>
                    {row.count} {row.count === 1 ? 'dish' : 'dishes'}
                  </Text>
                  <Text style={styles.courseAverage}>
                    {row.count > 0 ? `avg ${formatPrice(row.averagePrice)}` : 'No dishes yet'}
                  </Text>
                </View>
              </View>
              <ShareBar percent={row.share} color={getCourseColors(row.course).text} />
              <Text style={styles.shareLabel}>{row.share}% of the menu</Text>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Price range</Text>
          <PriceHighlight label="Most expensive" item={mostExpensiveItem} />
          <PriceHighlight label="Least expensive" item={cheapestItem} />
        </ScrollView>
      )}
    </View>
  );
}

// One labelled number in the summary row at the top of the screen.
function SummaryTile({ label, value }) {
  return (
    <View style={styles.tile}>
      <Text style={styles.tileValue}>{value}</Text>
      <Text style={styles.tileLabel}>{label}</Text>
    </View>
  );
}

// Thin horizontal bar filled to `percent`, used to show how much of the
// menu each course makes up.
function ShareBar({ percent, color }) {
  return (
    <View style={styles.barTrack}>
      <View style={[styles.barFill, { width: `${percent}%`, backgroundColor: color }]} />
    </View>
  );
}

// A row naming one dish and its price, e.g. "Most expensive - Ribeye".
function PriceHighlight({ label, item }) {
  return (
    <View style={styles.highlightRow}>
      <View style={styles.highlightText}>
        <Text style={styles.highlightLabel}>{label}</Text>
        <Text style={styles.highlightName} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
      <Text style={styles.highlightPrice}>{formatPrice(item.price)}</Text>
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
  },
  bodyContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  tile: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    alignItems: 'center',
  },
  tileValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
  },
  tileLabel: {
    fontSize: 12,
    color: colors.textGrey,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textDark,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  courseRow: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  courseTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseNumbers: {
    alignItems: 'flex-end',
  },
  courseCount: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  courseAverage: {
    fontSize: 12,
    color: colors.textGrey,
    marginTop: 2,
  },
  barTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.background,
    marginTop: spacing.sm,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  shareLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  highlightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  highlightText: {
    flex: 1,
    marginRight: spacing.sm,
  },
  highlightLabel: {
    fontSize: 11,
    color: colors.textGrey,
  },
  highlightName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginTop: 2,
  },
  highlightPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
