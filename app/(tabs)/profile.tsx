import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { Image, Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
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

  const handleSaveProfile = () => {
    // Here you would typically save the changes to your backend
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image source={USER.avatar} style={styles.avatar} />
        </View>
        <ThemedText type="title" style={styles.name}>{`${firstName} ${lastName}`}</ThemedText>
        <ThemedText type="default" style={styles.email}>{USER.email}</ThemedText>
        <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
          <ThemedText type="defaultSemiBold" style={styles.editButtonText}>Edit Profile</ThemedText>
        </TouchableOpacity>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Tournaments</ThemedText>
        <View style={styles.tournamentsList}>
          {USER.tournaments.map(t => (
            <View key={t.id} style={styles.tournamentCard}>
              <ThemedText type="defaultSemiBold" style={styles.tournamentName}>{t.name}</ThemedText>
              <ThemedText type="default" style={styles.tournamentDate}>{t.date}</ThemedText>
            </View>
          ))}
        </View>

        {/* Edit Profile Modal */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ThemedText type="title" style={{ marginBottom: 16 }}>Edit Profile</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={handleSaveProfile}>
                  <ThemedText type="defaultSemiBold" style={styles.modalButtonText}>Save</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                  <ThemedText type="defaultSemiBold" style={styles.modalButtonText}>Cancel</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: 'transparent' },
  avatarContainer: { marginTop: 24, marginBottom: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#eee' },
  name: { fontSize: 24, fontWeight: 'bold', marginTop: 8 },
  email: { fontSize: 16, color: '#888', marginBottom: 16 },
  editButton: { backgroundColor: '#1877f3', borderRadius: 6, paddingVertical: 10, paddingHorizontal: 32, borderWidth: 0, marginBottom: 24 },
  editButtonText: { color: '#fff', fontSize: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 16, marginBottom: 8, alignSelf: 'flex-start' },
  tournamentsList: { width: '100%' },
  tournamentCard: { backgroundColor: '#f2f2f2', borderRadius: 10, padding: 16, marginBottom: 12 },
  tournamentName: { fontSize: 16, fontWeight: 'bold' },
  tournamentDate: { fontSize: 14, color: '#888' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 12, padding: 24, width: '85%', alignItems: 'center' },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 16, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  modalButton: { flex: 1, backgroundColor: '#1877f3', borderRadius: 6, paddingVertical: 10, marginHorizontal: 4, alignItems: 'center' },
  modalButtonText: { color: '#fff', fontSize: 16 },
}); 