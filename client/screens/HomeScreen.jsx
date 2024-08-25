import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { GET_POSTS } from "../config/queries";

const windowWidth = Dimensions.get("window").width;
const numColumns = 2;
const itemWidth = (windowWidth - 30) / numColumns;

const DynamicImage = ({ uri, style }) => {
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      const ratio = width / height;
      const calculatedHeight = style.width / ratio;
      setImageHeight(calculatedHeight);
    });
  }, [uri]);

  return (
    <Image
      source={{ uri }}
      style={[style, { height: imageHeight }]}
      resizeMode="cover"
    />
  );
};

const PinterestLayout = ({ category }) => {
  const { error, loading, data } = useQuery(GET_POSTS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching posts: {error.message}</Text>;

  const posts = data?.getPost

  console.log(posts, "<<<<<");


  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item._id}
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate("PostDetail", {
          id: item._id
        });
      }}
    >
      <DynamicImage
        uri={item.imgUrl}
        style={styles.image}
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.row}
    />
  );
};

export default function HomeScreen() {
  const [categories] = useState([
    { id: "1", title: "girl", data: [] },
    { id: "2", title: "car", data: [] },
    { id: "3", title: "love", data: [] },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = React.useRef();

  const onTabPress = (index) => {
    setActiveIndex(index);
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

  const renderTab = ({ item, index }) => (
    <TouchableOpacity onPress={() => onTabPress(index)}>
      <Text style={[styles.tabText, index === activeIndex && styles.activeTab]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabWrapper}>
        <FlatList
          data={categories}
          renderItem={renderTab}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.tabContentContainer}
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={categories}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(
            event.nativeEvent.contentOffset.x / windowWidth
          );
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={{ width: windowWidth }}>
            <PinterestLayout category={item.data} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  tabWrapper: {
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "black",
  },
  tabContentContainer: {
    paddingHorizontal: 10,
  },
  tabText: {
    marginHorizontal: 16,
    paddingVertical: 6,
    fontSize: 16,
    color: "#bbb",
  },
  activeTab: {
    color: "#fff",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  column: {
    flex: 1,
  },
  itemContainer: {
    marginBottom: 10,
  },
  image: {
    width: itemWidth,
    borderRadius: 10,
    backgroundColor: "#333",
  },
});
