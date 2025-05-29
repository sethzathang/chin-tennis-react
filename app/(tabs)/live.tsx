import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import liveMockData from '../data/liveMockData.json';

interface LiveEvent {
  id: number;
  tournament: string;
  match: string;
  url: string;
  date?: string;
}

interface LiveData {
  currentLive: LiveEvent[];
  pastEvents: LiveEvent[];
  tournaments: string[];
}

export default function LiveScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [liveUrl, setLiveUrl] = useState('');
  const [selectedTournament, setSelectedTournament] = useState('');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [data, setData] = useState<LiveData>({
    currentLive: [],
    pastEvents: [],
    tournaments: []
  });
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Simulating API fetch
    const fetchData = async () => {
      try {
        // In the future, this will be replaced with a real API call
        setData(liveMockData as LiveData);
        setSelectedTournament(liveMockData.tournaments[0]);
      } catch (error) {
        console.error('Error fetching live data:', error);
      }
    };

    fetchData();
  }, []);

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
      id: data.currentLive.length + 1,
      tournament: selectedTournament,
      match: `${player1} vs ${player2}`,
      date: 'Today',
      url: liveUrl,
    };
    setData(prev => ({
      ...prev,
      currentLive: [...prev.currentLive, newLive]
    }));
    setModalVisible(false);
    setLiveUrl('');
    setPlayer1('');
    setPlayer2('');
    setSelectedTournament(data.tournaments[0]);
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
          {data.currentLive.map((data) => (
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
            {data.pastEvents.map((data) => (
                <ThemedView key={data.id} style={styles.pastEventCard}>
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
                {data.tournaments.map(t => (
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