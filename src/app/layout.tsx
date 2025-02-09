import "@/styles/globals.css";
import { breakpoints, colors } from "@/utils/mantine";
import { PhosphorIconsProvider } from "@/components/phosphor-icons-provider";
import type { Metadata } from "next";
import {
    ColorSchemeScript,
    createTheme,
    DEFAULT_THEME,
    MantineProvider,
    mergeMantineTheme,
} from "@mantine/core";
export const metadata: Metadata = {
    title: "Virtual Banner",
    description: "Virtual banner for the annual picnic event.",
};

const theme = mergeMantineTheme(
    DEFAULT_THEME,
    createTheme({
        breakpoints,
        colors,
    })
);

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning>
            <body className="antialiased">
                <ColorSchemeScript />
                <MantineProvider theme={theme}>
                    <PhosphorIconsProvider>{children}</PhosphorIconsProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
