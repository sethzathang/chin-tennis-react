import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import homeMockData from '../data/homeMockData.json';

interface HomeData {
  upcomingTournaments: {
    id: number;
    name: string;
    date: string;
    location: string;
  }[];
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState<HomeData>({
    upcomingTournaments: []
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

  // Calculate bottom padding based on platform and device
  const bottomPadding = Platform.select({
    ios: insets.bottom + 55, // Tab bar height (55) + bottom safe area
    android: 6 // Tab bar height (55) + bottom safe area
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ThemedText type="title" style={styles.header}>Chin Tennis</ThemedText>
        
        {/* Upcoming Tournaments */}
        <ThemedText type="subtitle" style={styles.sectionTitle}>Upcoming Tournaments</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tournamentsScroll} contentContainerStyle={styles.tournamentsRow}>
          {data.upcomingTournaments.map((t) => (
            <ThemedView key={t.id} style={styles.tournamentCard}>
              <ThemedText type="defaultSemiBold" style={styles.tournamentName}>{t.name}</ThemedText>
              <ThemedText type="default" style={styles.tournamentDate}>{t.date}</ThemedText>
              <ThemedText type="default" style={styles.tournamentLocation}>{t.location}</ThemedText>
            </ThemedView>
          ))}
        </ScrollView>

        <ThemedText type="subtitle" style={styles.sectionTitle}>Important Announcements</ThemedText>
        <ScrollView
            style={styles.announcementScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: bottomPadding }}>
          <ThemedText type="default" style={{ backgroundColor: '#fff', padding: 12}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of enetreset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of enetreset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </ThemedText>
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
    backgroundColor: 'transparent'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
  tournamentsScroll: {
    marginBottom: 0,
    maxHeight: 150
  },
  tournamentsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 2
  },
  tournamentCard: { 
    borderRadius: 10, 
    padding: 16, 
    marginRight: 12, 
    minWidth: 200,
    height: 150,
    justifyContent: 'center',
  },
  tournamentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  tournamentDate: {
    fontSize: 16,
    marginBottom: 4,
    opacity: 0.7
  },
  tournamentLocation: {
    fontSize: 14,
    opacity: 0.7
  },
  announcementScroll: {
    flex: 1,
  }
});
