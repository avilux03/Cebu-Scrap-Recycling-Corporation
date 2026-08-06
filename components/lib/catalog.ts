export type CatalogItem = {
  slug: string;
  label: string;
  image: string | null;
  description: string;
};

export type CatalogCategory = {
  emoji: string;
  label: string;
  slug: string;
  description: string;
  items: CatalogItem[];
};

export const catalog: CatalogCategory[] = [
  {
    emoji: "🔧",
    label: "Ferrous Metals",
    slug: "ferrous-metals",
    description:
      "Ferrous metals contain iron and are among the most recycled materials in the world. We accept all grades of ferrous scrap and offer competitive pricing based on current market rates.",
    items: [
      {
        slug: "steel",
        label: "Steel",
        image: "/steel.png",
        description:
          "Steel is the most recycled metal on the planet. We accept structural steel, sheet steel, rebar, and miscellaneous steel scrap. Recycling steel saves up to 74% of the energy needed to make steel from raw ore. We accept both light and heavy grades.",
      },
      {
        slug: "iron",
        label: "Iron",
        image: "/iron.png",
        description:
          "Wrought iron and pig iron are valuable recyclable materials. We accept iron pipes, fittings, gates, frames, and other iron goods. Iron recycling reduces mining waste significantly and conserves natural resources.",
      },
      {
        slug: "cast-iron",
        label: "Cast Iron",
        image: "/cast iron.png",
        description:
          "Cast iron is a dense, high-carbon iron alloy found in engine blocks, pipes, cookware, and industrial machinery parts. Its high density means even small quantities carry good weight and value.",
      },
      {
        slug: "stainless",
        label: "Stainless",
        image: "/stainless.png",
        description:
          "Stainless steel contains chromium and nickel, making it highly valuable in scrap recycling. We accept all grades — 304, 316, and others — from kitchen equipment, medical devices, industrial tanks, and more.",
      },
      {
        slug: "cans",
        label: "Cans",
        image: "/cans.png",
        description:
          "Steel cans from food and beverage packaging are 100% recyclable. We accept baled or loose steel cans in large quantities. Tin-coated steel cans are separated and processed to recover both steel and tin.",
      },
    ],
  },
  {
    emoji: "🟡",
    label: "Non-Ferrous Metals",
    slug: "non-ferrous-metals",
    description:
      "Non-ferrous metals do not contain iron and are generally more valuable by weight. They are highly sought after for their conductivity, corrosion resistance, and recyclability.",
    items: [
      {
        slug: "copper",
        label: "Copper",
        image: "/copper.png",
        description:
          "Copper is one of the most valuable non-ferrous metals we buy. We accept bare bright copper wire, #1 and #2 copper, copper tubing, bus bars, and copper-bearing alloys. Copper retains nearly all its properties after recycling.",
      },
      {
        slug: "brass",
        label: "Brass",
        image: "/brass.png",
        description:
          "Brass is an alloy of copper and zinc, commonly found in plumbing fixtures, valves, keys, and musical instruments. We accept yellow brass, red brass, and leaded brass in all forms.",
      },
      {
        slug: "bronze",
        label: "Bronze",
        image: "/bronze.png",
        description:
          "Bronze is a copper-tin alloy prized for its strength and corrosion resistance. Found in bearings, bushings, propellers, and statues. We buy clean bronze and mixed bronze-copper alloys.",
      },
      {
        slug: "aluminum",
        label: "Aluminum",
        image: "/alu.png",
        description:
          "Aluminum recycling uses only 5% of the energy needed to produce primary aluminum. We accept aluminum cans, extrusions, cast aluminum, wheels, wire, and sheet. Aluminum is one of our highest-volume materials.",
      },
      {
        slug: "tin",
        label: "Tin",
        image: "/tin cans alu.png",
        description:
          "Tin is used as a coating on steel cans and in soldering applications. We accept tin-coated items and tin alloys. Tin recovery from scrap reduces the need for mining this relatively rare metal.",
      },
      {
        slug: "zinc",
        label: "Zinc",
        image: "/zink.png",
        description:
          "Zinc is commonly found in die-cast parts, galvanized steel, and old carburetor components. We accept clean zinc die-cast, zinc dross, and mixed zinc alloys for recycling.",
      },
    ],
  },
  {
    emoji: "🚗",
    label: "Vehicles & Parts",
    slug: "vehicles-parts",
    description:
      "We accept a wide range of vehicle components and automotive scrap. From entire end-of-life vehicles to individual parts, we ensure responsible and environmentally sound recycling.",
    items: [
      {
        slug: "engine",
        label: "Engine",
        image: "/engines.png",
        description:
          "Complete engines and engine blocks contain a mix of cast iron, aluminum, steel, and copper — making them highly valuable scrap. We accept gasoline and diesel engines from cars, trucks, boats, and industrial equipment.",
      },
      {
        slug: "transmission",
        label: "Transmission",
        image: "/engines 1.png",
        description:
          "Transmission units are a mix of aluminum housings, steel gears, and cast iron components. Whether manual or automatic, we accept transmissions from all vehicle types and sizes.",
      },
      {
        slug: "radiator",
        label: "Radiator",
        image: "/radiators.png",
        description:
          "Copper-brass and aluminum radiators are among the most recyclable auto parts. We buy clean radiators (drained of fluid), copper-brass units, and aluminum radiators. We offer competitive rates based on type and condition.",
      },
      {
        slug: "alternator",
        label: "Alternator",
        image: null,
        description:
          "Alternators contain copper windings, aluminum housings, and steel components. We accept alternators and starters from all vehicle types. These are processed to recover copper, aluminum, and iron separately.",
      },
      {
        slug: "battery",
        label: "Battery",
        image: "/batteries.png",
        description:
          "Lead-acid batteries from cars, trucks, motorcycles, and UPS systems are accepted. Lead recovery from old batteries is one of the most efficient recycling processes. We handle all battery types responsibly and safely.",
      },
    ],
  },
  {
    emoji: "⚙️",
    label: "Machinery & Equipment",
    slug: "machinery-equipment",
    description:
      "Industrial machinery and heavy equipment contain large quantities of ferrous and non-ferrous metals. We buy entire machines or individual parts — generators, pumps, compressors, motors, and more.",
    items: [
      {
        slug: "generators",
        label: "Generators",
        image: null,
        description:
          "Generators contain valuable copper windings, steel frames, and aluminum components. We accept diesel and gasoline generators of all sizes — from portable units to large industrial standby generators.",
      },
      {
        slug: "pumps",
        label: "Pumps",
        image: "/machines.png",
        description:
          "Industrial pumps are made from cast iron, stainless steel, bronze, and aluminum depending on their application. We accept centrifugal pumps, submersible pumps, and hydraulic pumps for recycling.",
      },
      {
        slug: "compressors",
        label: "Compressors",
        image: null,
        description:
          "Air compressors and refrigeration compressors contain copper motors, cast iron cylinders, and steel tanks. We accept compressors from air conditioning units, industrial systems, and automotive shops.",
      },
      {
        slug: "motors",
        label: "Motors",
        image: "/machines.png",
        description:
          "Electric motors are packed with copper windings and steel laminations, making them excellent scrap value. We accept motors of all sizes — from small household appliance motors to large three-phase industrial motors.",
      },
      {
        slug: "heavy-equipment",
        label: "Heavy Equipment",
        image: null,
        description:
          "Excavators, bulldozers, cranes, and other heavy equipment contain massive amounts of structural steel, cast iron, and hydraulic components. We coordinate pickup and processing for large-scale equipment decommissioning.",
      },
    ],
  },
  {
    emoji: "📺",
    label: "Home & Office Appliances",
    slug: "home-office-appliances",
    description:
      "E-waste and home appliances contain recoverable metals, plastics, and components. We accept a wide variety of household and office equipment for responsible recycling.",
    items: [
      {
        slug: "tv",
        label: "TV",
        image: "/tv and aircon.png",
        description:
          "Old televisions — CRT, LCD, and LED — contain valuable metals and must be disposed of responsibly. We accept all TV types. CRTs are processed with care due to lead content in the glass, while flat panels yield aluminum, copper, and circuit boards.",
      },
      {
        slug: "refrigerator",
        label: "Refrigerator",
        image: "/refs.png",
        description:
          "Refrigerators contain steel shells, copper tubing in coils, aluminum evaporators, and compressors. We accept residential and commercial refrigerators and freezers. Refrigerants are handled in compliance with environmental regulations.",
      },
      {
        slug: "aircon",
        label: "Aircon",
        image: "/tv and aircon.png",
        description:
          "Air conditioning units are rich in copper (tubing and motors), aluminum (fins and housing), and steel. We accept window-type, split-type, and industrial air conditioners. Refrigerant is recovered before processing.",
      },
      {
        slug: "computer",
        label: "Computer",
        image: "/computers.png",
        description:
          "Computers, laptops, servers, and peripherals are accepted for e-waste recycling. Circuit boards contain trace amounts of gold, silver, and palladium in addition to copper. Hard drives are shredded for data security before processing.",
      },
      {
        slug: "other-appliances",
        label: "Other Appliances",
        image: null,
        description:
          "Washing machines, ovens, microwave ovens, electric fans, rice cookers, and other household electronics are all accepted. Most contain recoverable steel, copper motors, and aluminum or plastic components.",
      },
    ],
  },
  {
    emoji: "♻️",
    label: "Plastics & Cartons",
    slug: "plastics-cartons",
    description:
      "We accept a range of recyclable plastics and paper-based packaging materials. Keeping plastics and cartons out of landfills is part of our commitment to a cleaner Philippines.",
    items: [
      
    
      {
        slug: "cartons",
        label: "Cartons",
        image: "/cartons.png",
        description:
          "Beverage cartons and food-grade cartons are accepted in bulk. These multi-layer packaging materials contain paper, plastic, and aluminum layers that are separated and recycled individually.",
      },
      {
        slug: "industrial-plastic",
        label: "Industrial Plastic",
        image: "/plastic.png",
        description:
          "Industrial plastic scrap from manufacturing, construction, and packaging operations is accepted in large volumes. We buy PP, ABS, PS, and mixed plastic scrap depending on grade and cleanliness.",
      },
    ],
  },
];