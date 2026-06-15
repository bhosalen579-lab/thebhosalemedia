# The Bhosale Media Design System

Status: Design system only  
Scope: No website sections, page layouts, or content modules

## Brand Direction

The Bhosale Media should feel premium, modern, technical, and enterprise-ready. The visual language is dark, precise, spacious, cinematic, and confident. Accent color is used with restraint so every orange moment feels intentional and conversion-oriented.

## Typography Scale

Font strategy:

- Primary sans: `Inter`, `Geist`, or equivalent modern grotesk
- Display use: same family with tighter weight control, not a decorative font
- Numeric/data use: tabular numbers enabled where possible

Scale:

```text
display-xl: 72px / 78px / 700
display-lg: 60px / 66px / 700
display-md: 48px / 56px / 650
heading-xl: 40px / 48px / 650
heading-lg: 32px / 40px / 650
heading-md: 24px / 32px / 600
heading-sm: 20px / 28px / 600
body-lg:    18px / 30px / 400
body-md:    16px / 26px / 400
body-sm:    14px / 22px / 400
caption:    12px / 18px / 500
label:      13px / 18px / 600
button:     14px / 20px / 650
```

Responsive rules:

- Do not scale typography with viewport width.
- Mobile display maximum: `44px`.
- Maintain `letter-spacing: 0`.
- Use uppercase only for labels, badges, and metadata.
- Keep line length between 55 and 72 characters for long-form copy.

## Color Tokens

Core brand colors:

```text
brand-black:      #0A0A0A
brand-charcoal:   #171717
brand-orange:     #FF6B00
brand-text:       #F5F5F5
```

Extended neutral system:

```text
neutral-950: #0A0A0A
neutral-900: #111111
neutral-850: #171717
neutral-800: #1F1F1F
neutral-700: #2A2A2A
neutral-600: #404040
neutral-500: #737373
neutral-400: #A3A3A3
neutral-300: #D4D4D4
neutral-200: #E5E5E5
neutral-100: #F5F5F5
white:       #FFFFFF
```

Accent system:

```text
accent-600: #FF6B00
accent-500: #FF7A1A
accent-400: #FF8B33
accent-300: #FFA366
accent-soft: rgba(255, 107, 0, 0.14)
accent-line: rgba(255, 107, 0, 0.34)
accent-glow: rgba(255, 107, 0, 0.45)
```

Semantic tokens:

```text
background:        #0A0A0A
surface:           #171717
surface-elevated:  #1F1F1F
surface-muted:     #111111
border:            rgba(245, 245, 245, 0.10)
border-strong:     rgba(245, 245, 245, 0.18)
text-primary:      #F5F5F5
text-secondary:    rgba(245, 245, 245, 0.72)
text-muted:        rgba(245, 245, 245, 0.52)
text-disabled:     rgba(245, 245, 245, 0.34)
focus-ring:        #FF6B00
success:           #20C997
warning:           #FFB020
error:             #FF4D4F
```

Usage rules:

- `#0A0A0A` is the dominant page background.
- `#171717` is used for elevated panels, navigation, forms, and modals.
- `#FF6B00` is reserved for primary CTAs, focus, active states, highlights, and conversion markers.
- Avoid large orange backgrounds except for deliberate CTA moments.

## Shadows

Dark UI shadows must be subtle and layered, not cloudy.

```text
shadow-sm:  0 4px 12px rgba(0, 0, 0, 0.28)
shadow-md:  0 12px 32px rgba(0, 0, 0, 0.38)
shadow-lg:  0 24px 70px rgba(0, 0, 0, 0.48)
shadow-xl:  0 36px 100px rgba(0, 0, 0, 0.58)
shadow-inset: inset 0 1px 0 rgba(255, 255, 255, 0.06)
```

Use shadows for:

- Modals
- Navigation overlays
- Floating conversion controls
- Elevated media surfaces

Avoid shadows for:

- Basic sections
- Decorative cards
- Text blocks

## Glow System

Glow is a premium accent, not decoration.

```text
glow-accent-sm:  0 0 16px rgba(255, 107, 0, 0.22)
glow-accent-md:  0 0 34px rgba(255, 107, 0, 0.30)
glow-accent-lg:  0 0 64px rgba(255, 107, 0, 0.38)
glow-line:       0 0 18px rgba(255, 107, 0, 0.24)
glow-focus:      0 0 0 4px rgba(255, 107, 0, 0.22)
```

Rules:

- Use glow on primary CTA hover, active navigation indicators, focus states, and selected form options.
- Never use multiple large glows in the same viewport.
- No floating decorative glow blobs.
- Glow must have a functional or brand-emphasis purpose.

## Border Radius

```text
radius-xs: 4px
radius-sm: 6px
radius-md: 8px
radius-lg: 12px
radius-xl: 16px
radius-full: 999px
```

Rules:

- Default interactive controls: `8px`.
- Cards and panels: `8px` or `12px`.
- Enterprise surfaces should avoid overly rounded shapes.
- Pills are allowed for badges, tags, filters, and compact metadata only.

## Glassmorphism Rules

Glass should feel like precision hardware, not frosted decoration.

Base glass:

```text
background: rgba(23, 23, 23, 0.72)
border: 1px solid rgba(245, 245, 245, 0.12)
backdrop-filter: blur(18px)
box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06)
```

Premium glass:

```text
background: linear-gradient(
  180deg,
  rgba(245, 245, 245, 0.08),
  rgba(23, 23, 23, 0.72)
)
border: 1px solid rgba(245, 245, 245, 0.14)
backdrop-filter: blur(24px)
```

Rules:

- Use glass for navigation, modals, overlays, and select premium panels.
- Keep text contrast high.
- Avoid glass on dense form bodies unless readability remains excellent.
- Always provide a solid fallback background.

## CTA Styles

Primary CTA:

```text
background: #FF6B00
color: #0A0A0A
border: 1px solid #FF6B00
height: 48px desktop / 46px mobile
padding: 0 22px
radius: 8px
font: button
shadow: glow-accent-sm on hover
```

Primary CTA hover:

```text
background: #FF7A1A
border-color: #FF7A1A
transform: translateY(-1px)
box-shadow: glow-accent-md
```

Secondary CTA:

```text
background: transparent
color: #F5F5F5
border: 1px solid rgba(245, 245, 245, 0.18)
height: 48px
radius: 8px
```

Secondary CTA hover:

```text
background: rgba(245, 245, 245, 0.06)
border-color: rgba(245, 245, 245, 0.32)
```

Ghost CTA:

```text
background: transparent
color: rgba(245, 245, 245, 0.78)
```

Ghost CTA hover:

```text
color: #F5F5F5
background: rgba(245, 245, 245, 0.06)
```

CTA rules:

- Primary CTA appears once per major viewport cluster.
- Use action-first labels.
- Icon placement: right side for progression, left side for channel-specific actions.
- Mobile CTAs use full width only when inside forms or sticky bars.

## Form Styles

Input:

```text
height: 48px
background: rgba(245, 245, 245, 0.04)
border: 1px solid rgba(245, 245, 245, 0.12)
radius: 8px
color: #F5F5F5
placeholder: rgba(245, 245, 245, 0.42)
padding: 0 14px
```

Textarea:

```text
min-height: 132px
padding: 14px
resize: vertical
```

Focus:

```text
border-color: #FF6B00
box-shadow: glow-focus
outline: none
```

Error:

```text
border-color: #FF4D4F
message-color: #FFB3B3
```

Success:

```text
border-color: #20C997
message-color: #8CE8C7
```

Rules:

- Labels are always visible.
- Required fields use text indicators, not color alone.
- Error messages appear directly below the field.
- Form groups use `20px` vertical spacing.
- Multi-step forms should show progress text and preserve entered values.

## Modal Styles

Modal container:

```text
background: rgba(23, 23, 23, 0.92)
border: 1px solid rgba(245, 245, 245, 0.14)
radius: 12px
shadow: shadow-xl
backdrop-filter: blur(24px)
```

Overlay:

```text
background: rgba(10, 10, 10, 0.76)
backdrop-filter: blur(8px)
```

Sizing:

```text
sm: 420px
md: 560px
lg: 760px
xl: 960px
mobile: calc(100vw - 32px)
```

Rules:

- Close button is always visible in the top-right.
- Focus is trapped inside the modal.
- Escape closes non-critical modals.
- Destructive confirmations require explicit action labels.
- Lead modals should avoid visual clutter and keep one primary action.

## Animation Durations

```text
instant: 80ms
fast: 160ms
base: 240ms
smooth: 360ms
slow: 520ms
cinematic: 800ms
```

Easing:

```text
ease-standard: cubic-bezier(0.22, 1, 0.36, 1)
ease-in:       cubic-bezier(0.32, 0, 0.67, 0)
ease-out:      cubic-bezier(0.33, 1, 0.68, 1)
ease-emphasis: cubic-bezier(0.16, 1, 0.3, 1)
```

Usage:

- Hover/focus: `160ms-240ms`
- Dropdowns/sheets: `240ms-360ms`
- Modal entrance: `360ms`
- Section reveal: `520ms`
- Cinematic hero/3D choreography: `800ms+`

Rules:

- Reduced motion replaces movement with opacity or instant state changes.
- UI controls should feel immediate.
- GSAP scroll animations must scrub smoothly and never hide essential content from crawlers.

## Hover States

Global hover principles:

- Use hover to clarify interactivity, not to reveal essential information.
- Hover states should combine at most two changes: color, border, shadow, transform, or opacity.
- Transform distance should stay between `1px` and `4px`.

Interactive states:

```text
default -> hover -> active -> focus-visible -> disabled
```

Buttons:

- Primary: brighter orange, slight lift, accent glow.
- Secondary: brighter border, subtle surface fill.
- Ghost: foreground becomes full text color, soft surface fill.

Cards:

- Border increases from `0.10` to `0.18` opacity.
- Optional `translateY(-2px)`.
- No heavy glow unless the card is selected or conversion-critical.

Links:

- Text color moves from muted to primary.
- Underline or accent line animates from left to right.
- External links may show an arrow icon movement of `2px`.

Form options:

- Border brightens.
- Selected state uses accent border and `accent-soft` background.

Navigation:

- Hover text becomes `#F5F5F5`.
- Active item uses accent line or dot, not a large filled background.

## Tailwind Token Mapping

Recommended CSS variable layer:

```css
:root {
  --background: 0 0% 4%;
  --foreground: 0 0% 96%;
  --card: 0 0% 9%;
  --card-foreground: 0 0% 96%;
  --popover: 0 0% 9%;
  --popover-foreground: 0 0% 96%;
  --primary: 25 100% 50%;
  --primary-foreground: 0 0% 4%;
  --secondary: 0 0% 9%;
  --secondary-foreground: 0 0% 96%;
  --muted: 0 0% 12%;
  --muted-foreground: 0 0% 64%;
  --accent: 25 100% 50%;
  --accent-foreground: 0 0% 4%;
  --destructive: 359 100% 65%;
  --destructive-foreground: 0 0% 96%;
  --border: 0 0% 96% / 0.10;
  --input: 0 0% 96% / 0.12;
  --ring: 25 100% 50%;
  --radius: 0.5rem;
}
```

Approval note: these tokens should be applied to Tailwind and shadcn configuration after design system approval.
