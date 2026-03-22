---
name: Design system overhaul (shadcn + new aesthetic)
description: Project was redesigned with shadcn/ui, Syne + DM Sans fonts, and a configurable site config
type: project
---

shadcn/ui (nova preset, radix base) was initialized and installed into this project. Components used: button, card, badge, separator, input, textarea, select, checkbox, label, sheet, accordion, tabs, avatar, scroll-area.

Key additions:
- `src/config/site.ts` — central site config object; all content (nav, services, badges, contact, footer links) lives here
- `src/lib/utils.ts` — cn() utility (shadcn standard)
- `src/components/ui/` — shadcn UI components

**Why:** User requested an expandable and configurable design system. siteConfig is the single source of truth for content.

**How to apply:** When adding new sections or services, update siteConfig first. Use shadcn ui/ components for all new UI elements. Use semantic color tokens (bg-primary, text-muted-foreground etc.) not raw hex values.

Design tokens:
- Font heading: Syne Variable (--font-heading)
- Font body: DM Sans (--font-sans)
- Primary color: rich blue oklch(0.49 0.21 264)
- Brand accent: amber/solar gold (--color-solar / var(--solar))
- Dark sections: var(--dark-surface) / var(--dark-surface-foreground)
- Background: warm white oklch(0.992 0.003 90)

Layout utility: Use `.section-container` class instead of `.container` for page sections.
Section labels: Use `.section-label` + `.solar-bar` for consistent section headers.
