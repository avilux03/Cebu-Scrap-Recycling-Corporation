export type BuyItem = {
  slug: string;
  label: string;
  image: string;
  tag: string;
  description: string;
};

export type BuyCategory = {
  emoji: string;
  label: string;
  slug: string;
  description: string;
  items: BuyItem[];
};

export const buyCatalog: BuyCategory[] = [
  {
    emoji: "🏠",
    label: "Class B Roofing Materials",
    slug: "class-b-roofing-materials",
    description:
      "Quality pre-owned and surplus roofing materials — sheets and structural framing ready for your next roofing project at a fraction of retail cost.",
    items: [
      {
        slug: "gi-sheets",
        label: "Galvanized Iron (GI) Sheets",
        image: "/galvanized.png",
        tag: "Thickness: 0.2 mm / 0.4 mm / 0.5 mm | Length: 6, 8, 10, 12 ft",
        description:
          "Galvanized iron sheets are coated for rust resistance, ideal for roofing in all weather conditions. We sell them in multiple thicknesses and lengths to fit any project size.",
      },
      {
        slug: "galvalume-sheets",
        label: "Galvalume Sheets",
        image: "/galvalume.png",
        tag: "Thickness: 0.2 mm / 0.4 mm / 0.5 mm | Length: 6, 8, 10, 12 ft",
        description:
          "Galvalume combines steel with aluminum-zinc coating for superior corrosion resistance and longevity. Available in standard sizes perfect for residential and commercial roofing.",
      },
      {
        slug: "bi-c-purlins",
        label: "Black Iron (BI) C-Purlins",
        image: "/purlins.png",
        tag: "Structural framing for roofing systems",
        description:
          "Black iron C-purlins are essential structural framing members used to support roofing sheets. Strong, cost-effective, and ready for your next construction project.",
      },
    ],
  },
  {
    emoji: "🔩",
    label: "Hardware Materials",
    slug: "hardware-materials",
    description:
      "Structural and framing hardware for fabrication, construction, and interior work — steel tubes, angle bars, and light-gauge framing components.",
    items: [
      {
        slug: "steel-tubes",
        label: "Steel Tubes",
        image: "/steeltubes.png",
        tag: "Various sizes available",
        description:
          "Versatile steel tubes suitable for framing, fabrication, and structural applications. Available in various sizes to match your specific build requirements.",
      },
      {
        slug: "angle-bars",
        label: "Angle Bars",
        image: "/angel bars.png",
        tag: "For structural & fabrication use",
        description:
          "Angle bars provide strong corner and edge support for structural and fabrication work. We carry multiple sizes for both light and heavy-duty applications.",
      },
      {
        slug: "c-runner",
        label: "C-Runner",
        image: "/c runner.png",
        tag: "Light gauge steel framing",
        description:
          "Light gauge steel C-runners are used for ceiling and wall framing systems. Lightweight yet strong, ideal for interior construction and partition work.",
      },
    ],
  },
  {
    emoji: "📦",
    label: "Others",
    slug: "others",
    description:
      "Miscellaneous pre-owned materials — plastic containers and PVC doors — available in good condition at budget-friendly prices.",
    items: [
      {
        slug: "plastic-containers",
        label: "Plastic Containers",
        image: "/others.png",
        tag: "Various sizes & colors available",
        description:
          "Durable pre-owned plastic containers available in various sizes and colors. Great for storage, industrial use, or everyday household needs.",
      },
      {
        slug: "pvc-doors",
        label: "PVC Doors",
        image: "/pvcdoors.png",
        tag: "Lightweight & durable pre-owned doors",
        description:
          "Lightweight and moisture-resistant pre-owned PVC doors perfect for bathrooms and utility areas. A budget-friendly option without compromising on quality.",
      },
    ],
  },
];