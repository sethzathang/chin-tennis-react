import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Player {
  id: number;
  name: string;
  rank: number;
  points: number;
}

interface TournamentDetails {
  id: number;
  name: string;
  date: string;
  location: string;
  registeredPlayers: Player[];
}

export default function TournamentDetailsScreen() {
  const params = useLocalSearchParams();
  const [tournament, setTournament] = useState<TournamentDetails | null>(null);

  useEffect(() => {
    // Simulating API fetch
    const fetchTournamentDetails = async () => {
      try {
        // In the future, this will be replaced with a real API call
        // For now, we'll use mock data
        const mockData: TournamentDetails = {
          id: Number(params.id),
          name: params.name as string,
          date: "Jun 10–12",
          location: "Texas",
          registeredPlayers: [
            { id: 1, name: "John Smith", rank: 1, points: 1500 },
            { id: 2, name: "Mike Johnson", rank: 2, points: 1450 },
            { id: 3, name: "Sarah Williams", rank: 3, points: 1400 },
            { id: 4, name: "Emma Davis", rank: 4, points: 1350 },
            { id: 5, name: "David Lee", rank: 5, points: 1300 },
          ]
        };
        setTournament(mockData);
      } catch (error) {
        console.error('Error fetching tournament details:', error);
      }
    };

    fetchTournamentDetails();
  }, [params.id, params.name]);

  if (!tournament) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ThemedText type="title">Loading...</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          title: "Tournament Details",
          headerBackTitle: "Back",
          headerShown: true
        }}
      />
      <View style={styles.container}>
        <ThemedView style={styles.infoCard}>
          <ThemedText type="defaultSemiBold" style={styles.infoText}>Date: {tournament.date}</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.infoText}>Location: {tournament.location}</ThemedText>
        </ThemedView>

        <ThemedText type="subtitle" style={styles.sectionTitle}>Registered Players</ThemedText>
        <ScrollView style={styles.playersList}>
          {tournament.registeredPlayers.map((player) => (
            <ThemedView key={player.id} style={styles.playerCard}>
              <View style={styles.playerInfo}>
                <ThemedText type="defaultSemiBold" style={styles.playerName}>{player.name}</ThemedText>
                <ThemedText type="default" style={styles.playerRank}>Rank #{player.rank}</ThemedText>
              </View>
              <ThemedText type="defaultSemiBold" style={styles.playerPoints}>{player.points} pts</ThemedText>
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
    paddingVertical: 12,
    backgroundColor: 'transparent'
  },
  infoCard: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 20
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12
  },
  playersList: {
    flex: 1
  },
  playerCard: {
    borderRadius: 10,
    padding: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  playerInfo: {
    flex: 1
  },
  playerName: {
    fontSize: 16,
    marginBottom: 4
  },
  playerRank: {
    fontSize: 14,
    opacity: 0.7
  },
  playerPoints: {
    fontSize: 16,
    color: '#4CAF50'
  }
}); 