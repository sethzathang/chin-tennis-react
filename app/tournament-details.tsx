import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import tournamentDetailsMockData from './data/tournamentDetailsMockData.json';

interface Player {
  name: string;
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
        const mockData = tournamentDetailsMockData as TournamentDetails;
        // Ensure all players have points, defaulting to 0 if undefined
        mockData.registeredPlayers = mockData.registeredPlayers.map(player => ({
          ...player,
          points: player.points ?? 0
        }));
        // Sort players by points in descending order
        mockData.registeredPlayers.sort((a, b) => b.points - a.points);
        setTournament(mockData);
      } catch (error) {
        console.error('Error fetching tournament details:', error);
      }
    };

    fetchTournamentDetails();
  }, [params.id, params.name]);

  //Place this at the very top
  Stack.Screen({
    options: {
      title: "Tournament Details",
      headerBackTitle: "Back",
      headerShown: true
    }
  });

  if (!tournament) {
    return (
      <View style={styles.safeArea}>
        <View style={styles.container}>
          <ThemedText type="title">Loading...</ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <ThemedView style={styles.infoCard}>
          <ThemedText type="defaultSemiBold" style={styles.infoText}>Date: {tournament.date}</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.infoText}>Location: {tournament.location}</ThemedText>
        </ThemedView>

        <ThemedText type="subtitle" style={styles.sectionTitle}>Registered Players</ThemedText>
        <ScrollView style={styles.playersList}>
          {tournament.registeredPlayers.map((player, index) => (
            <ThemedView key={index} style={styles.playerCard}>
              <View style={styles.playerInfo}>
                <ThemedText type="defaultSemiBold" style={styles.playerName}>{player.name}</ThemedText>
                <ThemedText type="default" style={styles.playerRank}>Rank #{index + 1}</ThemedText>
              </View>
              <ThemedText type="defaultSemiBold" style={styles.playerPoints}>{player.points} pts</ThemedText>
            </ThemedView>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  container: {
    flex: 1,
    padding: 12,
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
  playerPoints: {
    fontSize: 16,
    color: '#4CAF50'
  },
  playerRank: {
    fontSize: 12,
    color: '#999'
  }
}); 