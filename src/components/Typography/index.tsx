import { IInputProps, Text, theme } from 'native-base';
import React from 'react';

import {
  FONT_GOOGLE_BARLOW_REGULAR,
  FONT_GOOGLE_BARLOW_SEMIBOLD,
  FONT_GOOGLE_SANS_BOLD
} from "../../constants/fonts";

export function Title(props: IInputProps) {
  const { children, ...rest } = props;
  return (
    <Text fontFamily={FONT_GOOGLE_BARLOW_SEMIBOLD}  {...rest}>
      {children}
    </Text>
  );
}

export function SubTitle(props: IInputProps) {
  const { children, ...rest } = props;
  return (
    <Text fontFamily={FONT_GOOGLE_BARLOW_SEMIBOLD} {...rest}>
      {children}
    </Text>
  );
}

export function Caption(props: IInputProps) {
  const { children, ...rest } = props;
  return (
    <Text fontFamily={FONT_GOOGLE_BARLOW_REGULAR} {...rest}>
      {children}
    </Text>
  );
}

