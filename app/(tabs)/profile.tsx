import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const USER = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@email.com',
  avatar: require('@/assets/images/icon.png'),
  tournaments: [
    { id: 1, name: 'Tournament A', date: 'Sep 20' },
    { id: 2, name: 'Tournament B', date: 'Aug 10' },
  ],
};

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState(USER.firstName);
  const [lastName, setLastName] = useState(USER.lastName);
  const colorScheme = useColorScheme();

  const handleSaveProfile = () => {
    // Here you would typically save the changes to your backend
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ThemedText type="title" style={styles.header}>Profile</ThemedText>
        <ThemedView style={styles.profileCard}>
          <ThemedText type="subtitle" style={styles.name}>{USER.firstName} {USER.lastName}</ThemedText>
          <ThemedText type="default" style={styles.email}>{USER.email}</ThemedText>
          <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
            <ThemedText type="defaultSemiBold" style={styles.editButtonText}>Edit Profile</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Tournaments</ThemedText>
        <ScrollView style={styles.tournamentsList} showsVerticalScrollIndicator={true}>
          {USER.tournaments.map(t => (
            <ThemedView key={t.id} style={styles.tournamentCard}>
              <ThemedText type="defaultSemiBold" style={styles.tournamentName}>{t.name}</ThemedText>
              <ThemedText type="default" style={styles.tournamentDate}>{t.date}</ThemedText>
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
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  container: { flex: 1, paddingHorizontal: 12, paddingVertical: 20, backgroundColor: 'transparent' },
  header: { fontSize: 32, fontWeight: 'bold', marginBottom: 16 },
  profileCard: { 
    borderRadius: 10, 
    padding: 20, 
    alignItems: 'center',
  },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  email: { fontSize: 16, marginBottom: 16, opacity: 0.7 },
  editButton: { 
    backgroundColor: '#1877f3', 
    borderRadius: 6, 
    paddingVertical: 10, 
    paddingHorizontal: 24, 
    borderWidth: 0 
  },
  editButtonText: { color: '#fff', fontSize: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 16, marginBottom: 8, alignSelf: 'flex-start' },
  tournamentsList: { 
    width: '100%',
    flex: 1,
  },
  tournamentCard: { 
    borderRadius: 10, 
    padding: 16, 
    marginBottom: 12 
  },
  tournamentName: { fontSize: 16, fontWeight: 'bold' },
  tournamentDate: { fontSize: 14, color: '#888' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
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
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  modalButton: { flex: 1, backgroundColor: '#1877f3', borderRadius: 6, paddingVertical: 10, marginHorizontal: 4, alignItems: 'center' },
  modalButtonText: { color: '#fff', fontSize: 16 },
}); 