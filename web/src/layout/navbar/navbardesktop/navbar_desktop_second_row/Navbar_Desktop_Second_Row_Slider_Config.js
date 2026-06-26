import {
  FaFire,
  FaStar,
  FaBook,
  FaGlobe,
  FaUniversity,
  FaLeaf,
  FaRobot,
  FaGamepad,
} from "react-icons/fa";

export const getSliderConfig = (t, currentLang) => ({
  items: [
    {
      name: "Trending",
      icon: <FaFire />,
      path: `/${currentLang}/trending`,
    },
    {
      name: "Popular",
      icon: <FaStar />,
      path: `/${currentLang}/popular`,
    },
    {
      name: "New Books",
      icon: <FaBook />,
      path: `/${currentLang}/new-books`,
    },
    {
      name: "World",
      icon: <FaGlobe />,
      path: `/${currentLang}/world`,
    },
    {
      name: "Education",
      icon: <FaUniversity />,
      path: `/${currentLang}/education`,
    },
    {
      name: "Nature",
      icon: <FaLeaf />,
      path: `/${currentLang}/nature`,
    },
    {
      name: "AI",
      icon: <FaRobot />,
      path: `/${currentLang}/ai`,
    },
    {
      name: "Gaming",
      icon: <FaGamepad />,
      path: `/${currentLang}/gaming`,
    },
  ],
});