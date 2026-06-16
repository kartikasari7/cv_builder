"use client";

import dynamic from "next/dynamic";

const templateMap = {
  "minimal-ats": dynamic(() => import("@/components/cv/ats/ATS1"), {
    ssr: false,
  }),

  "ats-2": dynamic(() => import("@/components/cv/ats/ATS2"), {
    ssr: false,
  }),

  "ats-3": dynamic(() => import("@/components/cv/ats/ATS3"), {
    ssr: false,
  }),

  "ats-4": dynamic(() => import("@/components/cv/ats/ATS4"), {
    ssr: false,
  }),

  "ats-5": dynamic(() => import("@/components/cv/ats/ATS5"), {
    ssr: false,
  }),

  "ats-6": dynamic(() => import("@/components/cv/ats/ATS6"), {
    ssr: false,
  }),
};

export default function TemplateRenderer({ templateId, data }) {
  const TemplateComponent =
    templateMap[templateId] || templateMap["minimal-ats"];

  return <TemplateComponent data={data} />;
}
