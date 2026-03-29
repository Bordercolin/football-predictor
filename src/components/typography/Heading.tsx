import Text from './Text';
import clsx from 'clsx';
import { HeadingProps } from './typography.types';

const DEFAULT_HEADING_WEIGHT = 700;

export default function Heading({textRef, level, weight, allCaps = false, ...props}: HeadingProps) {
    const resolvedWeight = weight ?? DEFAULT_HEADING_WEIGHT;

    return (
        <Text
            family="jakarta"
            textRef={textRef}
            allowFontScaling={false}
            {...props}
            weight={resolvedWeight}
            className={clsx(
                {
                    'text-2xl': level === 1,
                    'text-xl': level === 2,
                    'text-lg': level === 3,
                    'text-base': level === 4,
                    uppercase: allCaps,
                },
                props.className,
            )}
        />
    );
}
