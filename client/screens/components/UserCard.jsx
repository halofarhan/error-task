import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { FOLLOW_USER } from '../../queries';

const UserCard = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [addFollow, {}] = useMutation(FOLLOW_USER)

  const handleFollow = async () => {
    setIsFollowing(!isFollowing);
    try {
      await addFollow({
        variables: {
          input: {
            followingId: user._id
          }
        }
      })
    } catch (error) {
      
    }
  };
  
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{user?.name}</Title>
        <Paragraph>@{user?.username}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button buttonColor="#1B75BB" mode="contained" onPress={handleFollow}>
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
});

export default UserCard;
