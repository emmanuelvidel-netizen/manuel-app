import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

const auth = getAuth();
const firestore = getFirestore();

interface Chat {
  id: string;
  participantId: string;
  participantName: string;
  lastMessage: string;
  timestamp: Date;
}

interface ChatListScreenProps {
  navigation: any;
}

export default function ChatListScreen({ navigation }: ChatListScreenProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    if (!user) return;

    try {
      setLoading(true);
      // Aquí iríamos a buscar chats desde Firestore
      // Por ahora, mostramos una lista vacía
      const chatsCollection = collection(firestore, 'chats');
      const q = query(chatsCollection, where('participants', 'array-contains', user.uid));
      const querySnapshot = await getDocs(q);
      
      const chatList: Chat[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        chatList.push({
          id: doc.id,
          participantId: data.participantId,
          participantName: data.participantName,
          lastMessage: data.lastMessage || 'Sin mensajes',
          timestamp: data.timestamp?.toDate() || new Date(),
        });
      });
      
      setChats(chatList.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('Chat', {
        chatId: item.id,
        userId: item.participantId,
        userName: item.participantName,
      })}
    >
      <View style={styles.chatContent}>
        <Text style={styles.chatName}>{item.participantName}</Text>
        <Text style={styles.chatMessage} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.chatTime}>
        {item.timestamp.toLocaleTimeString()}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {chats.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay chats disponibles</Text>
          <Text style={styles.emptySubtext}>Comienza una nueva conversación</Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={renderChatItem}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatContent: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  chatMessage: {
    fontSize: 14,
    color: '#666',
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
    marginLeft: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
  },
});
