"use client";

import { Trash, ArrowsOut, UploadSimple } from "@phosphor-icons/react";
import { useBanner } from "@/components/banner-context-provider";
import {
    Button,
    Stack,
    FileInput,
    Paper,
    Image,
    ActionIcon,
    Slider,
    Text,
    Tooltip,
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

    const handleFileUpload = (files: File[] | null) => {
        if (files) {
            files.forEach((file) => {
                const url = URL.createObjectURL(file);
                addMemory(url);
            });
        }
    };

    return (
        <aside
            className={`absolute top-0 right-0 z-50 h-full transition-transform duration-300 ${
                isFullScreen ? "translate-x-full" : "translate-x-0"
            }`}>
            <Paper className="h-full w-80 p-4 rounded-none border-l">
                <Stack gap="xl">
                    <div>
                        <Text
                            size="sm"
                            fw={500}
                            mb={4}>
                            Add Memory
                        </Text>
                        <FileInput
                            multiple
                            variant="filled"
                            leftSection={<UploadSimple size={16} />}
                            placeholder="Upload memories"
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
                            min={10}
                            max={900}
                            label={(value) => `${value}s`}
                            marks={[
                                { value: 10, label: "10s" },
                                { value: 180, label: "3m" },
                                { value: 600, label: "10m" },
                                { value: 900, label: "15m" },
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
                            max={120}
                            label={(value) => `${value}s`}
                            marks={[
                                { value: 5, label: "1s" },
                                { value: 30, label: "30s" },
                                { value: 60, label: "1m" },
                                { value: 120, label: "2m" },
                            ]}
                        />
                    </div>

                    <Stack gap="xs">
                        <Text
                            size="sm"
                            fw={500}>
                            Memories
                        </Text>
                        <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto [&::-webkit-scrollbar]:w-2">
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

                    <Tooltip label="Press 'Alt + H' to toggle sidebar">
                        <Button
                            onClick={toggleFullScreen}
                            leftSection={<ArrowsOut />}
                            fullWidth>
                            {isFullScreen ? "Show Sidebar" : "Hide Sidebar"}
                        </Button>
                    </Tooltip>
                </Stack>
            </Paper>
        </aside>
    );
}
