import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Title, Paragraph, Chip, Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const PostCard = ({ post, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("detail", { post_id: post._id })}
    >
      <Card style={styles.card}>
        <Card.Cover source={{ uri: post.imgUrl }} style={styles.image} />
        <Card.Content>
          <Title>{post.content}</Title>
          {/* <Text>{JSON.stringify(post?.author?.username)}</Text> */}
          <Paragraph>@{post?.author?.username}</Paragraph>
          {/* <Paragraph>{post._id}</Paragraph> */}
          <View style={styles.tagsContainer}>
            {post.tags.map((tag, tagIndex) => (
              <Chip
                key={tagIndex}
                style={styles.tag}
                theme={{ colors: { primary: "#b1e3f0" } }}
              >
                {tag}
              </Chip>
            ))}
          </View>
        </Card.Content>
        <Card.Actions>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => navigation.navigate("detail")}>
              <View style={styles.iconContainer}>
                <AntDesign name="like1" style={styles.icon} />
                <Paragraph>{post.likes.length}</Paragraph>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("detail")}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="comment-text-multiple-outline"
                  style={styles.icon}
                />
                <Paragraph>{post.comments.length}</Paragraph>
              </View>
            </TouchableOpacity>
          </View>
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    height: 200,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  tag: {
    margin: 2,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 28,
    color: "#1B75BB",
    marginRight: 4,
  },
});

export default PostCard;
