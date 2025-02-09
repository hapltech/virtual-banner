"use client";

import { Trash, ArrowsOut, ArrowsIn } from "@phosphor-icons/react";
import { useBanner } from "@/components/banner-context-provider";
import {
    Button,
    Stack,
    FileInput,
    Paper,
    Group,
    Image,
    ActionIcon,
    Slider,
    Text,
} from "@mantine/core";

export function ControlPanel() {
    const {
        config,
        isFullScreen,
        updateConfig,
        toggleFullScreen,
        addMemory,
        removeMemory,
    } = useBanner();

    const handleFileUpload = (file: File | null) => {
        if (file) {
            const url = URL.createObjectURL(file);
            if (file.name.includes("banner")) {
                updateConfig({ bannerImage: url });
            } else {
                addMemory(url);
            }
        }
    };

    return (
        <aside
            className={`w-80 h-full transition-transform duration-300 ${
                isFullScreen ? "-translate-x-full" : "translate-x-0"
            }`}>
            <Paper className="h-full p-4 rounded-none border-r">
                <Stack gap="xl">
                    <div>
                        <Text
                            size="sm"
                            fw={500}
                            mb={4}>
                            Banner Image
                        </Text>
                        <FileInput
                            placeholder="Upload banner"
                            accept="image/*"
                            onChange={handleFileUpload}
                        />
                    </div>

                    <div>
                        <Text
                            size="sm"
                            fw={500}
                            mb={4}>
                            Add Memory
                        </Text>
                        <FileInput
                            placeholder="Upload memory"
                            accept="image/*"
                            onChange={handleFileUpload}
                        />
                    </div>

                    <div>
                        <Text
                            size="sm"
                            fw={500}
                            mb={4}>
                            Cycle Interval
                        </Text>
                        <Slider
                            value={config.cycleInterval / 1000}
                            onChange={(value) =>
                                updateConfig({ cycleInterval: value * 1000 })
                            }
                            min={1}
                            max={300}
                            label={(value) => `${value}s`}
                            marks={[
                                { value: 60, label: "1m" },
                                { value: 180, label: "3m" },
                                { value: 300, label: "5m" },
                            ]}
                        />
                    </div>

                    <div>
                        <Text
                            size="sm"
                            fw={500}
                            mb={4}>
                            Memory Duration
                        </Text>
                        <Slider
                            value={config.cycleDuration / 1000}
                            onChange={(value) =>
                                updateConfig({ cycleDuration: value * 1000 })
                            }
                            min={1}
                            max={30}
                            label={(value) => `${value}s`}
                            marks={[
                                { value: 5, label: "5s" },
                                { value: 15, label: "15s" },
                                { value: 30, label: "30s" },
                            ]}
                        />
                    </div>

                    <Stack gap="xs">
                        <Text
                            size="sm"
                            fw={500}>
                            Memories
                        </Text>
                        <div className="grid grid-cols-2 gap-2">
                            {config.memories.map((memory, index) => (
                                <div
                                    key={index}
                                    className="relative group">
                                    <Image
                                        src={memory}
                                        alt={`Memory ${index + 1}`}
                                        className="rounded"
                                    />
                                    <ActionIcon
                                        color="red"
                                        variant="filled"
                                        size="xs"
                                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => removeMemory(memory)}>
                                        <Trash size={12} />
                                    </ActionIcon>
                                </div>
                            ))}
                        </div>
                    </Stack>

                    <Button
                        onClick={toggleFullScreen}
                        fullWidth>
                        {isFullScreen ? <ArrowsOut /> : <ArrowsIn />}
                        {isFullScreen
                            ? "Exit Fullscreen (Esc)"
                            : "Enter Fullscreen (F11)"}
                    </Button>
                </Stack>
            </Paper>
        </aside>
    );
}
