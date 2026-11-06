// serves: REQ-004, REQ-007, REQ-006
import { router } from 'expo-router';
import { useState } from 'react';
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

type Resource = {
  id: number;
  title: string;
  subject: string;
  description: string;
};

export default function ResourcesScreen() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<Resource[]>([]);
  const [message, setMessage] = useState('');
  const [searched, setSearched] = useState(false);
  const [busy, setBusy] = useState(false);

  async function searchResources() {
    const keyword = query.trim();
    setMessage('');
    setItems([]);
    setSearched(false);

    if (!keyword) {
      setMessage('Enter a keyword to search for study resources.');
      return;
    }

    setBusy(true);
    try {
      const { status, data } = await api('GET', '/resources?q=' + encodeURIComponent(keyword));
      if (status === 401) {
        setToken('');
        router.replace('/');
      } else if (status !== 200) {
        setMessage(errorText(data, 'The search could not be completed.'));
      } else {
        setItems(data.items as Resource[]);
        setSearched(true);
      }
    } catch {
      setMessage('Could not reach the server. Check your Wi-Fi connection.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>{'<  Discussions'}</Text>
        </Pressable>

        <Text style={styles.brand}>WikiCampus</Text>
        <Text accessibilityRole="header" style={styles.heading}>Study resources</Text>
        <Text style={styles.subtitle}>Find shared notes and study materials.</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/groups')}
          style={styles.groupsShortcut}>
          <Text style={styles.groupsShortcutText}>Study groups</Text>
        </Pressable>

        <View style={styles.searchCard}>
          <Text style={styles.label}>Search by keyword</Text>
          <TextInput
            accessibilityLabel="Search by keyword"
            onChangeText={setQuery}
            onSubmitEditing={() => void searchResources()}
            placeholder="Try Java"
            placeholderTextColor="#667085"
            returnKeyType="search"
            style={styles.input}
            value={query}
          />
          <Pressable
            accessibilityRole="button"
            disabled={busy}
            onPress={() => void searchResources()}
            style={({ pressed }) => [styles.button, busy && styles.disabled, pressed && styles.pressed]}>
            {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Search</Text>}
          </Pressable>
        </View>

        {!!message && <Text accessibilityRole="alert" style={styles.message}>{message}</Text>}
        {searched && items.length === 0 && (
          <Text accessibilityRole="alert" style={styles.empty}>No matching resources found. Try another search.</Text>
        )}
        {items.map((item) => (
          <View key={item.id} style={styles.resultCard}>
            <Text style={styles.tag}>{item.subject}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
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
  groupsShortcut: { alignSelf: 'flex-start', borderColor: '#2457A7', borderRadius: 9, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10 },
  groupsShortcutText: { color: '#2457A7', fontSize: 14, fontWeight: '600' },
  searchCard: { backgroundColor: '#FFFFFF', borderColor: '#DCE3ED', borderRadius: 14, borderWidth: 1, gap: 12, padding: 16 },
  label: { color: '#202938', fontSize: 14, fontWeight: '600' },
  input: { backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: 9, borderWidth: 1, color: '#202938', fontSize: 15, minHeight: 48, paddingHorizontal: 12 },
  button: { alignItems: 'center', backgroundColor: '#2457A7', borderRadius: 9, justifyContent: 'center', minHeight: 48, padding: 12 },
  disabled: { opacity: 0.6 },
  pressed: { backgroundColor: '#173D79' },
  buttonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  message: { color: '#B42318', fontSize: 14, lineHeight: 20 },
  empty: { color: '#667085', fontSize: 15, lineHeight: 22, paddingVertical: 8 },
  resultCard: { backgroundColor: '#FFFFFF', borderColor: '#DCE3ED', borderRadius: 13, borderWidth: 1, gap: 8, padding: 15 },
  tag: { alignSelf: 'flex-start', backgroundColor: '#E8EFFF', borderRadius: 14, color: '#173D79', fontSize: 12, overflow: 'hidden', paddingHorizontal: 9, paddingVertical: 5 },
  title: { color: '#202938', fontSize: 17, fontWeight: '700' },
  description: { color: '#667085', fontSize: 14, lineHeight: 21 },
});
