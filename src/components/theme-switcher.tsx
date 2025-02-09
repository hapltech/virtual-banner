"use client";

import { Sun, MoonStars } from "@phosphor-icons/react";
import {
    ActionIcon,
    useMantineColorScheme,
    useComputedColorScheme,
    type ActionIconProps,
} from "@mantine/core";

export function ThemeSwitcher({ ...props }: ActionIconProps) {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const changeTheme = () =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light");

    return (
        <ActionIcon
            onClick={changeTheme}
            variant="default"
            radius="sm"
            size="lg"
            aria-label="Toggle color scheme"
            className="p-1"
            {...props}>
            <Sun className="hidden dark:block" />
            <MoonStars className="dark:hidden" />
        </ActionIcon>
    );
}
