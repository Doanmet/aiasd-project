// serves: REQ-012
import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>{'<  Discussions'}</Text>
          </Pressable>

          <Text style={styles.brand}>WikiCampus</Text>
          <Text accessibilityRole="header" style={styles.heading}>WikiCampus guide</Text>
          <Text style={styles.subtitle}>Ask how to use the app. The chat connection is being set up.</Text>

          <View style={styles.composer}>
            <Text style={styles.label}>Your question</Text>
            <TextInput
              accessibilityLabel="Your question"
              multiline
              onChangeText={setMessage}
              placeholder="How do I create a discussion topic?"
              placeholderTextColor="#667085"
              style={styles.input}
              textAlignVertical="top"
              value={message}
            />
            <Pressable
              accessibilityRole="button"
              disabled={!message.trim()}
              onPress={() => setMessage('')}
              style={({ pressed }) => [styles.button, !message.trim() && styles.disabled, pressed && styles.pressed]}>
              <Text style={styles.buttonText}>Send</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: '#EEF2F8' },
  content: { alignSelf: 'center', gap: 16, maxWidth: 560, padding: 20, width: '100%' },
  backButton: { alignSelf: 'flex-start', paddingVertical: 4 },
  backText: { color: '#2457A7', fontSize: 15, fontWeight: '600' },
  brand: { color: '#173D79', fontSize: 17, fontWeight: '800' },
  heading: { color: '#202938', fontSize: 25, fontWeight: '700' },
  subtitle: { color: '#667085', fontSize: 15, lineHeight: 22 },
  composer: { backgroundColor: '#FFFFFF', borderColor: '#DCE3ED', borderRadius: 14, borderWidth: 1, gap: 12, padding: 16 },
  label: { color: '#202938', fontSize: 14, fontWeight: '600' },
  input: { backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: 9, borderWidth: 1, color: '#202938', fontSize: 15, minHeight: 110, padding: 12 },
  button: { alignItems: 'center', backgroundColor: '#2457A7', borderRadius: 9, justifyContent: 'center', minHeight: 48, padding: 12 },
  disabled: { opacity: 0.55 },
  pressed: { backgroundColor: '#173D79' },
  buttonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});