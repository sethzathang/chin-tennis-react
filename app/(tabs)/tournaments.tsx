import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TOURNAMENTS = [
  { id: 1, name: 'Tournament A', date: 'Jun 10–12', location: 'Texas', image: require('@/assets/images/icon.png'), allowJoin: true },
  { id: 2, name: 'Tournament B', date: 'Jul 8–10', location: 'California', image: require('@/assets/images/icon.png'), allowJoin: false },
  { id: 3, name: 'Tournament C', date: 'Aug 5–7', location: 'Oklahoma', image: require('@/assets/images/icon.png'), allowJoin: true },
  { id: 4, name: 'Tournament D', date: 'Aug 26–28', location: 'Missouri', image: require('@/assets/images/icon.png'), allowJoin: false },
  { id: 5, name: 'Tournament E', date: 'Sep 16–18', location: 'Arkansas', image: require('@/assets/images/icon.png'), allowJoin: true },
];

export default function TournamentsScreen() {
  const handleJoin = (tournamentName: string) => {
    Alert.alert('Join Tournament', `Sign up for ${tournamentName} coming soon!`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.header}>Tournaments</ThemedText>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {TOURNAMENTS.map(t => (
            <View key={t.id} style={styles.card}>
              <View style={styles.cardRow}>
                <Image source={t.image} style={styles.stateImage} resizeMode="contain" />
                <View style={styles.cardInfo}>
                  <ThemedText type="subtitle" style={styles.tournamentName}>{t.name}</ThemedText>
                  <ThemedText type="default" style={styles.tournamentInfo}>{t.date}</ThemedText>
                  <ThemedText type="default" style={styles.tournamentInfo}>{t.location}</ThemedText>
                  {t.allowJoin && (
                    <TouchableOpacity style={styles.joinButton} onPress={() => handleJoin(t.name)}>
                      <ThemedText type="defaultSemiBold" style={styles.joinButtonText}>Join</ThemedText>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  container: { flex: 1, padding: 20, backgroundColor: 'transparent' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, textAlign: 'left' },
  scrollContainer: { paddingBottom: 24 },
  card: { 
    backgroundColor: '#f2f2f2', 
    borderRadius: 12, 
    padding: 20, 
    marginBottom: 16, 
    shadowColor: '#000', 
    shadowOpacity: 0.05, 
    shadowRadius: 4, 
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  stateImage: { width: 70, height: 70, marginRight: 16 },
  cardInfo: { flex: 1, justifyContent: 'center' },
  tournamentName: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  tournamentInfo: { fontSize: 16, color: '#555', marginBottom: 4 },
  joinButton: { marginTop: 12, backgroundColor: '#1877f3', borderRadius: 6, paddingVertical: 10, paddingHorizontal: 16, borderWidth: 0, alignSelf: 'flex-end' },
  joinButtonText: { color: '#fff', fontSize: 16 },
}); 