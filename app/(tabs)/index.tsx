import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UPCOMING_TOURNAMENTS = [
  { id: 1, date: 'Jun 10–12', name: 'Tournament A', location: 'State X' },
  { id: 2, date: 'Jun 10–12', name: 'Tournament B', location: 'State X' },
];

const RECENT_RESULTS = [
  { tournament: 'Tournament A', champ: 'Player A', runnerUp: 'Player B' },
  { tournament: 'Tournament B', champ: 'Player C', runnerUp: 'Player D' },
  { tournament: 'Tournament C', champ: 'Player E', runnerUp: 'Player F' },
  { tournament: 'Tournament D', champ: 'Player G', runnerUp: 'Player H' },
  { tournament: 'Tournament E', champ: 'Player I', runnerUp: 'Player J' },
];

export default function HomeScreen() {
  const handleSignUp = () => {
    Alert.alert('Sign Up', 'Sign up flow coming soon!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.header}>ChinTennis</ThemedText>

          {/* Upcoming Tournaments */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>Upcoming Tournaments</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tournamentsScroll} contentContainerStyle={styles.tournamentsRow}>
            {UPCOMING_TOURNAMENTS.map(t => (
              <View key={t.id} style={styles.tournamentCard}>
                <ThemedText type="defaultSemiBold" style={styles.tournamentDate}>{t.date}</ThemedText>
                <ThemedText type="default" style={styles.tournamentName}>{t.name}</ThemedText>
                <ThemedText type="default" style={styles.tournamentLocation}>{t.location}</ThemedText>
              </View>
            ))}
          </ScrollView>

          {/* Join Us Section */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>Join Us</ThemedText>
          <View style={styles.joinBox}>
            <TouchableOpacity style={styles.joinButton} onPress={handleSignUp}>
              <ThemedText type="defaultSemiBold" style={styles.joinButtonText}>Sign Up for Tournament</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Recent Results */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Results</ThemedText>
          <ScrollView style={styles.resultsScroll} showsVerticalScrollIndicator={true}>
            {RECENT_RESULTS.map((r, idx) => (
              <React.Fragment key={idx}>
                <View style={styles.resultRow}>
                  <ThemedText type="defaultSemiBold" style={styles.tournamentName}>{r.tournament}</ThemedText>
                  <View style={styles.champRow}>
                    <ThemedText type="default" style={styles.champ}>🏆 {r.champ}</ThemedText>
                  </View>
                  <View style={styles.runnerUpRow}>
                    <ThemedText type="default" style={styles.runnerUp}>2nd: {r.runnerUp}</ThemedText>
                  </View>
                </View>
                {idx < RECENT_RESULTS.length - 1 && <View style={styles.resultDivider} />}
              </React.Fragment>
            ))}
          </ScrollView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, padding: 20, backgroundColor: 'transparent' },
  header: { fontSize: 32, fontWeight: 'bold', marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  tournamentsScroll: { marginBottom: 8 },
  tournamentsRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 2 },
  tournamentCard: { backgroundColor: '#f2f2f2', borderRadius: 10, padding: 12, marginRight: 8, alignItems: 'center', minWidth: 120 },
  tournamentDate: { fontSize: 16, marginBottom: 4 },
  tournamentName: { fontSize: 16, fontWeight: 'bold', marginBottom: 2, textAlign: 'left' },
  tournamentLocation: { fontSize: 14, color: '#888' },
  joinBox: { backgroundColor: '#f2f2f2', borderRadius: 10, padding: 24, alignItems: 'center', marginBottom: 8 },
  joinButton: { backgroundColor: '#1877f3', borderRadius: 6, paddingVertical: 10, paddingHorizontal: 32, borderWidth: 0 },
  joinButtonText: { color: '#fff', fontSize: 18 },
  resultsScroll: { maxHeight: 220, marginTop: 8 },
  resultsBox: { backgroundColor: 'transparent', borderTopWidth: 1, borderColor: '#ccc', paddingBottom: 8 },
  resultRow: { borderBottomWidth: 1, borderColor: '#eee', paddingVertical: 10 },
  champRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  champ: { fontSize: 16, fontWeight: 'bold', color: '#222', textAlign: 'left' },
  runnerUpRow: { flexDirection: 'row', alignItems: 'center' },
  runnerUp: { fontSize: 15, color: '#666', textAlign: 'left' },
  resultDivider: { height: 1, backgroundColor: '#e0e0e0', marginVertical: 2, width: '100%' },
});
