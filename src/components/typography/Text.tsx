import clsx from 'clsx';
import React from 'react';
import { Text as RNText } from 'react-native';
import { TextProps } from './typography.types';

type Weight = NonNullable<TextProps['weight']>;
type Family = NonNullable<TextProps['family']>;

/** Keys must match `useFonts` in `src/app/_layout.tsx`. Static faces — do not use numeric `fontWeight`. */
const INTER_BY_WEIGHT: Record<Weight, string> = {
    400: 'Inter-Regular',
    600: 'Inter-SemiBold',
    700: 'Inter-Bold',
    800: 'Inter-ExtraBold',
};

const JAKARTA_BY_WEIGHT: Record<Weight, string> = {
    400: 'PlusJakartaSans-Regular',
    600: 'PlusJakartaSans-SemiBold',
    700: 'PlusJakartaSans-Bold',
    800: 'PlusJakartaSans-ExtraBold',
};

function fontFamilyFor(family: Family, weight: Weight): string {
    return family === 'inter' ? INTER_BY_WEIGHT[weight] : JAKARTA_BY_WEIGHT[weight];
}

export default function Text({
    textRef,
    weight = 400,
    family = 'inter',
    style,
    className,
    ...props
}: TextProps) {
    return (
        <RNText
            allowFontScaling={false}
            ref={textRef}
            {...props}
            className={clsx('leading-tight text-on_surface', className)}
            style={[
                style,
                {
                    fontFamily: fontFamilyFor(family, weight),
                    fontWeight: 'normal',
                },
            ]}
        />
    );
}

