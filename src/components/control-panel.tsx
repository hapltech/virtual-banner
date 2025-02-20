"use client";

import { useBannerStore } from "@/store/banner";
import { AnimationType } from "@/utils/config";
import {
    UploadSimple,
    ArrowsOut,
    Confetti,
    Trash,
} from "@phosphor-icons/react";
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
    Select,
    Chip,
} from "@mantine/core";

export function ControlPanel() {
    const {
        config,
        isFullScreen,
        updateConfig,
        toggleFullScreen,
        addMemory,
        removeMemory,
        memoriesPerCycle,
        setMemoriesPerCycle,
        showConfetti,
        toggleConfetti,
    } = useBannerStore();

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
            className={`absolute top-0 right-0 z-50 h-screen transition-transform duration-300 ${
                isFullScreen ? "translate-x-full" : "translate-x-0"
            }`}>
            <Paper className="h-full w-80 p-4 rounded-none border-l overflow-y-auto">
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

                    <div className="flex gap-4 items-end justify-between">
                        <div>
                            <Text
                                size="sm"
                                fw={500}
                                mb={4}>
                                Animation Type
                            </Text>
                            <Select
                                value={config.animationType}
                                data={[
                                    {
                                        value: AnimationType.FADE,
                                        label: "Fade",
                                    },
                                    {
                                        value: AnimationType.SLIDE_LEFT,
                                        label: "Slide Left",
                                    },
                                    {
                                        value: AnimationType.SLIDE_RIGHT,
                                        label: "Slide Right",
                                    },
                                    {
                                        value: AnimationType.ZOOM_IN,
                                        label: "Zoom In",
                                    },
                                    {
                                        value: AnimationType.ZOOM_OUT,
                                        label: "Zoom Out",
                                    },
                                    {
                                        value: AnimationType.RANDOM,
                                        label: "Random",
                                    },
                                ]}
                                onChange={(value) =>
                                    updateConfig({
                                        animationType: value as AnimationType,
                                    })
                                }
                            />
                        </div>

                        <Chip
                            size="lg"
                            radius="sm"
                            checked={showConfetti}
                            icon={<Confetti size={20} />}
                            onChange={toggleConfetti}>
                            Confetti
                        </Chip>
                    </div>

                    <div>
                        <Text
                            size="sm"
                            fw={500}
                            mb={4}>
                            Cycle Interval (seconds)
                        </Text>
                        <Slider
                            value={config.cycleInterval / 1000}
                            onChange={(value) =>
                                updateConfig({ cycleInterval: value * 1000 })
                            }
                            min={10}
                            max={900}
                            step={10}
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
                            Memory Duration (seconds)
                        </Text>
                        <Slider
                            value={config.cycleDuration / 1000}
                            onChange={(value) =>
                                updateConfig({ cycleDuration: value * 1000 })
                            }
                            min={3}
                            max={120}
                            step={1}
                            label={(value) => `${value}s`}
                            marks={[
                                { value: 3, label: "3s" },
                                { value: 30, label: "30s" },
                                { value: 60, label: "1m" },
                                { value: 120, label: "2m" },
                            ]}
                        />
                    </div>

                    <div>
                        <Text
                            size="sm"
                            fw={500}
                            mb={4}>
                            Memories Per Cycle
                        </Text>
                        <Slider
                            value={memoriesPerCycle}
                            onChange={(value) => setMemoriesPerCycle(value)}
                            min={1}
                            max={config.memories.length}
                            step={1}
                            label={(value) => `${value} Images`}
                            marks={[
                                { value: 1, label: "1" },
                                { value: config.memories.length, label: "All" },
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

                    <Tooltip label="Press 'H' or 'Space' to toggle sidebar">
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
