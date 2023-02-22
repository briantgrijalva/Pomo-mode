import React,  { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext } from '../context/themeContext/ThemeContext';

interface Props {
    height?: number;
    marginTop?: string | number;
    marginBottom?: string | number;
}

export const DividerElement = ({ marginTop, height, marginBottom }: Props) => {

    const { theme } = useContext(ThemeContext);

  return (
    <View style={{borderBottomColor: theme.dividerColor, borderBottomWidth: height, marginTop, marginBottom }}/>
  );
};


