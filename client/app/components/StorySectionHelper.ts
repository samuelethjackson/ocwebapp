import { useEffect, useState } from "react";
import { storyOverview } from "../lib/interface";
import { client } from "../lib/sanity";

export async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc){
    title,
    "currentSlug": slug.current,
    author,
    category,
    type,
  }`;

  const data = await client.fetch(query);
  return data;
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

export const useData = () => {
  const [data, setData] = useState<storyOverview[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result: storyOverview[] = await getData();
      setData(result);
    };

    fetchData();
  }, []);

  return data;
};