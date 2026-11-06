# CODEX MASTER PROMPT
## PIANO / PRELUDE — Premium Pianist Portfolio

You are a world-class creative frontend engineer, senior Next.js architect, award-winning digital art director, and UI/UX interaction specialist.

Your mission is to BUILD, not merely describe, a complete, production-quality portfolio website for a Vietnamese university student majoring in Piano.

The final product must feel like the official portfolio of an emerging classical pianist, combining cinematic visual storytelling, luxury editorial design, creative interactions, and academic project documentation.

**Project name:** PIANO / PRELUDE

**Creative tagline:** The Art of Becoming

**Primary objective:** Build a visually extraordinary, fully functional, local-first Next.js application with nine academic portfolio pages.

If Google Stitch designs, screenshots, or exported components are provided, treat them as the primary visual reference. Reproduce their layout, visual hierarchy, typography, imagery, spacing, and interactions as closely as possible.

Do not replace a distinctive Stitch design with a generic Tailwind or shadcn/ui template.

---

# 1. NON-NEGOTIABLE REQUIREMENTS

- Build a real, runnable Next.js application.
- Implement all nine required pages.
- Run entirely on localhost.
- No Supabase.
- No Firebase.
- No PostgreSQL or MongoDB.
- No Prisma.
- No authentication.
- No cloud storage dependency.
- No backend required for core functionality.
- No external API keys required.
- No unnecessary environment variables.
- All student and project content must be editable locally.
- All navigation must work.
- All carousels and interactive controls must work.
- All pages must be responsive.
- All Vietnamese text must render correctly.
- Do not fabricate personal details or academic evidence.

The application must work using:

npm install
npm run dev

Local URL: http://localhost:3000

---

# 2. TECHNOLOGY STACK

Use:

- Next.js App Router
- TypeScript strict mode
- Tailwind CSS
- shadcn/ui selectively
- Lucide React
- Motion for React
- Embla Carousel
- next/font/google
- Next.js Image
- CSS variables for design tokens

Use current compatible stable versions.

Prefer React Server Components for static content.

Use Client Components only for interactions such as carousels, menus, galleries, and copy buttons.

Avoid unnecessary dependencies.

Do not introduce a database or authentication layer.

---

# 3. DESIGN CONCEPT

Creative direction:

**PIANO / PRELUDE — A Digital Concert Experience**

Imagine a luxury pianist's personal website combined with a contemporary art magazine and a beautifully designed concert program.

The website should communicate:
- Musical elegance
- Artistic identity
- Creative confidence
- Academic professionalism
- Personal storytelling
- Digital innovation

The interface must be cinematic, editorial, sophisticated, expressive, and memorable.

Absolutely avoid:
- Generic SaaS landing pages
- Standard left-text/right-image hero layouts
- Six identical rounded project cards
- Repetitive three-column grids
- Dashboard aesthetics
- Excessive gradients
- Glassmorphism
- Floating decorative blobs
- Emoji decorations
- Generic AI-generated UI patterns
- Oversized pill buttons everywhere
- Unnecessary shadows

Do not merely recolor a generic website.

Create a completely original composition system.

---

# 4. COLOR SYSTEM

Implement a consistent design token system.

Primary colors:

Warm Ivory: #F9F8F3

Fresh Lime: #B8E45B

Piano Black: #171916

Soft Stone: #EAECE4

Pure White: #FFFFFF

Muted Gray: #777B73

Color usage:

55% warm ivory and white

30% piano black

10% neutral surfaces

5% lime green accents

Use lime green as a distinctive visual signature.

Use piano black for dramatic sections and cinematic contrast.

Avoid making every section green.

Ensure accessible text contrast.

---

# 5. TYPOGRAPHY

Primary font: Be Vietnam Pro.

Use Be Vietnam Pro consistently for:
- Navigation
- Body text
- Buttons
- Project descriptions
- Assignment content
- Academic tables
- Captions
- Vietnamese headings

Optional display font: Cormorant Garamond.

Use the display serif sparingly for artistic English titles and selected editorial details.

Do not use serif typography for Vietnamese text unless full Vietnamese glyph support is verified.

Typography scale:

Desktop hero: 80–128px

Tablet hero: 56–76px

Mobile hero: 38–52px

Section headings: 44–80px

Body: 16–18px

Captions: 12–14px

Use:
- Fluid typography with clamp()
- Strong visual hierarchy
- Carefully controlled letter spacing
- Generous line height
- Editorial line breaks
- Responsive heading widths

No clipped text or horizontal overflow.

---

# 6. GLOBAL LAYOUT AND NAVIGATION

Create a reusable application shell.

Header:
- Artistic PIANO / PRELUDE wordmark
- Giới thiệu
- Dự án
- Dropdown with six assignments
- Tổng kết
- Mobile menu

On the homepage, the header should overlay the cinematic carousel.

When scrolling, transition to an elegant ivory background.

Use a sticky header with subtle borders and restrained motion.

Mobile navigation:
- Full-screen or elegant overlay
- Large typography
- Accessible close button
- Working nested project links
- Keyboard support

Footer:
- Piano-black background
- Student name
- Student ID
- Class
- Course name
- University
- Quick navigation
- Artistic closing statement

Include an accessible back-to-top interaction.

---

# 7. HOMEPAGE — CINEMATIC HERO CAROUSEL

This is the most important visual feature.

Implement a fully functional, premium cinematic hero carousel using Embla Carousel.

Do not use a generic card slider.

The hero must feel like the opening scene of a classical piano concert.

Desktop height: approximately 90–100svh.

Mobile height: adapt naturally using safe viewport units.

Use edge-to-edge cinematic imagery with carefully controlled dark overlays.

Implement three slides.

## Slide 01 — THE PRELUDE

Image:
A grand piano on a dramatic concert stage with atmospheric lighting.

Headline:
"Âm nhạc là ngôn ngữ
của tâm hồn."

Subtitle:
"Hành trình khám phá nghệ thuật Piano và thế giới công nghệ số."

CTA:
"Khám phá hành trình"

## Slide 02 — THE PASSION

Image:
Close-up of a pianist's hands performing on piano keys.

Headline:
"Mỗi phím đàn.
Một câu chuyện."

Subtitle:
"Nơi đam mê, sự kiên trì và sáng tạo gặp nhau."

CTA:
"Tìm hiểu về tôi"

## Slide 03 — THE JOURNEY

Image:
An elegant piano studio or artistic portrait of a young pianist.

Headline:
"Từ những nốt nhạc
đến những ý tưởng."

Subtitle:
"Khám phá sáu dự án học tập trong hành trình phát triển kỹ năng số."

CTA:
"Xem các dự án"

## Carousel Features

Implement:
- Smooth slide transitions
- Previous and next arrows
- Slide counter: 01 / 03
- Animated progress indicator
- Touch/swipe gestures
- Keyboard navigation
- Accessible slide announcements
- Optional autoplay
- Pause on hover
- Pause on focus
- Pause when document is hidden
- Respect prefers-reduced-motion
- Smooth typography entrance animation
- Subtle image scale effect
- Responsive controls

Use tasteful animation timing.

Avoid heavy parallax, layout shifts, and distracting motion.

If autoplay is enabled, provide a visible pause/play control.

Do not autoplay audio.

---

# 8. HOMEPAGE — EDITORIAL SECTIONS

After the hero, create a sophisticated long-form homepage.

## Section 1 — About the Pianist

Use an asymmetrical editorial composition.

Headline:
"Xin chào,
tôi là [Tên sinh viên]."

Display:
- Portrait
- Name
- Major: Piano
- University
- Personal introduction
- Interests and hobbies

Use refined image crops and typography.

Avoid generic profile cards.

## Section 2 — Artistic Philosophy

Create a dramatic piano-black section.

Headline:
"Giữa nghệ thuật
và công nghệ."

Explain the relationship between musical creativity and digital skills.

Use oversized ivory typography and minimal lime accents.

## Section 3 — Learning Objectives

Create an editorial vertical list or timeline.

Topics:
- Piano and artistic development
- Digital literacy
- Creative thinking
- Responsible AI usage
- Personal development goals

## Section 4 — Selected Projects

Build a horizontal project showcase carousel.

Use large imagery, project numbers, chapter labels, and refined transitions.

Avoid standard card grids.

## Section 5 — Portfolio Purpose

Explain the purpose of documenting academic work and digital skills.

Finish with an artistic CTA linking to Projects.

---

# 9. PROJECTS PAGE — SIX MOVEMENTS

Route: /projects

Creative concept:
"Six Movements of Learning"

Vietnamese heading:
"Sáu chương.
Một hành trình."

Present the six academic assignments as movements in a musical composition.

Each project contains:
- Large number 01–06
- Chapter name
- Official assignment title
- Short description
- Skills developed
- Visual image
- Detail link

Use a combination of:
- Alternating editorial layouts
- Full-width featured project sections
- Horizontal project carousel
- Large typography
- Thin separators
- Asymmetrical image placements

Do not render six identical cards.

Required assignments:

01. Chương 1 — Thao tác cơ bản với tệp tin và thư mục

02. Chương 2 — Tìm kiếm và đánh giá thông tin học thuật

03. Chương 3 — Viết Prompt hiệu quả cho các tác vụ học tập

04. Chương 4 — Sử dụng công cụ hợp tác trực tuyến cho dự án nhóm

05. Chương 5 — Sử dụng AI tạo sinh để hỗ trợ sáng tạo nội dung

06. Chương 6 — Sử dụng AI có trách nhiệm trong học tập và nghiên cứu

---

# 10. SIX ASSIGNMENT DETAIL PAGES

Required routes:

/projects/bai-1
/projects/bai-2
/projects/bai-3
/projects/bai-4
/projects/bai-5
/projects/bai-6

Create a reusable, data-driven assignment template.

Each assignment page must include:

A. Chapter title and assignment heading

B. Learning objectives
- Assignment requirements
- Skills practiced

C. Implementation process
- Steps completed
- Tools used
- AI tools and purposes, if applicable
- Difficulties encountered
- Solutions applied

D. Final deliverables
- Images
- Screenshots
- PDF documents
- Videos
- External links

E. Navigation
- Back to Projects
- Previous assignment
- Next assignment

Use premium editorial layouts while preserving readability.

## Assignment 1

Create:
- Folder structure tree
- File naming rules
- File organization explanation
- Screenshot evidence gallery

## Assignment 2

Create:
- Academic search operators
- Search query examples
- Research result entries
- Source evaluation table
- Research references
- Evidence gallery

## Assignment 3

Create:
- Original prompt
- Improved prompt
- Side-by-side comparison
- AI output comparison
- Explanation of improvements
- Copy-to-clipboard functionality

Do not require a live AI API.

## Assignment 4

Create:
- Collaboration workflow
- Task management timeline
- Tool descriptions
- Team coordination evidence
- Screenshots and links

## Assignment 5

Create:
- AI-assisted creative content gallery
- Image preview
- Video preview
- Prompt documentation
- AI tool disclosure
- Final creative products

## Assignment 6

Create:
- Responsible AI principles
- Academic integrity checklist
- Ethical use guidelines
- Research citations
- Personal commitments

Use real evidence only when supplied.

Otherwise provide clearly labeled placeholders.

Never invent completed work, research findings, or personal experiences.

---

# 11. CONCLUSION PAGE — THE FINALE

Route: /conclusion

Design the conclusion as the final movement of a musical performance.

Heading:
"Khép lại một chương.
Mở ra hành trình mới."

Include:
- Personal learning experience
- Important knowledge gained
- Digital skills developed
- Most meaningful achievement
- Challenges and solutions
- Personal reflection
- Responsible AI disclosure
- Links to all six assignments

Create an emotional yet sophisticated closing composition.

Use large typography, cinematic imagery, and an elegant piano-black footer.

Personal reflections must remain editable placeholders until written by the student.

---

# 12. CONTENT ARCHITECTURE

Store all data locally.

Create:

src/config/student.ts

Fields:
- name
- studentId
- className
- major
- university
- faculty
- courseName
- courseCode
- avatar
- biography
- hobbies
- learningGoals
- careerDirection
- portfolioPurpose

Create:

src/data/assignments.ts

Each assignment must have:
- id
- slug
- chapter
- title
- description
- objectives
- skills
- implementationSteps
- toolsUsed
- aiUsage
- challenges
- solutions
- deliverables
- references
- images
- status

Use strict TypeScript interfaces.

Create data-driven pages rather than duplicating JSX.

Missing student information must remain explicitly marked as placeholders.

---

# 13. LOCAL ASSET MANAGEMENT

Use local public assets.

Directory structure:

public/
  images/
    hero/
    portraits/
    projects/
  evidence/
    bai-1/
    bai-2/
    bai-3/
    bai-4/
    bai-5/
    bai-6/
  documents/
  videos/

Provide meaningful image placeholders if real assets are unavailable.

Never use broken image URLs.

Do not use random external images that may fail to load.

Do not falsely represent stock photography as the student's actual performance or academic evidence.

Optimize local images using next/image.

---

# 14. COMPONENT ARCHITECTURE

Suggested components:

layout/
- Header
- Footer
- MobileMenu
- NavigationDropdown

home/
- CinematicHeroCarousel
- HeroSlide
- AboutEditorial
- ArtisticPhilosophy
- LearningJourney
- FeaturedProjectsCarousel

projects/
- ProjectShowcase
- ProjectCarousel
- ProjectEditorialRow
- ProjectNavigation

assignments/
- AssignmentHero
- AssignmentLayout
- ObjectivesSection
- ProcessTimeline
- ToolsSection
- EvidenceGallery
- FolderTree
- SourceEvaluationTable
- PromptComparison
- CollaborationTimeline
- CreativeMediaGallery
- ResponsibleAIChecklist

shared/
- SectionHeading
- AnimatedReveal
- MediaViewer
- ResourceLink
- ScrollProgress
- BackToTop

Avoid unnecessary abstraction.

Ensure components are reusable and maintainable.

---

# 15. MOTION AND INTERACTION

Use Motion for React and Embla Carousel.

Implement:
- Cinematic hero transitions
- Elegant scroll reveals
- Image hover zoom
- Smooth dropdown transitions
- Horizontal project carousel
- Progress indicators
- Editorial typography reveals
- Subtle hover states
- Responsive mobile interactions

Use GPU-friendly transforms and opacity.

Avoid excessive scroll listeners and expensive animations.

Respect prefers-reduced-motion.

Use semantic buttons and accessible labels.

---

# 16. RESPONSIVE EXPERIENCE

Design intentionally for:

Desktop: 1440px and above

Laptop: 1024–1439px

Tablet: 768–1023px

Mobile: 320–767px

Requirements:
- No horizontal overflow
- No clipped headings
- Readable body text
- Touch-friendly controls
- Proper image cropping
- Responsive carousels
- Accessible mobile navigation
- Tables with mobile overflow handling
- Optimized image sizes

The mobile design must feel premium, not like a compressed desktop layout.

---

# 17. SEO AND PERFORMANCE

Implement:
- Metadata API
- Unique page titles
- Meta descriptions
- Open Graph metadata
- Semantic HTML
- Optimized images
- Font optimization
- Lazy loading below the fold
- Server Components where appropriate
- Accessible heading hierarchy
- Sitemap
- robots.txt

Avoid unnecessary client-side JavaScript.

Ensure fast initial rendering.

---

# 18. ACADEMIC REQUIREMENTS

The portfolio is for:

Trường Đại học Sư phạm Nghệ thuật Trung ương

Course:
Nhập môn Công nghệ số và ứng dụng trí tuệ nhân tạo

Course code:
INF2501

The website must satisfy:
- At least nine pages
- About Me
- Projects overview
- Six individual assignment pages
- Conclusion
- Working navigation
- Objectives, process and final product for each assignment
- Evidence and attachment support
- AI disclosure
- Proper source attribution
- Student name, ID, class and course in footer
- Responsive design
- Public-deployment readiness

The Word report is a separate required submission and is not replaced by this website.

---

# 19. DEVELOPMENT WORKFLOW

Implement the project in phases.

Phase 1:
Initialize Next.js, TypeScript, Tailwind CSS and dependencies.

Phase 2:
Implement design tokens, typography and global layout.

Phase 3:
Build the cinematic homepage hero carousel.

Phase 4:
Build editorial homepage sections.

Phase 5:
Build the Projects page and horizontal carousel.

Phase 6:
Implement all six assignment pages.

Phase 7:
Build the Conclusion page.

Phase 8:
Add responsive interactions and animations.

Phase 9:
Integrate local content and media placeholders.

Phase 10:
Run quality checks and fix errors.

Do not stop after Phase 3.

Do not ask for confirmation between ordinary implementation phases.

Complete the full project.

---

# 20. QUALITY ASSURANCE

Before finishing:

- Run TypeScript checks.
- Run linting.
- Run production build.
- Verify all nine routes.
- Verify header and mobile navigation.
- Verify hero carousel.
- Verify project carousel.
- Verify previous/next assignment links.
- Verify image handling.
- Verify PDF and video components.
- Check mobile responsiveness.
- Check accessibility.
- Check Vietnamese typography.
- Check missing data placeholders.
- Check console and runtime errors.

Fix all issues that can be resolved within the project.

Provide a concise summary of implemented features and any remaining items requiring real student data.

---

# 21. FINAL CREATIVE QUALITY STANDARD

The finished website must feel like a bespoke digital experience for a talented young pianist.

The design should be comparable in ambition to a premium music festival website, contemporary art publication, or professional artist portfolio.

It must NOT look like a generic student website created from a template.

Focus on:
- Cinematic imagery
- Exceptional typography
- Distinctive compositions
- High-quality carousel interactions
- Musical identity
- Elegant color balance
- Excellent usability
- Academic completeness
- Clean maintainable code

Do not sacrifice functionality for visual effects.

Do not sacrifice visual quality for implementation convenience.

**Build a digital concert experience, not another generic portfolio.**

Start implementing the project immediately.

## UI/UX ENHANCEMENT — THREE.JS & PREMIUM ANIMATIONS

Upgrade the existing Next.js website into a premium, cinematic, interactive 3D portfolio for a professional Piano student.

**Technology:** Three.js, React Three Fiber (@react-three/fiber), Drei (@react-three/drei), GSAP ScrollTrigger, and Motion for React.

**Requirements:**

1. **3D Piano Experience:** Create an elegant, realistic 3D grand piano with beautiful lighting, realistic materials, soft shadows, and subtle camera movements. Use optimized GLB models when available; provide a graceful fallback otherwise.

2. **Interactive Hero:** Integrate the 3D piano into the cinematic hero carousel with smooth camera transitions, depth effects, subtle mouse parallax, and refined typography animations.

3. **Advanced Scroll Animations:** Use GSAP ScrollTrigger for cinematic section transitions, scroll-driven storytelling, image reveals, and smooth 3D camera movements.

4. **Interactive Piano Keys:** Add a beautifully designed interactive piano keyboard with realistic key-press animations and optional user-initiated sound.

5. **Premium Micro-interactions:** Implement magnetic buttons, elegant hover effects, animated typography, smooth project carousel transitions, and subtle cursor interactions on desktop.

6. **Visual Quality:** Prioritize photorealistic piano materials, cinematic lighting, refined compositions, ivory-white backgrounds, piano-black sections, and sophisticated lime-green accents.

7. **Performance:** Lazy-load 3D scenes, optimize models and textures, limit device pixel ratio, use adaptive rendering quality, and provide static fallbacks for low-performance devices. Respect prefers-reduced-motion.

8. **Architecture:** Keep Three.js components isolated as client components. Preserve Next.js SSR for normal content, all nine academic pages, accessibility, SEO, and responsive layouts.

**Important:** Do not add random 3D objects or excessive animations. Every effect must reinforce the Piano identity and improve the user experience. Avoid heavy loading, distracting movement, and generic AI-generated visual effects.

**Final goal:** Transform the website into an award-level, immersive digital Piano portfolio with sophisticated 3D storytelling, smooth animations, exceptional typography, and a truly distinctive visual identity.

Implement these enhancements directly in the existing project without deleting existing content or functionality.# phong-piano
