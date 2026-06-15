# The Bhosale Media Technical Architecture

Status: Pending approval  
Scope: Architecture only. No page sections or visual UI implementation.

## Assumptions

- The attached PRD was not available in the workspace at the time of this architecture pass.
- TBM is treated as a premium media, creative, and growth partner website with high visual ambition, conversion focus, strong technical SEO, and future CMS/contact integrations.
- The stack is fixed: Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP, React Three Fiber, Three.js, and shadcn/ui.

## 1. Folder Structure

```text
src/
  app/
    (marketing)/
      layout.tsx
      page.tsx
    api/
      leads/
        route.ts
      analytics/
        route.ts
    layout.tsx
    not-found.tsx
    robots.ts
    sitemap.ts
    globals.css
  components/
    analytics/
    layout/
    motion/
    seo/
    three/
    ui/
  config/
    analytics.ts
    navigation.ts
    site.ts
  content/
    case-studies/
    legal/
  features/
    conversion/
    lead-capture/
    marketing/
    portfolio/
    services/
  hooks/
    use-gsap-context.ts
    use-media-query.ts
    use-reduced-motion.ts
  lib/
    analytics/
    animations/
    constants/
    lead-generation/
    seo/
    utils.ts
    validation/
  providers/
    analytics-provider.tsx
    motion-provider.tsx
    providers.tsx
  server/
    actions/
    integrations/
    repositories/
  styles/
  types/
    analytics.ts
    lead.ts
    seo.ts
public/
  assets/
    fonts/
    images/
    models/
docs/
  technical-architecture.md
```

Architecture rule: page files compose feature modules only. Section implementations will live inside `features/*` after approval.

## 2. Component Architecture

- `app/*`: route boundaries, metadata, static generation, loading/error states.
- `components/ui/*`: shadcn primitives and low-level design-system controls.
- `components/layout/*`: shell primitives such as header, footer, main container, skip link, navigation frame.
- `components/motion/*`: reusable animation wrappers, reveal primitives, timeline bridges, scroll observers.
- `components/three/*`: canvas shell, scene boundaries, loaders, progressive fallbacks, WebGL capability checks.
- `components/seo/*`: JSON-LD injectors, canonical helpers, social preview helpers.
- `features/*`: business-facing modules such as lead capture, services, case studies, proof, conversion blocks, and portfolio experiences.
- `server/*`: server actions, third-party integrations, data adapters, and API-facing orchestration.

Dependency direction:

```text
app -> features -> components -> lib/config/types
server -> lib/config/types
components must not import features
lib must not import app/features/components
```

## 3. Reusable UI Components

Foundation:

- `Button`
- `Input`
- `Textarea`
- `Select`
- `Checkbox`
- `Dialog`
- `Sheet`
- `Tabs`
- `Accordion`
- `Tooltip`
- `Badge`
- `Card`
- `FormField`
- `Toast`

Project primitives:

- `Container`
- `Section`
- `Grid`
- `Stack`
- `Eyebrow`
- `Heading`
- `RichText`
- `Kicker`
- `CTAGroup`
- `ResponsiveImage`
- `VideoFrame`
- `LogoMark`
- `SkipLink`
- `VisuallyHidden`

Conversion primitives:

- `LeadForm`
- `ContactIntentSelector`
- `BudgetRange`
- `ServiceInterestPicker`
- `CalendlyEmbedBoundary`
- `WhatsAppCTA`
- `StickyMobileCTA`
- `ExitIntentCapture`

Creative primitives:

- `MotionText`
- `Reveal`
- `ParallaxLayer`
- `PinnedScene`
- `ScrollProgress`
- `SceneShell`
- `WebGLFallback`

## 4. Animation Architecture

Principles:

- Framer Motion handles component state transitions, route-level fades, hover/tap interactions, and simple viewport reveals.
- GSAP handles scroll-linked timelines, pinned sequences, staggered editorial choreography, and complex cross-section motion.
- React Three Fiber handles WebGL scenes only when the visual concept meaningfully improves brand perception or storytelling.
- All motion respects `prefers-reduced-motion`.

Folder plan:

```text
src/lib/animations/
  easings.ts
  motion-variants.ts
  gsap.ts
  scroll-triggers.ts
src/components/motion/
  reveal.tsx
  motion-text.tsx
  pinned-scene.tsx
  scroll-progress.tsx
src/components/three/
  scene-shell.tsx
  webgl-fallback.tsx
  performance-monitor.tsx
```

Rules:

- GSAP registration occurs client-side inside a dedicated utility.
- Timelines are scoped with `gsap.context()` and cleaned up on unmount.
- No animation can block content visibility or crawlability.
- Critical copy exists as real HTML, not canvas text.
- Three.js assets are lazy-loaded behind dynamic imports and static fallbacks.

## 5. SEO Architecture

Technical SEO layers:

- Global metadata in `app/layout.tsx`.
- Route-level `generateMetadata()` for unique titles, descriptions, canonicals, and Open Graph data.
- `app/sitemap.ts` generated from route registry and future CMS content.
- `app/robots.ts` with environment-aware indexing rules.
- JSON-LD components for `Organization`, `WebSite`, `Service`, `BreadcrumbList`, `FAQPage`, and future `CreativeWork`.
- Image alt strategy and descriptive filenames for portfolio/media assets.
- Semantic headings enforced per page: one `h1`, meaningful `h2/h3` hierarchy.

SEO folder:

```text
src/lib/seo/
  metadata.ts
  json-ld.ts
  route-registry.ts
  canonical.ts
src/components/seo/
  structured-data.tsx
```

Initial schema targets:

- Organization schema for The Bhosale Media.
- WebSite schema with potential search action only if site search exists.
- Service schema for each service page after content approval.
- Breadcrumb schema for nested pages.

## 6. Analytics Architecture

Measurement goals:

- Identify which pages, CTAs, forms, service interests, and proof points create qualified leads.
- Keep analytics privacy-conscious and resilient when scripts are blocked.
- Avoid layout shifts or main-thread blocking from analytics vendors.

Event taxonomy:

```text
page_view
cta_click
lead_form_start
lead_form_step_complete
lead_form_submit
lead_form_success
lead_form_error
service_interest_select
case_study_open
portfolio_media_play
calendar_open
whatsapp_click
email_click
phone_click
scroll_depth
```

Architecture:

- `AnalyticsProvider` loads approved vendors after consent or after hydration, depending on legal requirements.
- `trackEvent()` offers one typed API for GA4, Meta Pixel, LinkedIn Insight Tag, and server-side logging.
- API endpoint `/api/analytics` can receive important conversion events for server-side durability.
- UTM capture stored in first-party cookie/local storage with expiry.
- Lead submissions attach attribution fields: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `landing_page`, `referrer`, and `first_seen_at`.

## 7. Lead Generation Architecture

Lead capture channels:

- Primary inquiry form.
- Sticky mobile CTA.
- WhatsApp click-to-chat.
- Calendar booking.
- Email and phone click tracking.
- Contextual CTA modules after proof/service content.

Data model:

```ts
type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest: string[];
  budgetRange?: string;
  timeline?: string;
  message?: string;
  source: "website";
  attribution: Attribution;
  createdAt: string;
};
```

Validation and routing:

- Client validation via accessible form states.
- Server validation with a schema in `lib/validation`.
- API route or server action writes to selected destination after approval: CRM, Google Sheets, email, Notion, Airtable, HubSpot, or custom webhook.
- Spam protection via honeypot, timestamp checks, rate limiting, and optional Turnstile.
- Success state gives one clear next step, not a dead-end thank-you screen.

## 8. Mobile Optimization Strategy

- Design mobile-first with fluid layout primitives.
- Keep primary CTA reachable with a sticky mobile action bar only after the hero fold.
- Use responsive image sizes and `next/image` for raster assets.
- Disable or simplify heavy WebGL and pinned scroll experiences on small screens or low-power devices.
- Replace hover-only interactions with tap-friendly alternatives.
- Maintain minimum 44px touch targets.
- Avoid text inside constrained animated containers unless line wrapping is tested.
- Use container queries or responsive component variants where section layout changes substantially.
- Keep navigation thumb-friendly: sheet/drawer pattern, clear close button, visible contact action.

## 9. Accessibility Strategy

- WCAG 2.2 AA target.
- Semantic HTML before ARIA.
- Keyboard navigability for all controls, dialogs, menus, forms, and media.
- Visible focus states using shadcn/Tailwind tokens.
- `prefers-reduced-motion` support for Framer Motion, GSAP, and Three.js scenes.
- Canvas/WebGL scenes must have adjacent semantic text or an accessible fallback.
- Forms expose labels, descriptions, validation messages, and error summary where needed.
- Color contrast checked for text, icons, focus rings, and disabled states.
- Skip link included in global layout.
- No critical content rendered only through animation, image, or canvas.

## 10. Performance Strategy

Targets:

- Lighthouse Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+
- LCP under 2.5s on target mobile network
- CLS under 0.1
- INP under 200ms

Implementation strategy:

- Prefer Server Components by default.
- Add `"use client"` only at animation, interaction, form, and WebGL boundaries.
- Dynamic import for Framer-heavy, GSAP-heavy, and Three.js modules.
- Lazy-load non-critical sections and media.
- Use `next/image` with explicit dimensions and priority only for the LCP image.
- Keep fonts limited, self-hosted or `next/font`, with `display: swap`.
- Use static metadata and route generation where possible.
- Avoid layout shifts by reserving dimensions for images, video, canvas, and forms.
- Bundle monitoring via `next build` output and optional analyzer.
- WebGL scenes get DPR caps, reduced geometry on mobile, and non-WebGL fallbacks.

## Approval Checkpoints

Before UI implementation:

- Confirm final route map.
- Confirm PRD content sections and conversion goals.
- Confirm analytics vendors.
- Confirm lead destination and notification workflow.
- Confirm brand assets, fonts, colors, and visual references.
- Confirm whether Three.js is decorative, narrative, or portfolio-facing.

No website sections should be built until this architecture is approved.
