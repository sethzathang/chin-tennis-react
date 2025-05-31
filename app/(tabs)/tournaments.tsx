import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {Alert, Platform, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import tournamentsMockData from '../data/tournamentsMockData.json';

interface Tournament {
  id: number;
  name: string;
  date: string;
  location: string;
  image: string;
  allowJoin: boolean;
}

interface TournamentsData {
  tournaments: Tournament[];
}

export default function TournamentsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [data, setData] = useState<TournamentsData>({
    tournaments: []
  });

  useEffect(() => {
    // Simulating API fetch
    const fetchData = async () => {
      try {
        // In the future, this will be replaced with a real API call
        setData(tournamentsMockData as TournamentsData);
      } catch (error) {
        console.error('Error fetching tournaments data:', error);
      }
    };

    fetchData();
  }, []);

  const handleJoin = (tournamentName: string) => {
    Alert.alert('Join Tournament', `Sign up for ${tournamentName} coming soon!`);
  };

  const handleViewDetails = (tournamentId: number, tournamentName: string) => {
    router.push({
      pathname: '/tournament-details',
      params: { id: tournamentId, name: tournamentName }
    });
  };

  // Calculate bottom padding based on platform and device
  const bottomPadding = Platform.select({
    ios: insets.bottom + 55, // Tab bar height (55) + bottom safe area
    android: 4 // Tab bar height (4) + bottom safe area
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ThemedText type="title" style={styles.header}>Tournaments</ThemedText>
        <ScrollView
            contentContainerStyle={[styles.scrollContainer, { paddingBottom: bottomPadding }]}
            showsVerticalScrollIndicator={false}
        >
          {data.tournaments.map((t) => (
            <ThemedView key={t.id} style={styles.card}>
              <ThemedText type="defaultSemiBold" style={styles.tournamentName}>{t.name}</ThemedText>
              <ThemedText type="default" style={styles.tournamentDate}>{t.date}</ThemedText>
              <ThemedText type="default" style={styles.tournamentLocation}>{t.location}</ThemedText>
              <View style={styles.buttonContainer}>
                {t.allowJoin && (
                  <TouchableOpacity style={styles.joinButton} onPress={() => handleJoin(t.name)}>
                    <ThemedText type="defaultSemiBold" style={styles.joinButtonText}>Join</ThemedText>
                  </TouchableOpacity>
                )}
                <TouchableOpacity 
                  style={styles.detailsButton} 
                  onPress={() => handleViewDetails(t.id, t.name)}
                >
                  <ThemedText type="defaultSemiBold" style={styles.detailsButtonText}>View Details</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  container: { flex: 1, paddingHorizontal: 12, backgroundColor: 'transparent' },
  scrollContainer: { flexGrow: 1 },
  header: { fontSize: 32, fontWeight: 'bold', marginBottom: 16 },
  card: { 
    borderRadius: 10, 
    padding: 16, 
    marginBottom: 12, 
  },
  tournamentName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  tournamentDate: { fontSize: 16, marginBottom: 2, opacity: 0.7 },
  tournamentLocation: { fontSize: 14, opacity: 0.7 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 8
  },
  joinButton: { 
    backgroundColor: '#1877f3', 
    borderRadius: 6, 
    paddingVertical: 10, 
    paddingHorizontal: 16, 
    borderWidth: 0
  },
  joinButtonText: { color: '#fff', fontSize: 16 },
  detailsButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 0
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16
  }
}); 