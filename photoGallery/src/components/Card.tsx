import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Button, FlatList, Modal, TouchableOpacity} from 'react-native';
import {View, Text, TextInput} from '../components/Elements';
import {Image} from '../components/Elements';
import {Comment, deletePhotoAction, Photo} from '../redux/reducer';
import {styles} from '../styles';

export interface CardProps {
  data?: Photo[];
}

interface CommentProps {
  comment: Comment;
  editingCommentId: number | null;
  editedCommentText: string;
  onEditComment: (commentId: number) => void;
  onDeleteComment: (commentId: number) => void;
  onUpdateComment: () => void;
  onCancelEditComment: () => void;
  onCommentTextChange: (text: string) => void;
  testID: string;
}

const CommentComponent = ({
  comment,
  editingCommentId,
  editedCommentText,
  onEditComment,
  onDeleteComment,
  onUpdateComment,
  onCancelEditComment,
  onCommentTextChange,
}: CommentProps) => {
  const {id, text} = comment;

  if (editingCommentId === id) {
    return (
      <View>
        <TextInput
          style={styles.input}
          value={editedCommentText}
          onChangeText={onCommentTextChange}
        />
        <View style={styles.base}>
          <Button color="green" title="Save" onPress={onUpdateComment} />
          <Button color="gray" title="Cancel" onPress={onCancelEditComment} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.base}>
      <Text>{text}</Text>
      <View style={styles.commentsContainer}>
        <TouchableOpacity
          style={styles.commentButton}
          onPress={() => onEditComment(id)}
          testID="edit-button">
          <Text size="lg" style={{color: 'green'}}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commentButton}
          onPress={() => onDeleteComment(id)}
          testID="delete-button">
          <Text size="lg" style={{color: 'red'}}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PhotoCard = ({photo}: {photo: Photo}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentText, setEditedCommentText] = useState('');

  const dispatch = useDispatch();

  const setComment = (newText: string) => {
    setNewComment(newText);
  };

  const addComment = () => {
    if (newComment.trim() !== '') {
      const newCommentObj: Comment = {
        id: Date.now(),
        text: newComment,
      };
      setComments(prevComments => [...prevComments, newCommentObj]);
      setNewComment('');
    }
  };

  const deleteComment = (commentId: number) => {
    const updatedComments = comments.filter(
      comment => comment.id !== commentId,
    );
    setComments(updatedComments);
  };

  const editComment = (commentId: number) => {
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
      setEditingCommentId(commentId);
      setEditedCommentText(comment.text);
    }
  };

  const updateComment = () => {
    if (editingCommentId !== null) {
      const updatedComments = comments.map(comment =>
        comment.id === editingCommentId
          ? {...comment, text: editedCommentText}
          : comment,
      );
      setComments(updatedComments);
      setEditingCommentId(null);
      setEditedCommentText('');
    }
  };

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditedCommentText('');
  };

  const removePhoto = () => {
    dispatch(deletePhotoAction(photo.id));
    setModalVisible(false);
  };

  const renderComment = (comment: Comment) => {
    return (
      <CommentComponent
        key={comment.id}
        comment={comment}
        editingCommentId={editingCommentId}
        editedCommentText={editedCommentText}
        onEditComment={editComment}
        onDeleteComment={deleteComment}
        onUpdateComment={updateComment}
        onCancelEditComment={cancelEditComment}
        onCommentTextChange={setEditedCommentText}
        testID="comment-component"
      />
    );
  };

  const openModal = (photoUrl: string) => {
    setSelectedPhoto(photoUrl);
    setModalVisible(true);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => openModal(photo.url)}>
        <Image source={{uri: photo.url}} style={styles.image.md} />
      </TouchableOpacity>
      <Text>
        {photo.id}: {photo.title}
      </Text>
      <Text>{photo.description}</Text>
      <Button title="View Comments" onPress={() => openModal(photo.url)} />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.closeButton}>
          <Button
            color="red"
            title="X"
            onPress={() => setModalVisible(false)}
          />
        </View>
        <Image source={{uri: selectedPhoto}} style={styles.image.lg} />
        <View>
          {comments.length >= 1 && comments.map(renderComment)}
          {!editingCommentId && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Add a comment..."
                value={newComment}
                onChangeText={setComment}
                onSubmitEditing={addComment}
                testID="comment-input"
              />
              {newComment && (
                <Button color="green" title="Save" onPress={addComment} />
              )}
              <Button color="red" title="Delete photo" onPress={removePhoto} />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const Card = ({data}: CardProps) => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => <PhotoCard photo={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Card;
