import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import homeMockData from '../data/homeMockData.json';

interface TournamentImage {
  id: number;
  url: string;
  caption: string;
}

interface HomeData {
  upcomingTournaments: {
    id: number;
    name: string;
    date: string;
    location: string;
  }[];
  tournamentImages: TournamentImage[];
}

export default function HomeScreen() {
  const [data, setData] = useState<HomeData>({
    upcomingTournaments: [],
    tournamentImages: []
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
      <View style={styles.container}>
        <ThemedText type="title" style={styles.header}>Home</ThemedText>
        
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

        {/* Tournament Images */}
        <ThemedText type="subtitle" style={styles.sectionTitle}>Tournament Gallery</ThemedText>
        <ScrollView style={styles.imagesScroll} showsVerticalScrollIndicator={false}>
          {data.tournamentImages.map((image) => (
            <ThemedView key={image.id} style={styles.imageCard}>
              <Image source={{ uri: image.url }} style={styles.tournamentImage} />
              <ThemedText type="default" style={styles.imageCaption}>{image.caption}</ThemedText>
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
  imagesScroll: {
    flex: 1,
  },
  imageCard: {
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  tournamentImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  imageCaption: {
    fontSize: 14,
    marginTop: 8,
    opacity: 0.7,
    textAlign: 'center',
  },
});
