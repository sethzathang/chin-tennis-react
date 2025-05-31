import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, Modal, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import liveMockData from '../data/liveMockData.json';
import { formatDate } from '../utils/dateFormatter';

interface LiveEvent {
  id: number;
  tournament: string;
  match: string;
  url: string;
  date: string;
}

interface LiveData {
  currentLive: LiveEvent[];
  pastEvents: LiveEvent[];
  tournaments: string[];
}

export default function LiveScreen() {
  const insets = useSafeAreaInsets();
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
        const mockData = liveMockData as LiveData;
        // Sort past events by date in descending order (most recent first)
        mockData.pastEvents.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setData(mockData);
        setSelectedTournament(mockData.tournaments[0]);
      } catch (error) {
        console.error('Error fetching live data:', error);
      }
    };

    fetchData();
  }, []);

  // Calculate bottom padding based on platform and device
  const bottomPadding = Platform.select({
    ios: insets.bottom + 55, // Tab bar height (55) + bottom safe area
    android: 4 // Tab bar height (4) + bottom safe area
  });

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
      date: new Date().toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      }),
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
    <SafeAreaView style={styles.safeArea} edges={['top']}>
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
        <ScrollView
          style={styles.pastEventsScroll}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: bottomPadding }}
        >
          {data.pastEvents.map((event) => (
            <ThemedView key={event.id} style={styles.pastEventCard}>
              <View style={styles.pastEventInfo}>
                <ThemedText type="defaultSemiBold" style={styles.pastEventTitle}>{event.tournament}</ThemedText>
                <ThemedText type="default" style={styles.pastEventMatch}>{event.match}</ThemedText>
                <ThemedText type="default" style={styles.pastEventDate}>{formatDate(event.date)}</ThemedText>
              </View>
              <TouchableOpacity style={styles.pastEventButton} onPress={() => Linking.openURL(event.url)}>
                <ThemedText type="defaultSemiBold" style={styles.pastEventButtonText}>Watch</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          ))}
        </ScrollView>

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
    backgroundColor: 'transparent'
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  createButton: {
    backgroundColor: '#1877f3',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16
  },
  liveScroll: {
    marginBottom: 0,
    maxHeight: 150
  },
  liveRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 2
  },
  liveCard: {
    borderRadius: 10,
    padding: 16,
    marginRight: 12,
    minWidth: 200,
    height: 150,
    justifyContent: 'center',
  },
  liveTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  liveMatch: {
    fontSize: 16,
    marginBottom: 4,
    opacity: 0.7
  },
  liveLabel: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 8
  },
  liveLabelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    alignSelf: 'flex-start'
  },
  pastEventsScroll: {
    flex: 1,
  },
  pastEventCard: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pastEventInfo: {
    flex: 1
  },
  pastEventTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  pastEventMatch: {
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.7
  },
  pastEventDate: {
    fontSize: 14,
    opacity: 0.7
  },
  pastEventButton: {
    backgroundColor: '#1877f3',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 12
  },
  pastEventButtonText: {
    color: '#fff',
    fontSize: 14
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
  picker: {
    width: '100%',
    marginBottom: 16,
    color: '#000'
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
  modalButtonDisabled: {
    opacity: 0.5
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16
  }
}); 