"use client";

import { IconContext } from "@phosphor-icons/react";

export function PhosphorIconsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <IconContext.Provider
            value={{
                weight: "duotone",
                strokeWidth: 1.5,
            }}>
            {children}
        </IconContext.Provider>
    );
}
