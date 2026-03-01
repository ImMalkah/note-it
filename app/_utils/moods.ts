export interface Mood {
    id: string;
    label: string;
    emoji: string;
    color: string;
    gradient: string;
}

export const MOODS: Mood[] = [
    {
        id: "excited",
        label: "Excited",
        emoji: "🤩",
        color: "#F59E0B", // Amber 500
        gradient: "linear-gradient(135deg, #FCD34D, #F59E0B)",
    },
    {
        id: "happy",
        label: "Happy",
        emoji: "😊",
        color: "#10B981", // Emerald 500
        gradient: "linear-gradient(135deg, #6EE7B7, #10B981)",
    },
    {
        id: "chill",
        label: "Chill",
        emoji: "😌",
        color: "#6366f1", // Indigo 500
        gradient: "linear-gradient(135deg, #A5B4FC, #6366f1)",
    },
    {
        id: "creative",
        label: "Creative",
        emoji: "✨",
        color: "#8B5CF6", // Violet 500
        gradient: "linear-gradient(135deg, #C4B5FD, #8B5CF6)",
    },
    {
        id: "focused",
        label: "Focused",
        emoji: "🧠",
        color: "#3B82F6", // Blue 500
        gradient: "linear-gradient(135deg, #93C5FD, #3B82F6)",
    },
    {
        id: "tired",
        label: "Tired",
        emoji: "😴",
        color: "#64748B", // Slate 500
        gradient: "linear-gradient(135deg, #CBD5E1, #64748B)",
    },
    {
        id: "sad",
        label: "Sad",
        emoji: "😢",
        color: "#0EA5E9", // Sky 500
        gradient: "linear-gradient(135deg, #7DD3FC, #0EA5E9)",
    },
    {
        id: "angry",
        label: "Angry",
        emoji: "😡",
        color: "#EF4444", // Red 500
        gradient: "linear-gradient(135deg, #FCA5A5, #EF4444)",
    },
    {
        id: "anxious",
        label: "Anxious",
        emoji: "😬",
        color: "#F97316", // Orange 500
        gradient: "linear-gradient(135deg, #FDBA74, #F97316)",
    },
    {
        id: "grateful",
        label: "Grateful",
        emoji: "🙏",
        color: "#EC4899", // Pink 500
        gradient: "linear-gradient(135deg, #F9A8D4, #EC4899)",
    }
];

export const getMoodById = (id: string): Mood | undefined => {
    return MOODS.find((m) => m.id === id);
};
