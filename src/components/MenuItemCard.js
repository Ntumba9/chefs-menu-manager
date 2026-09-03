import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, getCourseColors } from '../theme/theme';
import { formatPrice } from '../utils/menuStats';

// Renders a single menu item row. Tapping the card opens it for editing
// or deleting (Final PoE - "Manage Menu Items"), so the whole card is a
// touchable and a chevron hints that it leads somewhere.
export default function MenuItemCard({ item, onPress }) {
  const courseColors = getCourseColors(item.course);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Edit ${item.name}`}
    >
      <View style={styles.cardTopRow}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>
      {item.description ? (
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      ) : null}
      <View style={styles.cardBottomRow}>
        <View style={[styles.tag, { backgroundColor: courseColors.bg }]}>
          <Text style={[styles.tagText, { color: courseColors.text }]}>
            {item.course}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
    flexShrink: 1,
    marginRight: spacing.sm,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  description: {
    fontSize: 13,
    color: colors.textGrey,
    marginTop: 4,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  tag: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
