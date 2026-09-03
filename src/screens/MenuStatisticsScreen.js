import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import EmptyState from '../components/EmptyState';
import { colors, spacing, radius, getCourseColors } from '../theme/theme';
import { computeMenuStats, formatPrice } from '../utils/menuStats';

// Shows a summary of the whole menu (Final PoE - "Display Menu
// Statistics"): how many dishes there are in total, and for each course
// how many dishes it has and what they average in price. The per-course
// rows use the same tag colours as the menu list so the two screens
// read as one system.
export default function MenuStatisticsScreen({ navigation, menuItems }) {
  const { totalItems, averagePrice, byCourse } = computeMenuStats(menuItems);

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Menu Statistics"
        subtitle="Christoffel's Kitchen"
        onBack={() => navigation.goBack()}
      />

      {totalItems === 0 ? (
        <EmptyState
          icon="stats-chart-outline"
          title="No statistics yet"
          message="Add some dishes to the menu and their totals and averages will show up here."
        />
      ) : (
        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
        >
          <View style={styles.summaryRow}>
            <SummaryTile label="Total dishes" value={String(totalItems)} />
            <SummaryTile
              label="Average price"
              value={formatPrice(averagePrice)}
            />
          </View>

          <Text style={styles.sectionTitle}>By course</Text>
          {byCourse.map((row) => {
            const courseColors = getCourseColors(row.course);
            return (
              <View key={row.course} style={styles.courseRow}>
                <View
                  style={[styles.tag, { backgroundColor: courseColors.bg }]}
                >
                  <Text style={[styles.tagText, { color: courseColors.text }]}>
                    {row.course}
                  </Text>
                </View>
                <View style={styles.courseNumbers}>
                  <Text style={styles.courseCount}>
                    {row.count} {row.count === 1 ? 'dish' : 'dishes'}
                  </Text>
                  <Text style={styles.courseAverage}>
                    {row.count > 0 ? `avg ${formatPrice(row.averagePrice)}` : '—'}
                  </Text>
                </View>
              </View>
            );
          })}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  tag: {
    borderRadius: radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
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
});
