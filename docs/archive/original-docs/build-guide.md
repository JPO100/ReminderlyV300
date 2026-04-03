# Build & Development Guide

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Configuration

### Build Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type-safe development
- **PostCSS**: CSS processing
- **Tailwind CSS v4**: Utility-first styling

### Browser Support
- Modern browsers (ES2020+)
- iOS Safari 14+
- Chrome/Edge 90+
- Firefox 88+

## File Structure

```
/src
├── /app
│   ├── App.tsx                    # Main application component
│   ├── reminder-utils.ts          # Non-component exports: loadReminders, categoriseReminder, sortReminders, isOverdue, formatRepeatLabel
│   ├── /components
│   │   ├── /figma
│   │   │   └── ImageWithFallback.tsx  # Image component with fallback
│   │   ├── DevToolsOverlay.tsx    # DevTools overlay (triple-tap logo)
│   │   ├── ReminderInfoOverlay.tsx # Reminder detail/edit/done modal
│   │   ├── RepeatsOverlay.tsx     # Repeat configuration overlay
│   │   ├── SettingsOverlay.tsx    # Settings overlay (grouped filters only)
│   │   └── /ui                    # Unused, protected (see DO_NOT_USE.md)
│   ├─ /dev                       # Self-check system
│   │   ├── check-system.ts        # Check runner framework
│   │   ├── nlc-parser-checks.ts   # 53 NLC parser checks
│   │   ├── nlc-interaction-checks.ts # 43 NLC interaction checks
│   │   ├── schedule-checks.ts     # 37 schedule equality/delta checks
│   │   ├── reminder-checks.ts     # 77 persistence, categorisation, sorting, repeat label, normalise, render, display title checks
│   │   ├── done-deleted-checks.ts # 9 done/deleted view checks
│   │   ├── completion-checks.ts   # 13 completion behaviour checks
│   │   └── BASELINE.md            # Expected self-check output (see BASELINE.md for an example clean run)
│   ├── /types
│   │   └── reminder.ts           # RepeatRule, Schedule, ScheduleSources type definitions
│   └── /utils
│       ├── nlc-parser.ts         # NLC token parser (pure, regex-based)
│       ├── nlc-interaction.ts    # NLC interaction logic (pure functions)
│       ├── normalise-text.ts     # Display text normalisation (pure function)
│       ├── render-text.ts        # Presentation-only today/tomorrow substitution
│       ├── schedule.ts           # Schedule equality, delta detection, date utilities
│       └── dummy-generator.ts    # Dummy reminder data generator
├── /imports
│   ├── NewReminderOverlay.tsx    # New reminder overlay component
│   ├── TimePicker.tsx            # Time picker component
│   ├── DevTools.tsx              # DevTools home page component
│   ├── DummyReminders.tsx        # Dummy reminders debug page
│   └── svg-*.ts                  # SVG path data
├── /styles
│   ├── fonts.css                 # Font imports
│   ├── index.css                 # Global styles entry
│   ├── tailwind.css              # Tailwind imports
│   └── theme.css                 # CSS custom properties
└── main.tsx                      # Application entry point

/docs
├── README.md                     # Main documentation
├── build-guide.md                # This file
├── calendar-module.md            # Calendar/date picker documentation
├── colour-styles.md              # Canonical colour definitions
├── component-hierarchy.md        # Visual component breakdown
├── content-overlay-responsive.md # Overlay responsive pattern
├── new-reminder-overlay.md       # New reminder overlay documentation
├── nlc.md                        # Natural Language Capture system
├── reminder-logic.md             # Category, status, overdue, and sorting system
├── done-delete-system.md         # Done/uncomplete transitions, animation, and visual states
├── editing-reminders.md          # Edit reminder flow: user flow, data flow, parsing rules, save/cancel
├── done-reminders.md             # Done reminders: completion, visual states, animation, data behaviour
├── responsive-design.md          # Breakpoints and responsive behaviour
├── sizing-spacing.md             # Spacing system documentation
```

## Key Dependencies

### Core Framework
```json
{
  "react": "^18.x",
  "react-dom": "^18.x"
}
```

### UI & Styling
```json
{
  "lucide-react": "^0.x",             // Icon library
  "tailwindcss": "^4.x"               // Utility-first CSS
}
```

### Development
```json
{
  "typescript": "^5.x",
  "vite": "^6.x",
  "@vitejs/plugin-react": "^4.x"
}
```

## Development Workflow

### Adding New Features
1. Create component in `/src/app/components`
2. Import into `App.tsx`
3. Update state management if needed
4. Test responsive behavior at multiple breakpoints

### Modifying Styles
- Use Tailwind classes for most styling
- Custom colors defined inline: `bg-[#4784f8]`
- Font family: `font-['Lato',sans-serif]`
- Avoid creating new CSS files unless absolutely necessary

### Working with SVGs
- Logo SVG paths in `/src/imports/svg-tzdfx9foxi.ts`
- Import and use in JSX:
  ```tsx
  import svgPaths from "../imports/svg-tzdfx9foxi";
  <path d={svgPaths.p3babd700} fill="white" />
  ```

## Code Style Guidelines

### TypeScript
- Use explicit types for component props
- Define interfaces for data structures
- Prefer `const` over `let`
- Use functional components with hooks

### React
- Use functional components
- Prefer hooks over class components
- Keep components focused and small
- Extract reusable logic into custom hooks

### Tailwind
- Use utility classes inline
- Use arbitrary values for custom colors: `bg-[#4784f8]`
- Group related classes logically
- Use responsive prefixes: `min-[390px]:flex`

## Testing Checklist

### Responsive Design
- [ ] Test at 320px (iPhone SE)
- [ ] Test at 402px (iPhone 16 Pro target)
- [ ] Test at 768px (iPad)
- [ ] Test at 1024px+ (Desktop)
- [ ] Verify "Sometime" button hides < 390px
- [ ] Check scrolling behavior
- [ ] Verify touch targets are adequate

### UI/UX
- [ ] Filter buttons have active states
- [ ] Transitions are smooth
- [ ] Layout is properly centered
- [ ] Text truncation works correctly
- [ ] Reminder components display properly

### Browser Testing
- [ ] Chrome/Edge
- [ ] Safari (iOS and macOS)
- [ ] Firefox
- [ ] Mobile browsers

## Performance Optimization

### Current Optimizations
- SVG logo (scales perfectly, small file size)
- No external image requests
- Minimal JavaScript bundle
- CSS-only transitions
- Native scrolling (no JavaScript scroll handlers)

## Deployment

### Build Output
```bash
pnpm build
# Creates /dist folder with optimized assets
```

### Deployment Targets
- **Vercel**: Zero-config deployment
- **Netlify**: Drop folder deployment
- **Static hosting**: Upload /dist folder
- **GitHub Pages**: Configure base path in vite.config.ts

### Build Configuration
```typescript
// vite.config.ts
export default defineConfig({
  base: '/', // Change for subdirectory deployment
  build: {
    outDir: 'dist',
    sourcemap: false, // Enable for debugging,
  }
})
```

## Troubleshooting

### Styles Not Applying
- Verify Tailwind classes are correct
- Check for typos in arbitrary values
- Ensure PostCSS is configured
- Clear build cache: `rm -rf node_modules/.vite`

### TypeScript Errors
- Ensure all dependencies are installed
- Check TypeScript version compatibility
- Run type check: `pnpm tsc --noEmit`