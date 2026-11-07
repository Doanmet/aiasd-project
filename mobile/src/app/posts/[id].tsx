// serves: REQ-003, REQ-006
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { api, errorText, setToken } from '@/api';

type PostDetail = {
  id: number;
  title: string;
  category: string;
  content: string;
  replies: { text: string }[];
};

export default function DiscussionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadPost() {
      try {
        const { status, data } = await api('GET', '/posts/' + encodeURIComponent(id));
        if (!active) return;

        if (status === 401) {
          setToken('');
          router.replace('/');
        } else if (status === 404) {
          setMessage('Discussion not found.');
        } else if (status !== 200) {
          setMessage(errorText(data, 'The discussion could not be loaded.'));
        } else {
          setPost(data as PostDetail);
        }
      } catch {
        if (active) setMessage('Could not reach the server. Check your Wi-Fi connection.');
      } finally {
        if (active) setLoading(false);
      }
    }

    if (id) void loadPost();
    else {
      setMessage('Discussion not found.');
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>{'<  All discussions'}</Text>
        </Pressable>

        <Text style={styles.brand}>WikiCampus</Text>
        <Text accessibilityRole="header" style={styles.heading}>Discussion</Text>

        {loading ? (
          <ActivityIndicator color="#2457A7" size="large" style={styles.loader} />
        ) : post ? (
          <>
            <View style={styles.card}>
              <Text style={styles.tag}>{post.category}</Text>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.body}>{post.content}</Text>
            </View>

            <Text style={styles.sectionTitle}>Replies ({post.replies.length})</Text>
            {post.replies.length === 0 ? (
              <Text style={styles.empty}>There are no replies yet.</Text>
            ) : (
              post.replies.map((reply, index) => (
                <View key={index} style={styles.replyCard}>
                  <Text style={styles.body}>{reply.text}</Text>
                </View>
              ))
            )}
          </>
        ) : (
          <Text accessibilityRole="alert" style={styles.message}>{message}</Text>
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
  loader: { marginTop: 28 },
  card: { backgroundColor: '#FFFFFF', borderColor: '#DCE3ED', borderRadius: 14, borderWidth: 1, gap: 10, padding: 16 },
  tag: { alignSelf: 'flex-start', backgroundColor: '#E8EFFF', borderRadius: 14, color: '#173D79', fontSize: 12, overflow: 'hidden', paddingHorizontal: 9, paddingVertical: 5 },
  title: { color: '#202938', fontSize: 20, fontWeight: '700' },
  body: { color: '#667085', fontSize: 15, lineHeight: 22 },
  sectionTitle: { color: '#202938', fontSize: 19, fontWeight: '700', marginTop: 4 },
  empty: { color: '#667085', fontSize: 15 },
  replyCard: { backgroundColor: '#FFFFFF', borderColor: '#DCE3ED', borderRadius: 12, borderWidth: 1, padding: 15 },
  message: { color: '#B42318', fontSize: 15, lineHeight: 22 },
});
