import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../config/queries';
import { useNavigation } from '@react-navigation/native';

export default function AddPostScreen() {
    const navigation = useNavigation();
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [imgUrl, setImgUrl] = useState('');

    const [addPost, { loading, error }] = useMutation(ADD_POST, {
        onCompleted: () => {
            navigation.goBack(); // Kembali ke halaman sebelumnya setelah post berhasil ditambahkan
        }
    });

    const handleAddPost = () => {
        addPost({
            variables: {
                input: {
                    content,
                    tags: tags.split(',').map(tag => tag.trim()), // Mengubah string tags menjadi array
                    imgUrl,
                    authorId: 'YOUR_AUTHOR_ID_HERE' // Ganti dengan ID author dari user yang sedang login
                }
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Post Image URL</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter image URL"
                value={imgUrl}
                onChangeText={setImgUrl}
            />
            {imgUrl ? (
                <Image source={{ uri: imgUrl }} style={styles.previewImage} />
            ) : null}

            <Text style={styles.label}>Content</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter post content"
                value={content}
                onChangeText={setContent}
            />

            <Text style={styles.label}>Tags (comma separated)</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter tags"
                value={tags}
                onChangeText={setTags}
            />

            {error && <Text style={styles.error}>Error adding post. Please try again.</Text>}

            <TouchableOpacity
                style={styles.button}
                onPress={handleAddPost}
                disabled={loading}
            >
                <Text style={styles.buttonText}>Add Post</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'black',
    },
    label: {
        color: 'white',
        marginBottom: 10,
        fontSize: 16,
    },
    input: {
        backgroundColor: '#222',
        color: 'white',
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    previewImage: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});
