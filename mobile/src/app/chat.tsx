// serves: REQ-012
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
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

import { api, errorText, setToken } from '@/api';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

export default function ChatScreen() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function sendMessage() {
    const message = question.trim();
    if (!message || busy) return;

    setError('');
    setQuestion('');
    setMessages((current) => [...current, { id: 'user-' + Date.now(), role: 'user', text: message }]);
    setBusy(true);

    try {
      const { status, data } = await api('POST', '/chat', { message });

      if (status === 401) {
        setToken('');
        router.replace('/');
        return;
      }
      if (status === 429) {
        setError(errorText(data, 'You have reached the daily chat limit.'));
        return;
      }
      if (status === 503) {
        setError(errorText(data, 'The chat service is temporarily unavailable.'));
        return;
      }
      if (status !== 200 || typeof data.answer !== 'string' || !data.answer.trim()) {
        setError(errorText(data, 'The chatbot could not answer right now.'));
        return;
      }

      setMessages((current) => [
        ...current,
        { id: 'assistant-' + Date.now(), role: 'assistant', text: data.answer },
      ]);
    } catch {
      setError('Could not reach the server. Check your Wi-Fi connection.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>{'<  Discussions'}</Text>
          </Pressable>

          <Text style={styles.brand}>WikiCampus</Text>
          <Text accessibilityRole="header" style={styles.heading}>WikiCampus guide</Text>
          <Text style={styles.subtitle}>Ask how to use the app.</Text>

          <View style={styles.conversation}>
            {messages.length === 0 ? (
              <Text style={styles.empty}>Your conversation will appear here.</Text>
            ) : (
              messages.map((item) => (
                <View key={item.id} style={[styles.messageCard, item.role === 'user' && styles.userMessage]}>
                  {item.role === 'assistant' ? (
                    <Text style={styles.answerLabel}>AI answer</Text>
                  ) : (
                    <Text style={styles.userLabel}>You</Text>
                  )}
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
              ))
            )}
            {busy && <ActivityIndicator accessibilityLabel="Waiting for an answer" color="#2457A7" />}
          </View>

          <View style={styles.composer}>
            <Text style={styles.label}>Your question</Text>
            <TextInput
              accessibilityLabel="Your question"
              editable={!busy}
              multiline
              onChangeText={setQuestion}
              placeholder="How do I create a discussion topic?"
              placeholderTextColor="#667085"
              style={styles.input}
              textAlignVertical="top"
              value={question}
            />
            <Pressable
              accessibilityRole="button"
              disabled={busy || !question.trim()}
              onPress={() => void sendMessage()}
              style={({ pressed }) => [
                styles.button,
                (busy || !question.trim()) && styles.disabled,
                pressed && styles.pressed,
              ]}>
              {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Send</Text>}
            </Pressable>
          </View>
          {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
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
  conversation: { backgroundColor: '#F8FAFC', borderColor: '#DCE3ED', borderRadius: 14, borderWidth: 1, gap: 12, minHeight: 120, padding: 14 },
  empty: { color: '#667085', fontSize: 14, lineHeight: 21 },
  messageCard: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderColor: '#DCE3ED', borderRadius: 12, borderWidth: 1, gap: 5, maxWidth: '92%', padding: 12 },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#E8EFFF', borderColor: '#C8D8F4' },
  answerLabel: { color: '#2457A7', fontSize: 13, fontWeight: '800' },
  userLabel: { color: '#475467', fontSize: 13, fontWeight: '700' },
  messageText: { color: '#202938', fontSize: 15, lineHeight: 22 },
  composer: { backgroundColor: '#FFFFFF', borderColor: '#DCE3ED', borderRadius: 14, borderWidth: 1, gap: 12, padding: 16 },
  label: { color: '#202938', fontSize: 14, fontWeight: '600' },
  input: { backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: 9, borderWidth: 1, color: '#202938', fontSize: 15, minHeight: 90, padding: 12 },
  button: { alignItems: 'center', backgroundColor: '#2457A7', borderRadius: 9, justifyContent: 'center', minHeight: 48, padding: 12 },
  disabled: { opacity: 0.55 },
  pressed: { backgroundColor: '#173D79' },
  buttonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  error: { color: '#B42318', fontSize: 14, lineHeight: 20 },
});