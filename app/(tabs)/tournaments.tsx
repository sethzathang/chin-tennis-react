import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ThemedText type="title" style={styles.header}>Tournaments</ThemedText>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {data.tournaments.map((t) => (
            <ThemedView key={t.id} style={styles.card}>
              <ThemedText type="defaultSemiBold" style={styles.tournamentName}>{t.name}</ThemedText>
              <ThemedText type="default" style={styles.tournamentDate}>{t.date}</ThemedText>
              <ThemedText type="default" style={styles.tournamentLocation}>{t.location}</ThemedText>
              {t.allowJoin && (
                <TouchableOpacity style={styles.joinButton} onPress={() => handleJoin(t.name)}>
                  <ThemedText type="defaultSemiBold" style={styles.joinButtonText}>Join</ThemedText>
                </TouchableOpacity>
              )}
            </ThemedView>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  container: { flex: 1, paddingHorizontal: 12, paddingVertical: 20, backgroundColor: 'transparent' },
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
  joinButton: { marginTop: 12, backgroundColor: '#1877f3', borderRadius: 6, paddingVertical: 10, paddingHorizontal: 16, borderWidth: 0, alignSelf: 'flex-end' },
  joinButtonText: { color: '#fff', fontSize: 16 },
}); 