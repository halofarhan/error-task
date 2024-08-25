import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POST_BY_ID } from '../config/queries';
import { ADD_COMMENT } from '../config/queries'; // Pastikan ADD_COMMENT telah diimport
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function PostDetailScreen({ route }) {
    const navigation = useNavigation();
    const { id } = route.params;

    const { data, loading, error } = useQuery(GET_POST_BY_ID, {
        variables: { getPostById: id }
    });

    const [newComment, setNewComment] = useState('');
    const [addComment] = useMutation(ADD_COMMENT, {
        refetchQueries: [{ query: GET_POST_BY_ID, variables: { getPostById: id } }],
    });

    const handleAddComment = async () => {
        if (newComment.trim() === '') return;

        try {
            await addComment({
                variables: {
                    input: {
                        content: newComment,
                        postId: id,
                        username: 'CurrentUser', // Ganti dengan username dari user yang login
                    },
                },
            });
            setNewComment(''); // Kosongkan input setelah komentar ditambahkan
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const post = data?.getPostById;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {post && (
                    <>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: post.imgUrl }}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="heart-outline" size={24} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="chatbubble-outline" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.username}>{post.author.username}</Text>
                        <Text style={styles.imageDescription}>{post.content}</Text>
                        <View style={styles.separator} />
                        <Text style={styles.commentLabel}>Comments</Text>
                        <FlatList
                            data={post.comments}
                            renderItem={({ item }) => (
                                <View style={styles.commentItem}>
                                    <Text style={styles.commentUsername}>{item.username}</Text>
                                    <Text style={styles.commentText}>{item.content}</Text>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.commentsContainer}
                        />
                    </>
                )}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a comment..."
                    placeholderTextColor="#bbb"
                    value={newComment}
                    onChangeText={setNewComment}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
                    <Ionicons name="send" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // Styles sama seperti sebelumnya
});
