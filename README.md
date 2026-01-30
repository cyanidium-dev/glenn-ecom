# Glenn Ecom

E-commerce platform built with Next.js.

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Font**: Geist

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Lighthouse (performance testing)

```bash
# Full audit (performance + accessibility + best practices + SEO)
npm run lighthouse -- http://localhost:3000

# Performance only
npm run lighthouse:perf -- http://localhost:3000

# Save to file
npx lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html
```

### Understanding scores when testing on dev + weak laptop

Your report was run against **http://localhost:3000** with device simulation
**moto g power (2022)** and **benchmarkIndex: 1320** (mid-tier mobile CPU).
These often make scores look worse than production.

| What                                     | Likely cause            | Notes                                                                                                                                                                       |
| ---------------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Performance score**                    | Dev server + device sim | Dev has no minification, no CDN, extra React/Next overhead. Mobile simulation (benchmarkIndex) slows CPU 3–4×. Expect **10–30+ point** gain in production on a real device. |
| **LCP / FCP / Speed Index**              | Dev + weak device       | Same as above. Production build + real network/CPU will be faster.                                                                                                          |
| **TBT (Total Blocking Time)**            | Dev + device sim        | More JS in dev, slower CPU → main thread stays busy longer. Improves a lot in production.                                                                                   |
| **CLS (Cumulative Layout Shift)**        | Usually real            | Layout shifts are mostly about your markup/CSS, not dev vs prod. Worth fixing.                                                                                              |
| **“Uses HTTPS” failed**                  | Dev server              | localhost is HTTP. Ignore for local runs; production should use HTTPS.                                                                                                      |
| **Accessibility / Best practices / SEO** | Mostly real             | These depend on markup, labels, meta tags, etc. Not meaningfully affected by dev vs prod or device speed.                                                                   |

**For more realistic numbers:** run Lighthouse against a **production** build
(`npm run build && npm run start`) or a deployed URL, and/or run in Chrome
without mobile emulation (desktop mode). Use the parser script to re-check
scores: `node parse-lighthouse.js`.

### If “main file that gets hung on” is `439191418a48e951.js`

That chunk is the **home page client bundle** (Journal, Testimonials, Music,
etc.). To reduce main-thread work:

1. **Rebuild** so it includes the latest fixes: `npm run build` (or clear
   `.next` and restart `npm run dev`). The forced-reflow fix in `AutoFillText`
   only appears in the bundle after a fresh build.
2. **Journal** and **Music** are lazy-loaded below so their client code loads in
   separate chunks after first paint, which keeps the initial chunk smaller and
   defers heavy work.

### Network dependency tree / red CSS (`9131b230e92d6aec.css`)

Lighthouse may mark the **main stylesheet** chunk (e.g. `9131b230e92d6aec.css`) in red on the dependency tree. That file is your **critical CSS** (globals + Tailwind) and is on the critical path: the browser discovers it from the HTML `<head>` and must load it before first paint, so it contributes to "Maximum critical path latency" (~646 ms in the report).

- **Why it’s red:** The stylesheet is render-blocking and is requested after the document (and after many font/image preloads in the head), so it’s the bottleneck of the chain.
- **What you can do:**  
  - **Production:** Use a CDN and a fast network; latency will drop.  
  - **Preload (optional):** Next.js doesn’t expose the CSS chunk URL in app code (the hash changes every build). To preload it you’d need a post-build step that injects `<link rel="preload" href="/_next/static/chunks/<current-css-chunk>.css" as="style">` early in the head (e.g. by reading the build manifest and patching the HTML).  
  - **Preconnect:** The report says no extra origins are good preconnect candidates (everything is same-origin on localhost), so preconnect doesn’t help here.
