// serves: REQ-001, REQ-006
import { router } from 'expo-router';
import { type ReactNode, useState } from 'react';
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

type Step = 'email' | 'code' | 'signedIn';

export default function LoginScreen() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function requestCode() {
    setMessage('');
    setBusy(true);
    try {
      const { status, data } = await api('POST', '/auth/code', { email: email.trim() });
      if (status !== 200) {
        setMessage(errorText(data, 'The code could not be sent.'));
        return;
      }
      setStep('code');
      setMessage(`A four-digit code was sent to ${email.trim()}.`);
    } catch {
      setMessage('Could not reach the server. Check that your phone and laptop are on the same Wi-Fi.');
    } finally {
      setBusy(false);
    }
  }

  async function signIn() {
    setMessage('');
    setBusy(true);
    try {
      const login = await api('POST', '/auth/login', { email: email.trim(), code: code.trim() });
      if (login.status === 401) {
        setMessage('Wrong or expired code. Check your email and try again.');
        return;
      }
      if (login.status !== 200 || typeof login.data.token !== 'string') {
        setMessage(errorText(login.data, 'Login failed.'));
        return;
      }

      setToken(login.data.token);
      const me = await api('GET', '/auth/me');
      if (me.status !== 200 || typeof me.data.email !== 'string') {
        setToken('');
        setMessage(errorText(me.data, 'The server could not confirm the logged-in address.'));
        return;
      }
      setUserEmail(me.data.email);
      setStep('signedIn');
      setMessage('You are signed in.');
    } catch {
      setMessage('Could not reach the server. Check that your phone and laptop are on the same Wi-Fi.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <Text style={styles.brand}>WikiCampus</Text>
            <Text style={styles.title}>{step === 'signedIn' ? 'You’re signed in' : 'Welcome back'}</Text>
            <Text style={styles.subtitle}>
              {step === 'email'
                ? 'Sign in with a one-time code sent to your email.'
                : step === 'code'
                  ? `Enter the four-digit code sent to ${email.trim()}.`
                  : 'Your account is ready to use on this phone.'}
            </Text>

            {step === 'email' && (
              <View style={styles.form}>
                <Text style={styles.label}>Email address</Text>
                <TextInput
                  accessibilityLabel="Email address"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor="#667085"
                  style={styles.input}
                  value={email}
                />
                <ActionButton disabled={busy || !email.trim()} onPress={requestCode}>
                  {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Send code</Text>}
                </ActionButton>
              </View>
            )}

            {step === 'code' && (
              <View style={styles.form}>
                <Text style={styles.label}>Four-digit code</Text>
                <TextInput
                  accessibilityLabel="Four-digit code"
                  autoComplete="one-time-code"
                  keyboardType="number-pad"
                  maxLength={4}
                  onChangeText={(value) => setCode(value.replace(/\D/g, ''))}
                  placeholder="1234"
                  placeholderTextColor="#667085"
                  style={styles.input}
                  value={code}
                />
                <ActionButton disabled={busy || code.length !== 4} onPress={signIn}>
                  {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Log in</Text>}
                </ActionButton>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => {
                    setStep('email');
                    setCode('');
                    setMessage('');
                  }}>
                  <Text style={styles.link}>Use another email address</Text>
                </Pressable>
              </View>
            )}

            {step === 'signedIn' && (
              <View style={styles.form}>
                <Text style={styles.label}>Signed in as</Text>
                <Text style={styles.email}>{userEmail}</Text>
                <ActionButton onPress={() => router.replace('/discussions')}>
                  <Text style={styles.buttonText}>Continue</Text>
                </ActionButton>
              </View>
            )}

            {!!message && <Text accessibilityRole="alert" style={styles.message}>{message}</Text>}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ActionButton({
  children,
  disabled = false,
  onPress,
}: {
  children: ReactNode;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, disabled && styles.buttonDisabled, pressed && styles.buttonPressed]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: '#EEF2F8' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  content: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE3ED',
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
    maxWidth: 480,
    padding: 24,
    width: '100%',
  },
  brand: { color: '#173D79', fontSize: 19, fontWeight: '800' },
  title: { color: '#202938', fontSize: 28, fontWeight: '700' },
  subtitle: { color: '#667085', fontSize: 16, lineHeight: 23 },
  form: { gap: 12, marginTop: 6 },
  label: { color: '#202938', fontSize: 14, fontWeight: '600' },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CBD5E1',
    borderRadius: 9,
    borderWidth: 1,
    color: '#202938',
    fontSize: 16,
    minHeight: 50,
    paddingHorizontal: 13,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2457A7',
    borderRadius: 9,
    justifyContent: 'center',
    minHeight: 50,
    paddingHorizontal: 16,
  },
  buttonDisabled: { opacity: 0.55 },
  buttonPressed: { backgroundColor: '#173D79' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  link: { color: '#2457A7', fontSize: 14, fontWeight: '600', paddingVertical: 8 },
  email: { color: '#202938', fontSize: 16, lineHeight: 23 },
  message: { color: '#B42318', fontSize: 14, lineHeight: 20 },
});
