import { TagProps } from "@chakra-ui/react";
import React, { LegacyRef } from "react";

const TooltipCard = React.forwardRef<HTMLSpanElement, TagProps>(function CustomCard({ children, ...rest }: any, ref: LegacyRef<HTMLSpanElement> | undefined) {
    return (
        <span ref={ref} {...rest}>{children}</span>
    );
});

TooltipCard.displayName = 'CustomCard';

export default TooltipCard;