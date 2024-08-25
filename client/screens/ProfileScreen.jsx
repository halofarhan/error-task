import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../config/queries';

const userPosts = [
    { id: '10', image: 'https://i.pinimg.com/564x/c3/3b/06/c33b0639cb656c15576b72b5b7121a40.jpg' },
    { id: '11', image: 'https://i.pinimg.com/736x/d2/72/b4/d272b4d13e23e5e3d38e6f7304061826.jpg' },
    { id: '12', image: 'https://i.pinimg.com/564x/1d/75/96/1d7596de1221664386aff31b994dd045.jpg' },

];

const windowWidth = Dimensions.get('window').width;
const numColumns = 3;
const itemWidth = (windowWidth - 50) / numColumns;

export default function ProfileScreen() {
    const { data, loading, error } = useQuery(GET_USER_PROFILE);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    const userProfile = data.getMyProfile;

    return (
        <View style={styles.container}>
            {/* Bagian Foto Profil */}
            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/100x100' }}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>{userProfile.name}</Text>
                <Text style={styles.profileUsername}>@{userProfile.username}</Text>
                <View style={styles.followContainer}>
                    <Text style={styles.followText}>{userProfile.following.length} Following</Text>
                    <Text style={styles.followText}>{userProfile.follower.length} Followers</Text>
                </View>
            </View>

            {/* Grid Postingan */}
            <FlatList
                data={userPosts}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image
                            source={{ uri: item.image }}
                            style={[styles.image, { aspectRatio: item.aspectRatio }]}
                            resizeMode="cover"
                        />
                    </View>
                )}
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    profileHeader: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 35
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#fff',
        marginBottom: 10,
    },
    profileName: {
        marginTop: 7,
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    profileUsername: {
        fontSize: 16,
        marginTop: 7,
        color: '#bbb',
        marginBottom: 10,
    },
    followContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        marginTop: 5,
    },
    followText: {
        color: '#fff',
        fontSize: 14,
    },
    row: {
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    itemContainer: {
        width: itemWidth,
        marginBottom: 10,
        marginHorizontal: 5
    },
    image: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#333',
        height: 200
    },
});