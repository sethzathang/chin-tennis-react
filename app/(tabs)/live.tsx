import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Alert, Linking, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_LIVE = [
  { id: 1, tournament: 'Summer Slam', match: 'John Smith vs Mike Johnson', url: 'https://facebook.com/live/123' },
  { id: 2, tournament: 'Coastal Classic', match: 'Sarah Williams vs Emma Davis', url: 'https://facebook.com/live/124' },
  { id: 3, tournament: 'Mountain Masters', match: 'David Lee vs James Wilson', url: 'https://facebook.com/live/125' },
];

const PAST_EVENTS = [
  { id: 1, tournament: 'Summer Slam', match: 'John Smith vs Mike Johnson', date: 'Jun 8', url: 'https://facebook.com/live/456' },
  { id: 2, tournament: 'Coastal Classic', match: 'Sarah Williams vs Emma Davis', date: 'Jun 6', url: 'https://facebook.com/live/789' },
  { id: 3, tournament: 'Mountain Masters', match: 'David Lee vs James Wilson', date: 'Jun 4', url: 'https://facebook.com/live/101' },
  { id: 4, tournament: 'City Championship', match: 'Lisa Chen vs Maria Garcia', date: 'Jun 2', url: 'https://facebook.com/live/102' },
  { id: 5, tournament: 'Beach Open', match: 'Tom Brown vs Chris Miller', date: 'May 30', url: 'https://facebook.com/live/103' },
  { id: 6, tournament: 'Summer Slam', match: 'Alex Turner vs Ryan Cooper', date: 'May 28', url: 'https://facebook.com/live/104' },
  { id: 7, tournament: 'Coastal Classic', match: 'Sophie Anderson vs Rachel Green', date: 'May 26', url: 'https://facebook.com/live/105' },
  { id: 8, tournament: 'Mountain Masters', match: 'Kevin Park vs Daniel Kim', date: 'May 24', url: 'https://facebook.com/live/106' },
  { id: 9, tournament: 'City Championship', match: 'Olivia Martinez vs Sophia Rodriguez', date: 'May 22', url: 'https://facebook.com/live/107' },
  { id: 10, tournament: 'Beach Open', match: 'Michael Chang vs Andrew Wong', date: 'May 20', url: 'https://facebook.com/live/108' },
  { id: 11, tournament: 'Summer Slam', match: 'Emily Taylor vs Jessica White', date: 'May 18', url: 'https://facebook.com/live/109' },
  { id: 12, tournament: 'Coastal Classic', match: 'Robert Johnson vs William Davis', date: 'May 16', url: 'https://facebook.com/live/110' },
  { id: 13, tournament: 'Mountain Masters', match: 'Jennifer Lee vs Michelle Kim', date: 'May 14', url: 'https://facebook.com/live/111' },
  { id: 14, tournament: 'City Championship', match: 'Thomas Wilson vs Richard Brown', date: 'May 12', url: 'https://facebook.com/live/112' },
  { id: 15, tournament: 'Beach Open', match: 'Amanda Clark vs Nicole Taylor', date: 'May 10', url: 'https://facebook.com/live/113' },
  { id: 16, tournament: 'Summer Slam', match: 'Christopher Lee vs Brian Park', date: 'May 8', url: 'https://facebook.com/live/114' },
  { id: 17, tournament: 'Coastal Classic', match: 'Victoria Chen vs Isabella Wang', date: 'May 6', url: 'https://facebook.com/live/115' },
  { id: 18, tournament: 'Mountain Masters', match: 'Daniel Martinez vs Carlos Rodriguez', date: 'May 4', url: 'https://facebook.com/live/116' },
  { id: 19, tournament: 'City Championship', match: 'Sophia Anderson vs Emma Wilson', date: 'May 2', url: 'https://facebook.com/live/117' },
  { id: 20, tournament: 'Beach Open', match: 'James Thompson vs Robert Clark', date: 'Apr 30', url: 'https://facebook.com/live/118' },
  { id: 21, tournament: 'Summer Slam', match: 'Sarah Johnson vs Emily Davis', date: 'Apr 28', url: 'https://facebook.com/live/119' },
  { id: 22, tournament: 'Coastal Classic', match: 'Michael Brown vs David Wilson', date: 'Apr 26', url: 'https://facebook.com/live/120' },
  { id: 23, tournament: 'Mountain Masters', match: 'Lisa Wang vs Maria Chen', date: 'Apr 24', url: 'https://facebook.com/live/121' },
  { id: 24, tournament: 'City Championship', match: 'Kevin Kim vs Daniel Park', date: 'Apr 22', url: 'https://facebook.com/live/122' },
  { id: 25, tournament: 'Beach Open', match: 'Olivia Taylor vs Sophia Anderson', date: 'Apr 20', url: 'https://facebook.com/live/123' },
];

const TOURNAMENTS = [
  'Tournament A',
  'Tournament B',
  'Tournament C',
  'Tournament D',
  'Tournament E',
];

export default function LiveScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [liveUrl, setLiveUrl] = useState('');
  const [selectedTournament, setSelectedTournament] = useState(TOURNAMENTS[0]);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [currentLive, setCurrentLive] = useState(MOCK_LIVE[0]);
  const colorScheme = useColorScheme();

  const handleCreateLive = () => {
    if (!liveUrl.startsWith('http')) {
      Alert.alert('Invalid URL', 'Please enter a valid Facebook Live URL.');
      return;
    }
    if (!player1.trim() || !player2.trim()) {
      Alert.alert('Missing Info', 'Please enter both player names.');
      return;
    }
    const newLive = {
      id: MOCK_LIVE.length + 1,
      tournament: selectedTournament,
      match: `${player1} vs ${player2}`,
      date: 'Today',
      url: liveUrl,
    };
    setCurrentLive(newLive);
    setModalVisible(false);
    setLiveUrl('');
    setPlayer1('');
    setPlayer2('');
    setSelectedTournament(TOURNAMENTS[0]);
  };

  const isFormValid = player1.trim() && player2.trim() && liveUrl.trim();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <ThemedText type="title" style={styles.header}>Live</ThemedText>
          <TouchableOpacity style={styles.createButton} onPress={() => setModalVisible(true)}>
            <ThemedText type="defaultSemiBold" style={styles.createButtonText}>Go Live</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Current Live Event */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.liveScroll} contentContainerStyle={styles.liveRow}>
          {MOCK_LIVE.map((data, index) => (
            <ThemedView key={data.id} style={styles.liveCard}>
              <ThemedText type="subtitle" style={styles.liveTitle}>{data.tournament}</ThemedText>
              <ThemedText type="default" style={styles.liveMatch}>{data.match}</ThemedText>
              <View style={styles.liveLabel}>
                <ThemedText type="defaultSemiBold" style={styles.liveLabelText}>LIVE</ThemedText>
              </View>
            </ThemedView>
          ))}
        </ScrollView>

        {/* Past Live Events */}
        <ThemedText type="subtitle" style={styles.sectionTitle}>Past Live Events</ThemedText>
        <ThemedView style={styles.pastEventsWrapper}>
          <ScrollView 
            style={styles.pastEventsScroll} 
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.pastEventsContent}
            nestedScrollEnabled={true}
          >
            {PAST_EVENTS.map((data, index) => (
                <ThemedView key={index} style={styles.pastEventCard}>
                  <View style={styles.pastEventInfo}>
                    <ThemedText type="defaultSemiBold" style={styles.pastEventTitle}>{data.tournament}</ThemedText>
                    <ThemedText type="default" style={styles.pastEventMatch}>{data.match}</ThemedText>
                  </View>
                  <TouchableOpacity style={styles.pastEventButton} onPress={() => Linking.openURL(data.url)}>
                    <ThemedText type="defaultSemiBold" style={styles.pastEventButtonText}>Watch</ThemedText>
                  </TouchableOpacity>
                </ThemedView>
            ))}
          </ScrollView>
        </ThemedView>

        {/* Modal for creating a live session */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <ThemedView style={styles.modalContent}>
              <ThemedText type="title" style={{ marginBottom: 12 }}>Go Live</ThemedText>
              <Picker
                selectedValue={selectedTournament}
                style={styles.picker}
                onValueChange={setSelectedTournament}
              >
                {TOURNAMENTS.map(t => (
                  <Picker.Item key={t} label={t} value={t} />
                ))}
              </Picker>
              <TextInput
                style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
                placeholder="Player 1 Name"
                value={player1}
                onChangeText={setPlayer1}
                placeholderTextColor="#888"
              />
              <TextInput
                style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
                placeholder="Player 2 Name"
                value={player2}
                onChangeText={setPlayer2}
                placeholderTextColor="#888"
              />
              <TextInput
                style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
                placeholder="Enter Facebook Live URL"
                value={liveUrl}
                onChangeText={setLiveUrl}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#888"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.modalButton, !isFormValid && styles.modalButtonDisabled]} onPress={handleCreateLive} disabled={!isFormValid}>
                  <ThemedText type="defaultSemiBold" style={styles.modalButtonText}>Save</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                  <ThemedText type="defaultSemiBold" style={styles.modalButtonText}>Cancel</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          </View>
        </Modal>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  liveScroll: {
    marginBottom: 0 ,
    maxHeight: 150
  },
  liveRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 2
  },
  liveCard: { 
    borderRadius: 12, 
    padding: 20, 
    marginRight: 12, 
    minWidth: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },
  liveMatch: {
    fontSize: 16,
    marginBottom: 12
  },
  liveLabel: {
    backgroundColor: '#D7263D',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 50,
  },
  liveLabelText: { 
    color: '#fff', 
    fontSize: 14,
  },
  createButton: {
    backgroundColor: '#1877f3',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 0,
    marginLeft: 8
  },
  createButtonText: {
    color: '#fff',
    fontSize: 15
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
  pastEventCard: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  pastEventInfo: {
    flex: 1
  },
  pastEventTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  pastEventMatch: {
    fontSize: 15
  },
  pastEventButton: {
    backgroundColor: '#D7263D',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-end'
  },
  pastEventButtonText: {
    color: '#fff',
    fontSize: 15
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: { 
    borderRadius: 12, 
    padding: 24, 
    width: '85%', 
    alignItems: 'center',
  },
  input: { 
    width: '100%', 
    borderWidth: 1, 
    borderColor: '#e0e0e0', 
    borderRadius: 6, 
    padding: 10, 
    marginBottom: 16, 
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#1877f3',
    borderRadius: 6,
    paddingVertical: 10,
    marginHorizontal: 4,
    alignItems: 'center'
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16
  },
  modalButtonDisabled: {
    opacity: 0.5
  },
  picker: {
    width: '100%',
    marginBottom: 12
  },
  pastEventsWrapper: {
    flex: 1,
    marginBottom: 0,
  },
  pastEventsScroll: {
    flex: 1,
  },
  pastEventsContent: {
    paddingBottom: 20,
  },
}); 