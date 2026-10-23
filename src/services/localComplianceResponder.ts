import { FoodSafetyDoc } from '../types/foodSafety';

/**
 * Generates an accurate, document-grounded response directly in the browser
 * when running on static hosts (such as GitHub Pages) where `/api/chat/stream` is unavailable.
 */
export function generateLocalComplianceResponse(
  query: string,
  documents: FoodSafetyDoc[],
  activeDoc?: FoodSafetyDoc | null
): string {
  const q = query.toLowerCase().trim();
  const tokens = q
    .replace(/[^a-z0-9#\-\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  // Score all documents against the query
  const scored = documents
    .map((doc) => {
      let score = 0;
      const codeLower = doc.code.toLowerCase();
      const titleLower = doc.title.toLowerCase();
      const summaryLower = doc.summary.toLowerCase();
      const tagsLower = doc.tags.map((t) => t.toLowerCase()).join(' ');
      const takeawaysLower = doc.keyTakeaways.join(' ').toLowerCase();
      const rulesLower = (doc.quickRules || [])
        .map((r) => `${r.title} ${r.rule}`)
        .join(' ')
        .toLowerCase();

      if (q.includes(codeLower) || codeLower.includes(q)) score += 30;
      if (activeDoc && doc.id === activeDoc.id) score += 8;

      for (const token of tokens) {
        if (codeLower.includes(token)) score += 15;
        if (titleLower.includes(token)) score += 10;
        if (tagsLower.includes(token)) score += 6;
        if (rulesLower.includes(token)) score += 5;
        if (takeawaysLower.includes(token)) score += 4;
        if (summaryLower.includes(token)) score += 3;
      }

      return { doc, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const topMatches = scored.slice(0, 3).map((s) => s.doc);

  if (topMatches.length > 0) {
    const primary = topMatches[0];
    const quickRulesMd =
      primary.quickRules && primary.quickRules.length > 0
        ? `\n\n### **Critical Standards & Thresholds (${primary.code})**\n` +
          primary.quickRules
            .slice(0, 5)
            .map((r) => `* **${r.title}:** ${r.rule}`)
            .join('\n')
        : '';

    const takeawaysMd =
      primary.keyTakeaways && primary.keyTakeaways.length > 0
        ? `\n\n### **Key Operational Rules**\n` +
          primary.keyTakeaways
            .slice(0, 5)
            .map((t) => `* ${t}`)
            .join('\n')
        : '';

    const relatedMd =
      topMatches.length > 1
        ? `\n\n### **Related Official Documents**\n` +
          topMatches
            .slice(1)
            .map((d) => `* **${d.code} — ${d.title}:** ${d.summary}`)
            .join('\n')
        : '';

    return `### **${primary.code}: ${primary.title}**\n${primary.summary}${quickRulesMd}${takeawaysMd}${relatedMd}`;
  }

  // Default comprehensive summary if no specific keywords matched
  return `### **L&D Virtual Support — Quick Compliance Standards**
* **Handwashing (IKQA-SOP#001):** Complete 6-step handwash for **40 to 60 seconds** + mandatory **Restroom Double Wash** (wash in restroom, then wash again at kitchen sink).
* **Cold Chain & 15-Minute Rule (IKQAP#003):** Chilled items (**0°C to 4°C**) and frozen items (**≤ -18°C**) must be transferred to cold storage within **15 minutes** of delivery.
* **Danger Zone (5°C to 60°C):** High-risk foods must never remain in the Temperature Danger Zone for more than **1 hour cumulative**.
* **FEFO over FIFO (IKQA-SOP#004):** First-Expiry, First-Out strictly overrides First-In, First-Out. Open items require a 7-part secondary shelf-life label within 5 minutes.
* **Towel & Board Color Coding (IKQAP#015 / IKQA-SOP#010):** White = clean wares; Blue = dining tables; Yellow = cashier/service; Green = kitchen prep; Red = restroom only.
* **Food Safety Act of 2013 (RA 10611):** Statutory compliance mandate overseen by DA, DOH-FDA, and LGU Sanitation units.`;
}
