import { View } from "react-native";
import { CardProps } from "./card.types";
import clsx from "clsx";



export default function Card({type = 'primary', borderRadius = 'md', className, style, children, ...props}: CardProps) {
    return (
        <View 
            className={clsx(
                "rounded p-4 w-full", 
                className 
            )}
            style={style}
            {...props}
        >
            {children}
        </View>
    );
}