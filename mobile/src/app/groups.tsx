// serves: REQ-009, REQ-006
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { api, errorText, setToken } from '@/api';

type StudyGroup = { id: number; name: string; course: string };

export default function GroupsScreen() {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [joinedIds, setJoinedIds] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const returnToLogin = () => {
    setToken('');
    router.replace('/');
  };

  const loadGroups = useCallback(async () => {
    try {
      const { status, data } = await api('GET', '/groups');
      if (status === 401) {
        setToken('');
        router.replace('/');
      }
      else if (status !== 200) setMessage(errorText(data, 'The group list could not be loaded.'));
      else setGroups(data.items as StudyGroup[]);
    } catch {
      setMessage('Could not reach the server. Check your Wi-Fi connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadGroups();
  }, [loadGroups]);

  async function createGroup() {
    setMessage('');
    setBusy(true);
    try {
      const { status, data } = await api('POST', '/groups', { name, course });
      if (status === 401) {
        returnToLogin();
      } else if (status !== 201) {
        setMessage(errorText(data, 'The group could not be created.'));
      } else {
        setMessage('Group created. You are a member.');
        setName('');
        setCourse('');
        setJoinedIds((current) => [...current, data.id as number]);
        await loadGroups();
      }
    } catch {
      setMessage('Could not reach the server. Check your Wi-Fi connection.');
    } finally {
      setBusy(false);
    }
  }

  async function joinGroup(group: StudyGroup) {
    setMessage('');
    try {
      const { status, data } = await api('POST', '/groups/' + group.id + '/members');
      if (status === 401) {
        returnToLogin();
      } else if (status === 200) {
        setJoinedIds((current) => current.includes(group.id) ? current : [...current, group.id]);
        setMessage('You joined the group.');
      } else if (status === 409) {
        setJoinedIds((current) => current.includes(group.id) ? current : [...current, group.id]);
        setMessage('You are already a member of this group.');
      } else {
        setMessage(errorText(data, 'The group could not be joined.'));
      }
    } catch {
      setMessage('Could not reach the server. Check your Wi-Fi connection.');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>{'<  Resources'}</Text>
        </Pressable>

        <Text style={styles.brand}>WikiCampus</Text>
        <Text style={styles.heading}>Study groups</Text>
        <Text style={styles.subtitle}>Create or join a group for one of your courses.</Text>

        <View style={styles.formCard}>
          <Text style={styles.label}>Group name</Text>
          <TextInput
            accessibilityLabel="Group name"
            maxLength={100}
            onChangeText={setName}
            placeholder="Database Systems study group"
            placeholderTextColor="#667085"
            style={styles.input}
            value={name}
          />

          <Text style={styles.label}>Course</Text>
          <TextInput
            accessibilityLabel="Course"
            maxLength={100}
            onChangeText={setCourse}
            placeholder="DB201"
            placeholderTextColor="#667085"
            style={styles.input}
            value={course}
          />

          <Pressable
            accessibilityRole="button"
            disabled={busy}
            onPress={() => void createGroup()}
            style={({ pressed }) => [styles.button, busy && styles.disabled, pressed && styles.pressed]}>
            {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Create group</Text>}
          </Pressable>
        </View>

        {!!message && <Text accessibilityRole="alert" style={styles.message}>{message}</Text>}

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Available groups</Text>
          <Pressable accessibilityRole="button" onPress={() => void loadGroups()}>
            <Text style={styles.refresh}>Refresh</Text>
          </Pressable>
        </View>

        {loading ? (
          <ActivityIndicator color="#2457A7" size="large" style={styles.loader} />
        ) : groups.length === 0 ? (
          <Text style={styles.empty}>No study groups yet. Create the first one.</Text>
        ) : (
          groups.map((group) => {
            const joined = joinedIds.includes(group.id);
            return (
              <View key={group.id} style={styles.groupCard}>
                <Text style={styles.groupName}>{group.name}</Text>
                <Text style={styles.course}>{group.course}</Text>
                <Pressable
                  accessibilityRole="button"
                  disabled={joined}
                  onPress={() => void joinGroup(group)}
                  style={({ pressed }) => [
                    styles.joinButton,
                    joined && styles.joinedButton,
                    pressed && !joined && styles.pressed,
                  ]}>
                  <Text style={[styles.buttonText, joined && styles.joinedText]}>
                    {joined ? 'Joined' : 'Join group'}
                  </Text>
                </Pressable>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EEF2F8' },
  content: { alignSelf: 'center', gap: 16, maxWidth: 560, padding: 20, width: '100%' },
  backButton: { alignSelf: 'flex-start', paddingVertical: 4 },
  backText: { color: '#2457A7', fontSize: 15, fontWeight: '600' },
  brand: { color: '#173D79', fontSize: 17, fontWeight: '800' },
  heading: { color: '#202938', fontSize: 25, fontWeight: '700' },
  subtitle: { color: '#667085', fontSize: 15, lineHeight: 22 },
  formCard: { backgroundColor: '#FFFFFF', borderColor: '#DCE3ED', borderRadius: 14, borderWidth: 1, gap: 12, padding: 16 },
  label: { color: '#202938', fontSize: 14, fontWeight: '600' },
  input: { backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: 9, borderWidth: 1, color: '#202938', fontSize: 15, minHeight: 48, paddingHorizontal: 12 },
  button: { alignItems: 'center', backgroundColor: '#2457A7', borderRadius: 9, justifyContent: 'center', minHeight: 48, padding: 12 },
  disabled: { opacity: 0.6 },
  pressed: { backgroundColor: '#173D79' },
  buttonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  message: { color: '#B42318', fontSize: 14, lineHeight: 20 },
  sectionHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  sectionTitle: { color: '#202938', fontSize: 19, fontWeight: '700' },
  refresh: { color: '#2457A7', fontSize: 14, fontWeight: '600', padding: 8 },
  loader: { marginTop: 12 },
  empty: { color: '#667085', fontSize: 15, paddingVertical: 8 },
  groupCard: { backgroundColor: '#FFFFFF', borderColor: '#DCE3ED', borderRadius: 13, borderWidth: 1, gap: 8, padding: 15 },
  groupName: { color: '#202938', fontSize: 17, fontWeight: '700' },
  course: { color: '#667085', fontSize: 14 },
  joinButton: { alignItems: 'center', backgroundColor: '#2457A7', borderRadius: 9, justifyContent: 'center', marginTop: 4, minHeight: 44, padding: 10 },
  joinedButton: { backgroundColor: '#E8EFFF' },
  joinedText: { color: '#173D79' },
});
