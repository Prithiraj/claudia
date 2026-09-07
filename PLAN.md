# Claudia Witzke — Website Design & Conversion Plan

**Research date:** 7 September 2026  
**Implementation status:** Implemented as a public prototype; operator identity and owner-photo approvals still require confirmation before official commercial launch.  
**Primary language:** German  
**Primary actions:** Call the shop; open directions.

## 1. Evidence baseline

### Facts used in the site

- **Business:** Claudia Witzke / Witzke Claudia Blumenfachgeschäft.
- **Category:** Florist / flowers and plants.
- **Address:** Hauptstraße 9, 13055 Berlin, Alt-Hohenschönhausen.
- **Phone:** +49 30 98696347.
- **Email:** claudiawitzke@googlemail.com (Fleurop partner listing).
- **Hours used:** Monday–Friday 08:00–19:00; Saturday 08:00–16:00; Sunday closed.
- **Fleurop:** Current partner listing exists and explicitly lists Fleurop vouchers.
- **Google reputation snapshot:** 4.2/5 from 37 reviews on 7 September 2026, as surfaced by Das Telefonbuch.
- **Location coordinates:** 52.5482847, 13.5039554 from the supplied Google Maps listing.

### Launch-blocking identity check

A separate florist listing, **Blumen P&N**, appears at the same Hauptstraße 9 / Kaufland Storchenhof address with different contact details. This may indicate a second concession, a successor operator, a co-located florist, or stale directory data. The prototype therefore avoids unsupported claims about business history, team, legal entity, current product catalogue, delivery, wedding work, funeral work, prices, or policies.

Before an official launch, confirm:

1. Current storefront/customer-facing name.
2. Relationship, if any, between Claudia Witzke and Blumen P&N.
3. Legal operator and required imprint details.
4. Current phone, email, and exact unit/address wording.
5. Current opening hours.
6. Current services and Fleurop relationship.

### Research sources

- Fleurop partner profile: <https://www.fleurop.de/partnerfloristen/fleurop-filialen/13055-berlin/witzke-claudia-hauptstr-9>
- Das Örtliche: <https://www.dasoertliche.de/Themen/Witzke-Claudia-Blumenfachgesch%C3%A4ft-Berlin-Alt-Hohensch%C3%B6nhausen-Hauptstr>
- Das Telefonbuch: <https://adresse.dastelefonbuch.de/Berlin/1-Blumen-Claudia-Witzke-Berlin-Hauptstr.html>
- Cylex: <https://web2.cylex.de/firma-home/witzke--claudia-14860459.html>
- Bundestelefonbuch: <https://www.bundes-telefonbuch.de/berlin/blumen/claudia-witzke-bvg10421506623>
- Shared Google Maps listing: coordinates and place identity supplied in the project brief.

## 2. Audience

### Local walk-in buyer
Needs fast confidence: real florist, exact location, opening hours, phone, directions, and a visual sense of floristry.

### Occasion-driven buyer
Needs emotional confidence and easy contact without being pushed through a fake catalogue.

### Existing/referral customer
Needs contact details and route immediately.

The design therefore prioritizes **confidence + immediacy** over browsing depth.

## 3. Conversion goals

Primary conversions:

1. `tel:` call to 030 98696347.
2. Google Maps directions to the supplied coordinates.

Secondary conversions:

- Email.
- Gallery engagement.
- Map reveal.
- Review-source click-through.

On mobile, **Call** and **Route** remain fixed in a bottom action bar.

## 4. Creative direction

**Warm Berlin Florist Editorial**

- Classic, tactile, elegant, quietly premium.
- Large editorial serif typography.
- Paper/cream background and deep botanical green.
- Asymmetric photography.
- Minimal ornament.
- Real flower photography remains the focal visual content.

Avoid generic pink-gradient florist templates, ecommerce cards, fake product prices, wedding-template clichés, and heavy animation.

## 5. Color system

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#20231F` | Primary text |
| `leaf-deep` | `#26372E` | Hero/CTA accents, dark section |
| `leaf-deeper` | `#19261F` | Closing CTA |
| `paper` | `#F5F0E7` | Main page background |
| `cream` | `#FCFAF5` | Cards/light UI |
| `petal` | `#A5535A` | Accent/emphasis |
| `stem` | `#78836C` | Botanical secondary accent |
| `brass` | `#B49562` | Rating detail |

The palette should later be tuned to verified current storefront/signage photography.

## 6. Typography

- **Display:** Cormorant Garamond.
- **Interface/body:** Manrope.
- Robust Georgia/system fallbacks are included.
- Script fonts are deliberately avoided.

## 7. Image strategy

The public prototype uses **real, licensed Unsplash photography**, never generated floral imagery. Because no owner-controlled Claudia Witzke shop photos could be verified for reuse, each non-business image is clearly marked as a reference image.

The hero reference photo was taken in **Berlin**, which supports the local visual direction without falsely presenting another shop as Claudia Witzke.

Before official commercial launch, replace reference images with:

- current exterior and signage;
- interior/counter;
- owner/team if approved;
- flower selection;
- hands/process;
- 8–12 recent real arrangements.

Full source/licensing record: [`IMAGE_RIGHTS.md`](./IMAGE_RIGHTS.md).

## 8. Information architecture

Single-page local-business site:

1. Hero.
2. Trust strip.
3. Local value proposition.
4. Verified offerings.
5. Craft/process framing.
6. Gallery.
7. Social proof.
8. Visit/contact/hours.
9. Strong final CTA.
10. Footer/legal/research notes.

Supporting static pages:

- Bildrechte.
- Datenschutz.
- Project/imprint note.

No thin service pages or invented SEO landing pages.

## 9. Section-by-section layout

### Hero
- Local eyebrow.
- Emotional but non-factual headline.
- Verified address/category wording.
- Call and Route CTAs.
- Hours/address facts.
- Large real photographic reference image.

### Trust band
- Current Google rating snapshot.
- Fleurop partner listing / voucher fact.
- Address/locality.

### Local value section
- Emphasizes direct in-store contact.
- Uses only evidence-backed advice claim.

### Verified offering cards
- Flowers & plants.
- In-store advice.
- Fleurop vouchers.

### Craft section
- Explains why the site does not pretend to offer a live catalogue.
- Encourages calling for current availability.

### Gallery
- Real licensed imagery.
- Every image labeled as reference photography.
- Accessible native-dialog lightbox.

### Social proof
- Aggregate Google rating snapshot.
- Short quote from Das Örtliche, clearly attributed.

### Visit/contact
- Exact address, phone, email, hours.
- Third-party map loads only after user interaction.
- Route CTA remains available without JS.

### Closing CTA
- Call and Route again, with no form friction.

## 10. Three.js / animation plan

Three.js is used **only as an optional progressive enhancement** behind the hero:

- Sparse pollen-like point field.
- Low-opacity and slow movement.
- Loaded after idle time.
- Skipped on mobile, Save-Data, reduced-motion, or unavailable WebGL.
- Real hero photography remains dominant.
- Failure has no effect on content or conversion.

Other motion uses IntersectionObserver + small CSS transitions. No animation is required for comprehension.

## 11. Responsive behavior

Mobile first:

- One-column hero.
- Persistent Call / Route action bar.
- Compact two-column gallery where practical.
- Direct hours/contact content; no accordion.
- Responsive type scales.

Tablet/desktop:

- Editorial split layouts.
- Wider gallery compositions.
- Sticky/fixed header.
- Controlled copy width.

## 12. Accessibility

Target: WCAG 2.2 AA behavior.

- Semantic landmarks and heading order.
- Skip link.
- Keyboard-visible focus states.
- Minimum practical tap targets.
- Meaningful alt text.
- Native `<dialog>` gallery with keyboard navigation and focus return.
- Reduced motion support.
- No color-only meaning.
- Map still has a normal external route link without JavaScript.

## 13. Performance

- Static HTML/CSS/JS; no application framework.
- No build-time package dependency.
- Responsive remote image variants and lazy loading.
- Hero is prioritized; below-fold photos lazy-load.
- Map is deferred until interaction.
- Three.js loads only after idle, desktop-only, and can fail silently.
- Static design remains complete if JavaScript or WebGL fails.

## 14. SEO / local discovery

- Localized title and meta description.
- Canonical URL for GitHub Pages.
- Open Graph metadata.
- `Florist` Schema.org JSON-LD with only verified contact/location/hours fields.
- `robots.txt` and `sitemap.xml` included.
- No invented `priceRange`, delivery area, products, reviews, payment methods, or social `sameAs` fields.

## 15. Rights / licensing notes

- No scraped Google Maps, Fleurop, Cylex, or directory photos are republished.
- Unsplash images are documented individually and labeled on-page as reference imagery.
- The Fleurop partner placeholder/shop image was not used because reuse rights could not be established.
- Review text is kept to one short attributed excerpt.

See [`IMAGE_RIGHTS.md`](./IMAGE_RIGHTS.md).

## 16. Implementation sequence

1. Research lock and risk notes.
2. Static information architecture.
3. Semantic HTML and CTA mechanics.
4. Editorial design system.
5. Licensed real photography.
6. Responsive layout.
7. Accessibility interactions.
8. Progressive map loading.
9. Optional Three.js ambient layer.
10. SEO metadata / JSON-LD.
11. GitHub Pages workflow.
12. Deployment verification.

## 17. Acceptance criteria

### Evidence
- No invented prices, products, delivery promises, services, policies, history, or team claims.
- Rating explicitly timestamped.
- Opening hours sourced and caveated for holidays.
- Operator identity conflict documented.

### Conversion
- Call and Route in first viewport.
- One-tap phone on mobile.
- Route links work without JavaScript.
- Hours are not hidden.

### Visual quality
- Real photography is the dominant visual content.
- Reference photography is clearly marked.
- Editorial local-florist character rather than generic ecommerce-template styling.

### Accessibility
- Keyboard navigation and focus states.
- Reduced-motion behavior.
- Semantic landmarks.
- Useful alt text.

### Performance
- Static core.
- Deferred map.
- Lazy images below fold.
- Optional Three.js only.

### Deployment
- `main` is the source repository branch.
- Official GitHub Pages workflow publishes the static artifact.
- Final URL expected at `https://prithiraj.github.io/claudia/`.
