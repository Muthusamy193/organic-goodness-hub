import { createContext, useContext, useState, ReactNode } from "react";

export interface SectionContent {
  id: string;
  label: string;
  fields: { key: string; label: string; value: string }[];
}

const defaultContent: SectionContent[] = [
  {
    id: "hero",
    label: "Hero Section",
    fields: [
      { key: "badge", label: "Badge Text", value: "100% Certified Organic" },
      { key: "title1", label: "Title Line 1", value: "Pure & Natural" },
      { key: "title2", label: "Title Line 2 (Highlight)", value: "Traditional Foods" },
      { key: "title3", label: "Title Line 3", value: "For Your Health" },
      { key: "tamilText", label: "Tamil Tagline", value: "பாரம்பரிய உணவை நோக்கிய பயணம்" },
      { key: "description", label: "Description", value: "Discover the finest organic produce from Dhanam Organics. Pure, fresh, and delivered with care to nourish your family with traditional goodness." },
    ],
  },
  {
    id: "about",
    label: "About Section",
    fields: [
      { key: "subtitle", label: "Subtitle", value: "Our Story" },
      { key: "title1", label: "Title Line 1", value: "Rooted in Tradition," },
      { key: "title2", label: "Title Line 2 (Highlight)", value: "Grown with Love" },
      { key: "since", label: "Since Year", value: "Since 2018" },
      { key: "heading", label: "Section Heading", value: "From Our Farms to Your Family's Table" },
    ],
  },
  {
    id: "newsletter",
    label: "Newsletter Section",
    fields: [
      { key: "title", label: "Title", value: "Join Dhanam Family" },
      { key: "description", label: "Description", value: "Subscribe to receive exclusive offers, traditional recipes, and 15% off your first order" },
      { key: "disclaimer", label: "Disclaimer", value: "No spam, unsubscribe anytime. We respect your privacy." },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { key: "brandName", label: "Brand Name", value: "Dhanam Organics" },
      { key: "tamilTagline", label: "Tamil Tagline", value: "பாரம்பரிய உணவை நோக்கிய பயணம்" },
      { key: "description", label: "Description", value: "Bringing nature's finest organic produce from sustainable farms directly to your doorstep. A journey towards traditional food." },
      { key: "copyright", label: "Copyright", value: "© 2026 Dhanam Organics. All rights reserved." },
    ],
  },
];

interface ContentContextType {
  sections: SectionContent[];
  updateSection: (id: string, fields: SectionContent["fields"]) => void;
  getField: (sectionId: string, key: string) => string;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [sections, setSections] = useState<SectionContent[]>(() => {
    try {
      const saved = localStorage.getItem("dhanam_content");
      return saved ? JSON.parse(saved) : defaultContent;
    } catch {
      return defaultContent;
    }
  });

  const updateSection = (id: string, fields: SectionContent["fields"]) => {
    setSections((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, fields } : s));
      localStorage.setItem("dhanam_content", JSON.stringify(updated));
      return updated;
    });
  };

  const getField = (sectionId: string, key: string) => {
    const section = sections.find((s) => s.id === sectionId);
    return section?.fields.find((f) => f.key === key)?.value || "";
  };

  return (
    <ContentContext.Provider value={{ sections, updateSection, getField }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used within ContentProvider");
  return context;
};
