import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react';
import { Modal, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import profileMockData from '../data/profileMockData.json';
import { formatDate } from '../utils/dateFormatter';

interface TournamentPoints {
  id: number;
  tournament: string;
  points: number;
  rank: number;
  date: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  tournamentPoints: TournamentPoints[];
  totalPoints: number;
  overallRank: number;
}

interface ProfileData {
  user: User;
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [data, setData] = useState<ProfileData>({
    user: {
      firstName: '',
      lastName: '',
      email: '',
      avatar: '',
      tournamentPoints: [],
      totalPoints: 0,
      overallRank: 0
    }
  });
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Simulating API fetch
    const fetchData = async () => {
      try {
        // In the future, this will be replaced with a real API call
        const mockData = profileMockData as ProfileData;
        // Sort tournament points by date in descending order (most recent first)
        mockData.user.tournamentPoints.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setData(mockData);
        setFirstName(mockData.user.firstName);
        setLastName(mockData.user.lastName);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSaveProfile = () => {
    // Here you would typically save the changes to your backend
    setData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        firstName,
        lastName
      }
    }));
    setModalVisible(false);
  };

  // Calculate bottom padding based on platform and device
  const bottomPadding = Platform.select({
    ios: insets.bottom + 55, // Tab bar height (55) + bottom safe area
    android: 4 // Tab bar height (4) + bottom safe area
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ThemedText type="title" style={styles.header}>Profile</ThemedText>
        <ThemedView style={styles.profileCard}>
          <ThemedText type="subtitle" style={styles.name}>{data.user.firstName} {data.user.lastName}</ThemedText>
          <ThemedText type="default" style={styles.email}>{data.user.email}</ThemedText>
          <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
            <ThemedText type="defaultSemiBold" style={styles.editButtonText}>Edit Profile</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Tournament Points Summary */}
        <ThemedView style={styles.pointsSummaryCard}>
          <View style={styles.pointsSummaryItem}>
            <ThemedText type="default" style={styles.pointsLabel}>Total Points</ThemedText>
            <ThemedText type="title" style={styles.pointsValue}>{data.user.totalPoints}</ThemedText>
          </View>
          <View style={styles.pointsSummaryItem}>
            <ThemedText type="default" style={styles.pointsLabel}>Overall Rank</ThemedText>
            <ThemedText type="title" style={styles.pointsValue}>#{data.user.overallRank}</ThemedText>
          </View>
        </ThemedView>

        {/* Tournament Points History */}
        <ThemedText type="subtitle" style={styles.sectionTitle}>Tournament Points</ThemedText>
        <ScrollView
            style={styles.pointsList}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: bottomPadding }}
        >
          {data.user.tournamentPoints.map(point => (
            <ThemedView key={point.id} style={styles.pointsCard}>
              <View style={styles.pointsInfo}>
                <ThemedText type="defaultSemiBold" style={styles.tournamentName}>{point.tournament}</ThemedText>
                <ThemedText type="default" style={styles.tournamentDate}>{formatDate(point.date)}</ThemedText>
              </View>
              <ThemedText type="defaultSemiBold" style={styles.pointsValue}>{point.points} pts</ThemedText>
            </ThemedView>
          ))}
        </ScrollView>

        {/* Edit Profile Modal */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <ThemedView style={styles.modalContent}>
              <ThemedText type="title" style={{ marginBottom: 12 }}>Edit Profile</ThemedText>
              <TextInput
                style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                placeholderTextColor="#888"
              />
              <TextInput
                style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                placeholderTextColor="#888"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={handleSaveProfile}>
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
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16
  },
  profileCard: { 
    borderRadius: 10, 
    padding: 20, 
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  email: {
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.7
  },
  editButton: { 
    backgroundColor: '#1877f3', 
    borderRadius: 6, 
    paddingVertical: 10, 
    paddingHorizontal: 24, 
    borderWidth: 0 
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16
  },
  pointsSummaryCard: {
    borderRadius: 10,
    padding: 20,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  pointsSummaryItem: {
    alignItems: 'center'
  },
  pointsLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    alignSelf: 'flex-start'
  },
  pointsList: { 
    width: '100%',
    flex: 1,
  },
  pointsCard: { 
    borderRadius: 10, 
    padding: 16, 
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pointsInfo: {
    flex: 1
  },
  tournamentName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  tournamentDate: {
    fontSize: 14,
    opacity: 0.7
  },
  pointsDetails: {
    alignItems: 'flex-end'
  },
  rankText: {
    fontSize: 14,
    opacity: 0.7
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
}); 