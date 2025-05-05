import type { Variants } from "framer-motion";

export default function useNavbarVariants(): [Variants, Variants]{
    const sidebarVariants: Variants = {
        open: {
            width: "16.6666667%",
            display: "flex",
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
        closed: {
            display: "none",
            width: 0,
        },
    };

    const mainContentVariants: Variants = {
        open: {
            width: "83.3333333%",
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
        closed: {
            width: "100%",
        },
    };

    return [sidebarVariants, mainContentVariants];
}