// serves: REQ-002, REQ-006
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
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

type Post = { id: number; title: string; category: string; content: string };

const categories = ['Computer Science', 'Study Resources', 'Internships', 'Campus Life'];

export default function DiscussionsScreen() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const returnToLogin = () => {
    setToken('');
    router.replace('/');
  };

  const loadPosts = useCallback(async () => {
    try {
      const { status, data } = await api('GET', '/posts');
      if (status === 401) returnToLogin();
      else if (status !== 200) setMessage(errorText(data, 'The discussion list could not be loaded.'));
      else setPosts(data.items as Post[]);
    } catch {
      setMessage('Could not reach the server. Check your Wi-Fi connection.');
    }
  }, []);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  async function createPost() {
    setMessage('');
    setBusy(true);
    try {
      const { status, data } = await api('POST', '/posts', { title, category, content });
      if (status === 401) {
        returnToLogin();
      } else if (status !== 201) {
        setMessage(errorText(data, 'The post could not be created.'));
      } else {
        setMessage('Post created.');
        setTitle('');
        setCategory('');
        setContent('');
        await loadPosts();
      }
    } catch {
      setMessage('Could not reach the server. Check your Wi-Fi connection.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <View>
              <Text style={styles.brand}>WikiCampus</Text>
              <Text style={styles.title}>Create a discussion</Text>
            </View>
            <Pressable accessibilityRole="button" onPress={returnToLogin}>
              <Text style={styles.link}>Log out</Text>
            </Pressable>
          </View>
          <Text style={styles.subtitle}>Ask a question or share something useful with other students.</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/resources')}
            style={styles.resourceShortcut}>
            <Text style={styles.resourceShortcutText}>Search study resources</Text>
          </Pressable>

          <View style={styles.card}>
            <Text style={styles.label}>Post title</Text>
            <TextInput
              accessibilityLabel="Post title"
              maxLength={100}
              onChangeText={setTitle}
              placeholder="What would you like to discuss?"
              placeholderTextColor="#667085"
              style={styles.input}
              value={title}
            />

            <Text style={styles.label}>Category</Text>
            <View style={styles.categories}>
              {categories.map((item) => (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: category === item }}
                  key={item}
                  onPress={() => setCategory(item)}
                  style={[styles.category, category === item && styles.categorySelected]}>
                  <Text style={[styles.categoryText, category === item && styles.categoryTextSelected]}>
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.label}>Your post</Text>
            <TextInput
              accessibilityLabel="Your post"
              multiline
              onChangeText={setContent}
              placeholder="Write your question or discussion..."
              placeholderTextColor="#667085"
              style={[styles.input, styles.textArea]}
              textAlignVertical="top"
              value={content}
            />

            <Pressable
              accessibilityRole="button"
              disabled={busy}
              onPress={createPost}
              style={({ pressed }) => [styles.button, busy && styles.disabled, pressed && styles.pressed]}>
              {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Create post</Text>}
            </Pressable>
            {!!message && <Text accessibilityRole="alert" style={[styles.message, message === 'Post created.' && styles.successMessage]}>{message}</Text>}
          </View>

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Discussion list</Text>
            <Pressable accessibilityRole="button" onPress={() => void loadPosts()}>
              <Text style={styles.link}>Refresh</Text>
            </Pressable>
          </View>
          {posts.length === 0 ? (
            <Text style={styles.empty}>No discussions yet. Create the first one.</Text>
          ) : (
            posts.map((post) => (
              <Pressable
                accessibilityLabel={'Open discussion: ' + post.title}
                accessibilityRole="button"
                key={post.id}
                onPress={() => router.push({ pathname: '/posts/[id]', params: { id: String(post.id) } })}
                style={({ pressed }) => [styles.postCard, pressed && styles.postPressed]}>
                <Text style={styles.tag}>{post.category}</Text>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postContent}>{post.content}</Text>
                <Text style={styles.openHint}>Tap to read replies</Text>
              </Pressable>
            ))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: '#EEF2F8' },
  content: { alignSelf: 'center', gap: 16, maxWidth: 560, padding: 20, width: '100%' },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  brand: { color: '#173D79', fontSize: 17, fontWeight: '800' },
  title: { color: '#202938', fontSize: 25, fontWeight: '700', marginTop: 6 },
  subtitle: { color: '#667085', fontSize: 15, lineHeight: 22 },
  resourceShortcut: { alignSelf: 'flex-start', borderColor: '#2457A7', borderRadius: 9, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10 },
  resourceShortcutText: { color: '#2457A7', fontSize: 14, fontWeight: '600' },
  link: { color: '#2457A7', fontSize: 14, fontWeight: '600', padding: 8 },
  card: { backgroundColor: '#FFFFFF', borderColor: '#DCE3ED', borderRadius: 14, borderWidth: 1, gap: 12, padding: 16 },
  label: { color: '#202938', fontSize: 14, fontWeight: '600', marginTop: 4 },
  input: { backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: 9, borderWidth: 1, color: '#202938', fontSize: 15, minHeight: 48, paddingHorizontal: 12 },
  textArea: { minHeight: 110, paddingTop: 12 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  category: { borderColor: '#CBD5E1', borderRadius: 20, borderWidth: 1, paddingHorizontal: 11, paddingVertical: 8 },
  categorySelected: { backgroundColor: '#E8EFFF', borderColor: '#2457A7' },
  categoryText: { color: '#344054', fontSize: 13 },
  categoryTextSelected: { color: '#173D79', fontWeight: '600' },
  button: { alignItems: 'center', backgroundColor: '#2457A7', borderRadius: 9, justifyContent: 'center', minHeight: 48, padding: 12 },
  disabled: { opacity: 0.6 },
  pressed: { backgroundColor: '#173D79' },
  buttonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  message: { color: '#B42318', fontSize: 14, lineHeight: 20 },
  successMessage: { color: '#067647' },
  sectionHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  sectionTitle: { color: '#202938', fontSize: 19, fontWeight: '700' },
  empty: { color: '#667085', fontSize: 15, paddingVertical: 8 },
  postCard: { backgroundColor: '#FFFFFF', borderColor: '#DCE3ED', borderRadius: 13, borderWidth: 1, gap: 8, padding: 15 },
  tag: { alignSelf: 'flex-start', backgroundColor: '#E8EFFF', borderRadius: 14, color: '#173D79', fontSize: 12, overflow: 'hidden', paddingHorizontal: 9, paddingVertical: 5 },
  postTitle: { color: '#202938', fontSize: 17, fontWeight: '700' },
  postContent: { color: '#667085', fontSize: 14, lineHeight: 21 },
  openHint: { color: '#2457A7', fontSize: 13, fontWeight: '600' },
  postPressed: { opacity: 0.75 },
});
