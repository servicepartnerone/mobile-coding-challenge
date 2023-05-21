import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import Card from '../src/components/Card';

describe('Card component', () => {
  const mockPhoto = {
    id: 1,
    url: 'https://example.com/photo.jpg',
    title: 'Example Photo',
    description: 'This is an example photo',
    comments: [
      {
        id: 1,
        text: 'First comment',
      },
      {
        id: 2,
        text: 'Second comment',
      },
    ],
  };

  it('renders correctly with photo data', () => {
    const testData = [mockPhoto];

    const {toJSON} = render(<Card data={testData} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('adds a new comment when the add comment button is pressed', () => {
    const testData = [mockPhoto];
    const {getByPlaceholder, getByText, getAllByTestId} = render(
      <Card data={testData} />,
    );

    const newCommentText = 'New comment';

    const textInput = getByPlaceholder('Add a comment...');
    fireEvent.changeText(textInput, newCommentText);

    const addButton = getByText('Save');
    fireEvent.press(addButton);

    const comments = getAllByTestId('comment-component');
    expect(comments.length).toBe(3); // Two existing comments + the newly added comment
    expect(comments[2].props.comment.text).toBe(newCommentText);
  });

  it('deletes a comment when the delete button is pressed', () => {
    const testData = [mockPhoto];
    const {getAllByTestId} = render(<Card data={testData} />);

    const deleteButtons = getAllByTestId('delete-button');
    fireEvent.press(deleteButtons[0]);

    const comments = getAllByTestId('comment-component');
    expect(comments.length).toBe(1); // Only one remaining comment
    expect(comments[0].props.comment.text).toBe('Second comment');
  });

  it('edits a comment when the edit button is pressed', () => {
    const testData = [mockPhoto];
    const {getAllByTestId} = render(<Card data={testData} />);

    const editButtons = getAllByTestId('edit-button');
    fireEvent.press(editButtons[0]);

    const editedCommentText = 'Edited comment';

    const textInputs = getAllByTestId('comment-input');
    fireEvent.changeText(textInputs[0], editedCommentText);

    const saveButtons = getAllByTestId('save-button');
    fireEvent.press(saveButtons[0]);

    const comments = getAllByTestId('comment-component');
    expect(comments.length).toBe(2);
    expect(comments[0].props.comment.text).toBe(editedCommentText);
  });
});
