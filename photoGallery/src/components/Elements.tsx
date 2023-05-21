import React from 'react';
import {
  ScrollView as DefaultScrollView,
  FlatList as DefaultFlatList,
  Pressable as DefaultButton,
  Text as DefaultText,
  TextInput as DefaultTextInput,
  View as DefaultView,
  Image as DefaultImage,
} from 'react-native';
import styled from 'styled-components';

interface ElementProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

interface ImageProps {
  source?: {uri: string};
  style?: React.CSSProperties;
}

export type ButtonProps = ElementProps &
  React.ComponentProps<typeof DefaultButton>;
export type TextProps = ElementProps & React.ComponentProps<typeof DefaultText>;
export type ViewProps = ElementProps & React.ComponentProps<typeof DefaultView>;
export type ScrollViewProps = ElementProps &
  React.ComponentProps<typeof DefaultScrollView>;
export type FlatListProps = ElementProps &
  React.ComponentProps<typeof DefaultFlatList>;

export const Text = styled(DefaultText)<TextProps>`
  ${({style}) => `${style}`}
`;

export const TextInput = styled(DefaultTextInput)<TextProps>`
  ${({style}) => `${style}`}
`;
export const View = styled(DefaultView)<ViewProps>`
  ${({style}) => `${style}`}
`;

export const Pressable = styled(DefaultButton)<ButtonProps>`
  ${({style}) => `${style}`}
`;

export const ScrollView = styled(DefaultScrollView)<ScrollViewProps>`
  ${({style}) => `${style}
  `}
`;
export const FlatList = styled(DefaultFlatList)<FlatListProps>`
  ${({style}) => `${style}
  `}
`;

export const Image = styled(DefaultImage)<ImageProps>`
  ${({style}) => `${style}`}
`;

export default {
  Pressable: DefaultButton,
  Text: DefaultText,
  View: DefaultView,
  ScrollView: DefaultScrollView,
  Image: DefaultImage,
};
