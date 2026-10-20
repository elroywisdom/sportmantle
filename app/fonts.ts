import localFont from "next/font/local";

export const fontBricolage = localFont({
  src: [
    {
      path: "../public/fonts/bricolage-grotesque/BricolageGrotesque-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/bricolage-grotesque/BricolageGrotesque-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/bricolage-grotesque/BricolageGrotesque-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/bricolage-grotesque/BricolageGrotesque-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/bricolage-grotesque/BricolageGrotesque-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/bricolage-grotesque/BricolageGrotesque-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-bricolage",
  display: "swap",
});

export const fontLato = localFont({
  src: [
    {
      path: "../public/fonts/Lato/Lato-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato/Lato-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/Lato/Lato-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato/Lato-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Lato/Lato-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato/Lato-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Lato/Lato-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato/Lato-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Lato/Lato-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato/Lato-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-lato",
});
