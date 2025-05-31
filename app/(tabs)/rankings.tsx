import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import rankingsMockData from '../data/rankingsMockData.json';

interface Player {
  id: number;
  name: string;
  points: number;
}

interface RankingsData {
  players: Player[];
}

export default function RankingsScreen() {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState<RankingsData>({
    players: []
  });

  useEffect(() => {
    // Simulating API fetch
    const fetchData = async () => {
      try {
        // In the future, this will be replaced with a real API call
        const rawData = rankingsMockData as RankingsData;
        // Sort players by points in descending order
        const sortedPlayers = [...rawData.players].sort((a, b) => b.points - a.points);
        setData({ players: sortedPlayers });
      } catch (error) {
        console.error('Error fetching rankings data:', error);
      }
    };

    fetchData();
  }, []);

  // Calculate bottom padding based on platform and device
  const bottomPadding = Platform.select({
    ios: insets.bottom + 55, // Tab bar height (55) + bottom safe area
    android: 6 // Tab bar height (55) + bottom safe area
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ThemedText type="title" style={styles.header}>Rankings</ThemedText>
        
        {/* Rankings Header */}
        <ThemedView style={styles.headerRow}>
          <ThemedText type="defaultSemiBold" style={styles.rankHeader}>Rank</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.nameHeader}>Player</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.pointsHeader}>Points</ThemedText>
        </ThemedView>

        {/* Rankings List */}
        <ScrollView 
          style={styles.rankingsList} 
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: bottomPadding }}
        >
          {data.players.map((player, index) => (
            <ThemedView key={player.id} style={styles.playerRow}>
              <ThemedText type="defaultSemiBold" style={styles.rank}>#{index + 1}</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.playerName}>{player.name}</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.points}>{player.points}</ThemedText>
            </ThemedView>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 20,
    backgroundColor: 'transparent'
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 8
  },
  rankHeader: {
    width: 50,
    fontSize: 16
  },
  nameHeader: {
    flex: 1,
    fontSize: 16
  },
  pointsHeader: {
    width: 80,
    fontSize: 16,
    textAlign: 'right'
  },
  rankingsList: {
    flex: 1
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 8
  },
  rank: {
    width: 50,
    fontSize: 16,
    color: '#4CAF50'
  },
  playerName: {
    flex: 1,
    fontSize: 16
  },
  points: {
    width: 80,
    fontSize: 16,
    textAlign: 'right',
    color: '#4CAF50'
  }
}); 