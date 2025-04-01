import { useEffect, useState } from "react";
import { BlogOverview } from "../lib/types";
import { getBlogOverviews } from "../lib/cms";

export function useData() {
  const [data, setData] = useState<BlogOverview[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getBlogOverviews();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch data"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
}

export const randomPosition = (
  maxHeight: number,
  maxWidth: number,
  existingPositions: { top: number; left: number }[]
) => {
  const boundaryTop = 0.15 * maxHeight;
  const boundaryBottom = 0.15 * maxHeight;
  const boundaryLeft = 0.1 * maxWidth;
  const boundaryRight = 0.1 * maxWidth;

  let x, y, overlap;

  do {
    overlap = false;
    x = Math.floor(
      Math.random() * (maxWidth - boundaryLeft - boundaryRight) +
        boundaryLeft
    );
    y = Math.floor(
      Math.random() * (maxHeight - boundaryTop - boundaryBottom) +
        boundaryTop
    );

    // Check if the new position overlaps with any existing position
    for (let pos of existingPositions) {
      if (Math.abs(pos.left - x) < 50 && Math.abs(pos.top - y) < 50) {
        // 50 is the minimum distance between elements
        overlap = true;
        break;
      }
    }
  } while (overlap);

  return { top: y, left: x };
};

export const useWindowDimensions = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  return { windowWidth, windowHeight };
};