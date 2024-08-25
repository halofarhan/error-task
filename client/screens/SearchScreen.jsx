import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

const allCategories = [
    { id: '1', image: 'https://via.placeholder.com/400x200', title: 'Category 1' },
    { id: '2', image: 'https://via.placeholder.com/400x200', title: 'Category 2' },
    { id: '3', image: 'https://via.placeholder.com/400x200', title: 'Category 3' },
    { id: '4', image: 'https://via.placeholder.com/400x200', title: 'Category 4' },
    { id: '5', image: 'https://via.placeholder.com/400x200', title: 'Category 5' },
];

const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth - 30; // width of each category item with margin

const CategoryItem = ({ item, onPress }) => (
    <TouchableOpacity style={styles.categoryContainer} onPress={() => onPress(item)}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} resizeMode="cover" />
        <Text style={styles.categoryTitle}>{item.title}</Text>
    </TouchableOpacity>
);

const SearchPage = () => {
    const [searchText, setSearchText] = useState('');

    const handleCategoryPress = (category) => {
        // Handle category selection
        console.log('Selected Category:', category.title);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="#888"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
            <FlatList
                data={allCategories}
                renderItem={({ item }) => <CategoryItem item={item} onPress={handleCategoryPress} />}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', // Dark background
    },
    searchBar: {
        padding: 10,
        backgroundColor: 'black', // Darker background for search bar
    },
    searchInput: {
        height: 50,
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 20,
        color: '#fff',
    },
    categoryList: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    categoryContainer: {
        width: itemWidth,
        marginRight: 10,
    },
    categoryImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    categoryTitle: {
        marginTop: 5,
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
});

export default SearchPage;
