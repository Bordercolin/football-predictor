import { ComponentProps } from "react";
import { Text } from "react-native";


export type TextProps = ComponentProps<typeof Text> & {
    textRef?: React.Ref<Text>,
    weight?: 400 | 600 | 700 | 800,
    family?: 'inter' | 'jakarta'
}

export type HeadingProps = Omit<TextProps, 'family'> & {
    level: 1 | 2 | 3 | 4,
    allCaps?: boolean,
}
