"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";

import { getSliderConfig } from "./Navbar_Desktop_Second_Row_Slider_Config";

export default function NavbarDesktopSecondRowSliderItem() {
  const { theme } = useTheme();
  const { isRTL, t } = useLanguage();

  const params = useParams();
  const pathname = usePathname();

  const getCurrentLanguage = () => {
    const segments = pathname?.split("/").filter(Boolean);

    const supportedLanguages = [
      "en",
      "es",
      "fr",
      "de",
      "ja",
      "zh",
      "hi",
      "ar",
      "ur",
      "bn",
      "pt",
      "ru",
      "it",
      "ko",
      "nl",
      "tr",
      "vi",
      "th",
      "pl",
      "sv",
      "ta",
      "te",
      "ml",
      "kn",
      "mr",
    ];

    if (segments?.length && supportedLanguages.includes(segments[0])) {
      return segments[0];
    }

    return params?.lang || "en";
  };

  const currentLang = getCurrentLanguage();

  const sliderConfig = getSliderConfig(t, currentLang);

  return (
    <div
      className="flex items-center gap-2 whitespace-nowrap"
      style={{
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      {sliderConfig.items.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`
            flex items-center gap-2
            px-4 py-2
            rounded-full
            transition-all duration-200
            whitespace-nowrap
            hover:scale-105
            ${
              theme.background?.card ||
              "bg-gray-100 dark:bg-gray-800"
            }
            ${
              theme.textColors?.primary ||
              "text-gray-700 dark:text-gray-200"
            }
          `}
        >
          {item.icon}

          <span className="text-sm font-medium">
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
}