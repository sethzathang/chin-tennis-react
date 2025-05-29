import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import homeMockData from '../data/homeMockData.json';

interface Tournament {
  id: number;
  date: string;
  name: string;
  location: string;
}

interface Result {
  tournament: string;
  champ: string;
  runnerUp: string;
}

interface HomeData {
  upcomingTournaments: Tournament[];
  recentResults: Result[];
}

export default function HomeScreen() {
  const [data, setData] = useState<HomeData>({
    upcomingTournaments: [],
    recentResults: []
  });

  useEffect(() => {
    // Simulating API fetch
    const fetchData = async () => {
      try {
        // In the future, this will be replaced with a real API call
        setData(homeMockData as HomeData);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.header}>ChinTennis</ThemedText>

          {/* Upcoming Tournaments */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>Upcoming Tournaments</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tournamentsScroll} contentContainerStyle={styles.tournamentsRow}>
            {data.upcomingTournaments.map(t => (
              <ThemedView key={t.id} style={styles.tournamentCard}>
                <ThemedText type="defaultSemiBold" style={styles.tournamentDate}>{t.date}</ThemedText>
                <ThemedText type="default" style={styles.tournamentName}>{t.name}</ThemedText>
                <ThemedText type="default" style={styles.tournamentLocation}>{t.location}</ThemedText>
              </ThemedView>
            ))}
          </ScrollView>

          {/* Recent Results */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Results</ThemedText>
          <ThemedView style={styles.resultsBox}>
            <ScrollView style={styles.resultsScroll} showsVerticalScrollIndicator={true}>
              {data.recentResults.map((r, idx) => (
                  <View key={idx} style={styles.resultRow}>
                    <ThemedText type="defaultSemiBold" style={styles.tournamentName}>{r.tournament}</ThemedText>
                    <View style={styles.champRow}>
                      <ThemedText type="default" style={styles.champ}>🏆 {r.champ}</ThemedText>
                    </View>
                    <View style={styles.runnerUpRow}>
                      <ThemedText type="default" style={styles.runnerUp}>2nd: {r.runnerUp}</ThemedText>
                    </View>
                  </View>
              ))}
            </ScrollView>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  scrollContainer: { flexGrow: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 20,
    backgroundColor: 'transparent'
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12
  },
  tournamentsScroll: {
    marginBottom: 8,
    maxHeight: 120
  },
  tournamentsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 2
  },
  tournamentCard: { 
    borderRadius: 10, 
    padding: 8, 
    marginRight: 8, 
    alignItems: 'center', 
    justifyContent: 'center',
    minWidth: 200,
    height: 120,
  },
  tournamentDate: {
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center'
  },
  tournamentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center'
  },
  tournamentLocation: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center'
  },
  resultsScroll: {
    flex: 1,
  },
  resultsBox: { 
    paddingBottom: 8,
    borderRadius: 10,
  },
  resultRow: { 
    paddingVertical: 10, 
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  champRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    width: '100%'
  },
  champ: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  runnerUpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  runnerUp: {
    fontSize: 15,
    opacity: 0.7,
    textAlign: 'left'
  }
});
