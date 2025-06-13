import { create } from "zustand";
import { Text } from "@react-three/drei";

type ScoreStore = {
  score: number;
  addScore: () => void;
};

export const useScoreStore = create<ScoreStore>((set) => ({
  score: 0,
  addScore: () => set((state) => ({ score: state.score + 10 })),
}));

export const Score = () => {
  const formatScoreText = (score: number) => {
    const clampedScore = Math.max(0, Math.min(9999, score));
    return clampedScore.toString().padStart(4, "0");
  };

  const score = useScoreStore((state) => state.score);

  return (
    <Text
      color={0xffa276}
      font="assets/SpaceMono-Bold.ttf"
      fontSize={0.52}
      anchorX="center"
      anchorY="middle"
      position={[0, 0.67, -1.44]}
      quaternion={[-0.4582265217274104, 0, 0, 0.8888354486549235]}
    >
      {formatScoreText(score)}
    </Text>
  );
};
