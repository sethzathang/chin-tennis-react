import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react';
import { Image, Modal, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import homeMockData from '../data/homeMockData.json';

interface TournamentImage {
  url: string;
}

interface TournamentGallery {
  id: number;
  name: string;
  images: TournamentImage[];
}

interface HomeData {
  upcomingTournaments: {
    id: number;
    name: string;
    date: string;
    location: string;
  }[];
  tournamentImages: TournamentGallery[];
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState<HomeData>({
    upcomingTournaments: [],
    tournamentImages: []
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<TournamentGallery | null>(null);

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

  // Calculate bottom padding based on platform and device
  const bottomPadding = Platform.select({
    ios: insets.bottom + 55, // Tab bar height (55) + bottom safe area
    android: 6 // Tab bar height (55) + bottom safe area
  });

  const handleImagePress = (tournament: TournamentGallery) => {
    setSelectedTournament(tournament);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
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
        <ScrollView
            style={styles.imagesScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: bottomPadding }}
        >
          {data.tournamentImages.map((tournament) => (
            <TouchableOpacity 
              key={tournament.id} 
              style={styles.imageCard}
              onPress={() => handleImagePress(tournament)}
            >
              <Image source={{ uri: tournament.images[0].url }} style={styles.tournamentImage} />
              <ThemedText type="default" style={styles.imageCaption}>{tournament.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Image Gallery Modal */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <ThemedView style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <ThemedText type="defaultSemiBold" style={styles.closeButton}>Close</ThemedText>
                </TouchableOpacity>
              </View>
              <ScrollView
                style={styles.modalScroll}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{ paddingBottom: bottomPadding }}
              >
                {selectedTournament?.images.map((image, index) => (
                  <View key={index} style={styles.modalImageContainer}>
                    <Image source={{ uri: image.url }} style={styles.modalImage} />
                  </View>
                ))}
              </ScrollView>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    borderRadius: 12,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeButton: {
    fontSize: 16,
    color: '#1877f3',
  },
  modalScroll: {
    flex: 1,
  },
  modalImageContainer: {
    marginBottom: 16,
  },
  modalImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
});
