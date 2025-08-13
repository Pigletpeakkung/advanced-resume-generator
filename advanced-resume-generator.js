class AdvancedResumeGenerator {
  constructor(data, options = {}) {
    this.data = data;
    this.options = {
      analytics: true,
      interactivity: true,
      responsive: true,
      printOptimized: true,
      seoOptimized: true,
      ...options
    };
    this.themes = this.initializeThemes();
    this.layouts = this.initializeLayouts();
    this.animations = this.initializeAnimations();
  }

  // Initialize color themes
  initializeThemes() {
    return {
      tech: {
        primary: '#2563eb',
        secondary: '#0ea5e9', 
        accent: '#10b981',
        bg: '#f8fafc',
        card: '#ffffff',
        text: '#1f2937',
        muted: '#64748b',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      creative: {
        primary: '#7c3aed',
        secondary: '#ec4899',
        accent: '#f59e0b', 
        bg: '#fefbff',
        card: '#ffffff',
        text: '#1f2937',
        muted: '#6b7280',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      corporate: {
        primary: '#374151',
        secondary: '#6b7280',
        accent: '#059669',
        bg: '#f9fafb', 
        card: '#ffffff',
        text: '#111827',
        muted: '#6b7280',
        gradient: 'linear-gradient(135deg, #434343 0%, #000000 100%)'
      },
      minimal: {
        primary: '#000000',
        secondary: '#404040',
        accent: '#0066cc',
        bg: '#ffffff',
        card: '#ffffff', 
        text: '#000000',
        muted: '#666666',
        gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      },
      dark: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: '#10b981',
        bg: '#0f172a',
        card: '#1e293b',
        text: '#f8fafc',
        muted: '#94a3b8',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }
    };
  }

  // Initialize layout options
  initializeLayouts() {
    return {
      modern: { sidebar: 'right', header: 'full', sections: 'cards' },
      classic: { sidebar: 'left', header: 'compact', sections: 'traditional' },
      creative: { sidebar: 'none', header: 'hero', sections: 'masonry' },
      executive: { sidebar: 'right', header: 'professional', sections: 'timeline' },
      compact: { sidebar: 'integrated', header: 'minimal', sections: 'condensed' }
    };
  }

  // Initialize animations
  initializeAnimations() {
    return {
      subtle: {
        transitions: '0.2s ease',
        hover: 'transform: translateY(-1px)',
        entrance: 'fadeIn 0.6s ease-out'
      },
      dynamic: {
        transitions: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        hover: 'transform: translateY(-2px) scale(1.02)',
        entrance: 'slideInUp 0.8s ease-out'
      },
      none: {
        transitions: 'none',
        hover: 'none', 
        entrance: 'none'
      }
    };
  }

  // Generate resume with all advanced features
  generateAdvancedResume(type, customConfig = {}) {
    const config = this.buildConfig(type, customConfig);
    const html = this.buildHTML(config);
    
    if (this.options.analytics) {
      this.trackGeneration(type, config);
    }
    
    return {
      html,
      config,
      metadata: this.generateMetadata(config),
      analytics: this.generateAnalytics(config)
    };
  }

  // Build comprehensive configuration
  buildConfig(type, customConfig) {
    const preset = this.data.presets[type] || this.data.presets.tech_startup;
    const theme = this.themes[customConfig.theme || preset.color_scheme || 'tech'];
    const layout = this.layouts[customConfig.layout || 'modern'];
    const animations = this.animations[customConfig.animations || 'subtle'];

    return {
      type,
      title: this.data.personal.titles[type] || this.data.personal.titles.general,
      summary: this.data.personal.summary[type] || this.data.personal.summary.general,
      theme,
      layout,
      animations,
      preset,
      sections: this.buildSections(type, preset),
      skills: this.selectSkills(type),
      projects: this.selectProjects(type),
      metrics: this.selectMetrics(type, preset.emphasize || []),
      interactivity: customConfig.interactivity !== false,
      seo: this.options.seoOptimized,
      analytics: this.options.analytics,
      ...customConfig
    };
  }

  // Build complete HTML with all features
  buildHTML(config) {
    return `<!DOCTYPE html>
<html lang="${this.data.i18n.default_language}" ${config.seo ? this.generateSEOAttributes() : ''}>
<head>
${this.generateHead(config)}
</head>
<body class="theme-${config.theme.name || 'tech'}" data-layout="${config.layout.name || 'modern'}">
${this.generateStructuredData(config)}
${this.generateBody(config)}
${this.generateScripts(config)}
</body>
</html>`;
  }

  // Generate comprehensive CSS with all features
  generateCSS(config) {
    const { theme, animations, layout } = config;
    
    return `
/* Reset and base styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* CSS Custom Properties for theming */
:root {
  --primary: ${theme.primary};
  --secondary: ${theme.secondary};
  --accent: ${theme.accent};
  --bg: ${theme.bg};
  --card: ${theme.card};
  --text: ${theme.text};
  --muted: ${theme.muted};
  --gradient: ${theme.gradient};
  --transition: ${animations.transitions};
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --border-radius: 12px;
  --spacing: 1rem;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f172a;
    --card: #1e293b;
    --text: #f8fafc;
    --muted: #94a3b8;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --primary: #000000;
    --bg: #ffffff;
    --text: #000000;
    --muted: #333333;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Base typography */
html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: var(--text);
  background: var(--bg);
  font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1, 'pnum' 1, 'tnum' 0, 'onum' 1, 'lnum' 0, 'dlig' 0;
}

/* Container and layout */
.resume-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}

.resume-card {
  background: var(--card);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  position: relative;
  transition: var(--transition);
}

/* Header styles */
.resume-header {
  padding: 2rem;
  background: var(--gradient);
  color: white;
  position: relative;
  overflow: hidden;
}

.resume-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  z-index: 1;
}

.header-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.name-section h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, rgba(255,255,255,0.9), rgba(255,255,255,1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-section {
  font-size: 1.25rem;
  font-weight: 500;
  opacity: 0.95;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  opacity: 0.9;
}

.contact-item a {
  color: inherit;
  text-decoration: none;
  transition: var(--transition);
}

.contact-item a:hover {
  opacity: 1;
  text-decoration: underline;
}

/* Main layout grid */
.resume-grid {
  display: grid;
  grid-template-columns: ${layout.sidebar === 'right' ? '1fr 300px' : layout.sidebar === 'left' ? '300px 1fr' : '1fr'};
  gap: 0;
  min-height: calc(100vh - 200px);
}

.main-content {
  padding: 2rem;
}

.sidebar {
  padding: 2rem;
  background: linear-gradient(180deg, rgba(var(--primary-rgb), 0.02), rgba(var(--primary-rgb), 0.05));
  border-left: ${layout.sidebar === 'right' ? '2px solid rgba(var(--primary-rgb), 0.1)' : 'none'};
  border-right: ${layout.sidebar === 'left' ? '2px solid rgba(var(--primary-rgb), 0.1)' : 'none'};
}

/* Section styles */
.section {
  margin-bottom: 2.5rem;
  opacity: 0;
  animation: ${animations.entrance};
  animation-fill-mode: forwards;
}

.section:nth-child(1) { animation-delay: 0.1s; }
.section:nth-child(2) { animation-delay: 0.2s; }
.section:nth-child(3) { animation-delay: 0.3s; }
.section:nth-child(4) { animation-delay: 0.4s; }

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 1rem;
  position: relative;
  padding-left: 1rem;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--accent);
  border-radius: 2px;
}

/* Experience cards */
.experience-item {
  background: var(--card);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow);
  border-left: 4px solid var(--primary);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.experience-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(var(--primary-rgb), 0.05), transparent);
  transition: width 0.3s ease;
}

.experience-item:hover::before {
  width: 100%;
}

.experience-item:hover {
  ${animations.hover};
  box-shadow: var(--shadow-lg);
}

.job-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.25rem;
}

.job-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--muted);
  flex-wrap: wrap;
}

.company-name {
  color: var(--primary);
  font-weight: 500;
}

.job-period {
  background: rgba(var(--primary-rgb), 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--primary);
}

.job-description ul {
  list-style: none;
  padding: 0;
}

.job-description li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.job-description li::before {
  content: '▶';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-size: 0.8rem;
}

/* Skills visualization */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
}

.skill-tag {
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--accent-rgb), 0.1));
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--primary);
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.skill-tag::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: var(--accent);
  width: var(--proficiency, 75%);
  transition: width 0.5s ease;
}

.skill-tag:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

/* Advanced skill charts */
.skill-chart {
  position: relative;
  margin-bottom: 1rem;
}

.skill-name {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.skill-bar {
  height: 8px;
  background: rgba(var(--primary-rgb), 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  border-radius: 4px;
  width: var(--proficiency, 0%);
  transition: width 1s ease-out;
}

/* Radar chart for skills */
.radar-chart {
  width: 200px;
  height: 200px;
  margin: 1rem auto;
}

/* Metrics cards */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.metric-card {
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.05), rgba(var(--accent-rgb), 0.05));
  padding: 1.5rem;
  border-radius: var(--border-radius);
  text-align: center;
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  transition: var(--transition);
}

.metric-card:hover {
  ${animations.hover};
  border-color: var(--primary);
}

.metric-value {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.metric-label {
  font-size: 0.9rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Projects showcase */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: var(--card);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  position: relative;
}

.project-card:hover {
  ${animations.hover};
  box-shadow: var(--shadow-lg);
}

.project-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.project-description {
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.5;
}

.project-body {
  padding: 1.5rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.tech-tag {
  background: rgba(var(--accent-rgb), 0.1);
  color: var(--accent);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--primary);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: var(--transition);
}

.project-link:hover {
  background: var(--secondary);
  transform: translateY(-1px);
}

/* Timeline visualization */
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--primary), var(--accent));
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 2rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -0.5rem;
  top: 0.5rem;
  width: 1rem;
  height: 1rem;
  background: var(--primary);
  border-radius: 50%;
  border: 2px solid var(--card);
  box-shadow: 0 0 0 2px var(--primary);
}

/* Testimonials */
.testimonials-slider {
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius);
}

.testimonial {
  background: linear-gradient(135deg, rgba(var(--secondary-rgb), 0.05), rgba(var(--accent-rgb), 0.05));
  padding: 2rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  border-left: 4px solid var(--secondary);
  font-style: italic;
  position: relative;
}

.testimonial::before {
  content: '"';
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  font-size: 4rem;
  color: var(--secondary);
  opacity: 0.3;
  font-family: Georgia, serif;
}

.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  font-style: normal;
  font-weight: 600;
  color: var(--primary);
  text-align: right;
}

/* Interactive elements */
.interactive-element {
  cursor: pointer;
  transition: var(--transition);
}

.interactive-element:hover {
  color: var(--primary);
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 200px;
  background-color: var(--text);
  color: var(--card);
  text-align: center;
  border-radius: 6px;
  padding: 8px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -100px;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 0.85rem;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

/* Progress rings for skills */
.progress-ring {
  width: 60px;
  height: 60px;
  transform: rotate(-90deg);
}

.progress-ring__circle {
  stroke: rgba(var(--primary-rgb), 0.2);
  stroke-width: 4;
  fill: transparent;
  stroke-dasharray: 164.93361431346415;
  stroke-dashoffset: 164.93361431346415;
  transition: stroke-dashoffset 0.5s ease-in-out;
}

.progress-ring__circle.filled {
  stroke: var(--primary);
}

/* QR Code styling */
.qr-code {
  display: inline-block;
  padding: 0.5rem;
  background: var(--card);
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.qr-code img {
  width: 100px;
  height: 100px;
  display: block;
}

/* Awards and achievements */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.achievement {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.1), rgba(var(--primary-rgb), 0.05));
  border-radius: var(--border-radius);
  border: 1px solid rgba(var(--accent-rgb), 0.2);
}

.achievement-icon {
  font-size: 2rem;
  color: var(--accent);
}

.achievement-text {
  flex: 1;
}

.achievement-title {
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.25rem;
}

.achievement-description {
  font-size: 0.9rem;
  color: var(--muted);
}

/* Footer */
.resume-footer {
  padding: 2rem;
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.02), rgba(var(--secondary-rgb), 0.02));
  border-top: 1px solid rgba(var(--primary-rgb), 0.1);
  text-align: center;
  font-size: 0.9rem;
  color: var(--muted);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

/* Responsive design */
@media (max-width: 1024px) {
  .resume-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    order: 2;
    border-left: none;
    border-right: none;
    border-top: 2px solid rgba(var(--primary-rgb), 0.1);
  }
  
  .name-section h1 {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .resume-container {
    padding: 1rem;
  }
  
  .resume-header {
    padding: 1.5rem;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .name-section h1 {
    font-size: 2rem;
  }
  
  .main-content,
  .sidebar {
    padding: 1.5rem;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .job-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Print styles */
@media print {
  * {
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }
  
  body {
    background: white !important;
    color: black !important;
    font-size: 12pt;
    line-height: 1.4;
  }
  
  .resume-container {
    max-width: none;
    margin: 0;
    padding: 0;
  }
  
  .resume-card {
    box-shadow: none;
    border-radius: 0;
  }
  
  .resume-header {
    background: none !important;
    color: black !important;
    page-break-inside: avoid;
  }
  
  .resume-grid {
    grid-template-columns: 1fr 250px;
  }
  
  .section {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  .experience-item {
    page-break-inside: avoid;
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #ccc;
  }
  
  .project-card {
    page-break-inside: avoid;
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #ccc;
  }
  
  .interactive-element,
  .tooltip,
  .qr-code {
    display: none;
  }
  
  a {
    color: black !important;
    text-decoration: underline !important;
  }
  
  .resume-footer {
    page-break-before: avoid;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .section {
    animation: none;
  }
  
  .experience-item,
  .project-card,
  .metric-card {
    transition: none;
  }
  
  .skill-progress {
    transition: none;
  }
}

/* Focus styles for keyboard navigation */
.interactive-element:focus,
.project-link:focus,
button:focus,
a:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .experience-item,
  .project-card,
  .metric-card {
    border: 2px solid var(--text);
  }
  
  .skill-tag {
    border: 2px solid var(--primary);
  }
}`;
  }

  // Generate comprehensive head section
  generateHead(config) {
    const { theme, seo } = config;
    const seoData = this.data.seo;
    
    return `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.data.personal.name} - ${config.title}</title>
  
  ${seo ? `
  <!-- SEO Meta Tags -->
  <meta name="description" content="${seoData.meta_description}">
  <meta name="keywords" content="${seoData.keywords.join(', ')}">
  <meta name="author" content="${this.data.personal.name}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${seoData.canonical_url}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${this.data.personal.name} - ${config.title}">
  <meta property="og:description" content="${config.summary}">
  <meta property="og:image" content="${seoData.og_image}">
  <meta property="og:url" content="${seoData.canonical_url}">
  <meta property="og:type" content="profile">
  <meta property="og:site_name" content="Professional Resume">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${this.data.personal.name} - ${config.title}">
  <meta name="twitter:description" content="${config.summary}">
  <meta name="twitter:image" content="${seoData.og_image}">
  
  <!-- LinkedIn -->
  <meta property="profile:first_name" content="Thanatsitt">
  <meta property="profile:last_name" content="Santisamranwilai">
  <meta property="profile:username" content="thanatsitt-s">
  ` : ''}
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <!-- Theme and color scheme -->
  <meta name="theme-color" content="${theme.primary}">
  <meta name="color-scheme" content="light dark">
  
  <style>
    ${this.generateCSS(config)}
  </style>`;
  }

  // Generate structured data for SEO
  generateStructuredData(config) {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": this.data.personal.name,
      "jobTitle": config.title,
      "description": config.summary,
      "url": this.data.contact.website,
      "email": this.data.personal.email,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": this.data.personal.location
      },
      "sameAs": [
        this.data.contact.linkedin,
        this.data.contact.github,
        this.data.contact.youtube
      ],
      "knowsAbout": this.data.skills.ai_technical.map(skill => skill.name),
      "hasOccupation": {
        "@type": "Occupation",
        "name": config.title,
        "occupationLocation": this.data.personal.location
      },
      "alumniOf": this.data.education.map(edu => ({
        "@type": "EducationalOrganization",
        "name": edu.institution
      })),
      "award": this.data.achievements,
      "knowsLanguage": this.data.languages.map(lang => ({
        "@type": "Language",
        "name": lang.name,
        "proficiencyLevel": lang.level
      }))
    };

    return `<script type="application/ld+json">
${JSON.stringify(structuredData, null, 2)}
</script>`;
  }

  // Generate main body content
  generateBody(config) {
    return `
<div class="resume-container">
  <div class="resume-card">
    ${this.generateHeader(config)}
    
    <div class="resume-grid">
      <main class="main-content">
        ${this.generateMainSections(config)}
      </main>
      
      ${config.layout.sidebar !== 'none' ? this.generateSidebar(config) : ''}
    </div>
    
    ${this.generateFooter(config)}
  </div>
</div>

${config.interactivity ? this.generateInteractiveElements(config) : ''}`;
  }

  // Generate enhanced header
  generateHeader(config) {
    const contacts = this.buildContactInfo(config.type);
    
    return `
<header class="resume-header">
  <div class="header-content">
    <div class="name-section">
      <h1>${this.data.personal.name}</h1>
      <div class="title-section">${config.title}</div>
      <div class="tagline">${this.data.personal.personal_brand.tagline}</div>
    </div>
    
    <div class="contact-section">
      <div class="contact-grid">
        ${contacts.map(contact => `
          <div class="contact-item">
            <i class="${contact.icon}"></i>
            ${contact.link ? 
              `<a href="${contact.link}" target="_blank" rel="noopener">${contact.text}</a>` : 
              `<span>${contact.text}</span>`
            }
          </div>
        `).join('')}
      </div>
      
      ${config.interactivity ? `
      <div class="qr-codes">
        <div class="qr-code tooltip">
          <img src="${this.data.contact.qr_codes.portfolio}" alt="Portfolio QR Code">
          <span class="tooltiptext">Scan for portfolio</span>
        </div>
      </div>
      ` : ''}
    </div>
  </div>
</header>`;
  }

  // Generate main content sections
  generateMainSections(config) {
    const sections = config.sections;
    let html = '';

    // Profile section
    html += `
<section class="section">
  <h2 class="section-title"><i class="fas fa-user"></i> Professional Profile</h2>
  <p class="profile-summary">${config.summary}</p>
  
  <div class="value-propositions">
    <h3>Key Value Propositions</h3>
    <ul class="value-props-list">
      ${this.data.personal.personal_brand.value_props.map(prop => 
        `<li>${prop}</li>`
      ).join('')}
    </ul>
  </div>
</section>`;

    // Experience section with timeline
    html += `
<section class="section">
  <h2 class="section-title"><i class="fas fa-briefcase"></i> Professional Experience</h2>
  <div class="timeline">
    ${this.generateExperienceTimeline(config)}
  </div>
</section>`;

    // Projects showcase
    html += `
<section class="section">
  <h2 class="section-title"><i class="fas fa-rocket"></i> Featured Projects</h2>
  <div class="projects-grid">
    ${this.generateProjectCards(config)}
  </div>
</section>`;

    // Achievements and awards
    if (this.data.achievements && this.data.achievements.length > 0) {
      html += `
<section class="section">
  <h2 class="section-title"><i class="fas fa-trophy"></i> Achievements & Recognition</h2>
  <div class="achievements-grid">
    ${this.generateAchievements()}
  </div>
</section>`;
    }

    // Testimonials (for creative resume)
    if (config.type === 'creative_voice' || config.type === 'consulting') {
      html += `
<section class="section">
  <h2 class="section-title"><i class="fas fa-quote-left"></i> Client Testimonials</h2>
  <div class="testimonials-slider">
    ${this.generateTestimonials(config)}
  </div>
</section>`;
    }

    // Education section
    html += `
<section class="section">
  <h2 class="section-title"><i class="fas fa-graduation-cap"></i> Education & Certifications</h2>
  ${this.generateEducation()}
</section>`;

    return html;
  }

  // Generate enhanced sidebar
  generateSidebar(config) {
    return `
<aside class="sidebar">
  <!-- Skills Section -->
  <section class="section">
    <h2 class="section-title"><i class="fas fa-cogs"></i> Core Skills</h2>
    ${this.generateAdvancedSkills(config)}
  </section>
  
  <!-- Key Metrics -->
  <section class="section">
    <h2 class="section-title"><i class="fas fa-chart-line"></i> Key Metrics</h2>
    <div class="metrics-grid">
      ${this.generateMetricsCards(config)}
    </div>
  </section>
  
  <!-- Languages -->
  <section class="section">
    <h2 class="section-title"><i class="fas fa-globe"></i> Languages</h2>
    ${this.generateLanguageSkills()}
  </section>
  
  <!-- Tools & Technologies -->
  <section class="section">
    <h2 class="section-title"><i class="fas fa-tools"></i> Tools & Platforms</h2>
    <div class="tools-grid">
      ${this.data.skills.ai_tools.map(tool => 
        `<span class="tool-tag">${tool}</span>`
      ).join('')}
    </div>
  </section>
  
  <!-- Availability -->
  <section class="section">
    <h2 class="section-title"><i class="fas fa-calendar-check"></i> Availability</h2>
    <div class="availability-info">
      <p><strong>Status:</strong> ${this.data.availability.capacity_status}</p>
      <p><strong>Response Time:</strong> ${this.data.availability.response_time}</p>
      <p><strong>Preferred Work:</strong> ${this.data.availability.preferred_work}</p>
      
      ${this.data.integrations.calendar?.booking_link ? `
      <a href="${this.data.integrations.calendar.booking_link}" 
         class="booking-button" 
         target="_blank">
        <i class="fas fa-calendar"></i> Schedule Meeting
      </a>
      ` : ''}
    </div>
  </section>
</aside>`;
  }

  // Generate experience timeline
  generateExperienceTimeline(config) {
    return this.data.experience.slice(0, 4).map(exp => {
      const descriptions = exp.description[config.type] || exp.description.ai_product;
      
      return `
<div class="timeline-item">
  <div class="experience-item">
    <div class="job-header">
      <h3 class="job-title">${exp.title}</h3>
      <div class="job-meta">
        <span class="company-name">
          ${exp.website ? `<a href="${exp.website}" target="_blank">${exp.company}</a>` : exp.company}
        </span>
        <span class="job-period">${exp.period}</span>
        <span class="employment-type">${exp.employment_type || 'Full-time'}</span>
        ${exp.team_size ? `<span class="team-size">Team: ${exp.team_size}</span>` : ''}
      </div>
    </div>
    
    <div class="job-description">
      <ul>
        ${descriptions.map(desc => `<li>${desc}</li>`).join('')}
      </ul>
    </div>
    
    ${exp.technologies ? `
    <div class="job-technologies">
      <h4>Technologies Used:</h4>
      <div class="tech-tags">
        ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
    </div>
    ` : ''}
    
    ${exp.achievements ? `
    <div class="job-achievements">
      <h4>Key Achievements:</h4>
      <ul class="achievements-list">
        ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
      </ul>
    </div>
    ` : ''}
    
    <div class="impact-metrics">
      ${Object.entries(exp.impact_metrics || {}).map(([key, value]) => `
        <span class="impact-metric">
          <span class="metric-label">${key.replace('_', ' ')}</span>
          <span class="metric-value">${value}</span>
        </span>
      `).join('')}
    </div>
  </div>
</div>`;
    }).join('');
  }

  // Generate project cards
  generateProjectCards(config) {
    return config.projects.map(project => `
<div class="project-card">
  <div class="project-header">
    <h3 class="project-title">${project.name}</h3>
    <p class="project-description">${project.description}</p>
    ${project.funding ? `<div class="funding-badge">Funded by ${project.funding}</div>` : ''}
  </div>
  
  <div class="project-body">
    ${project.features ? `
    <div class="project-features">
      <h4>Key Features:</h4>
      <ul>
        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
    </div>
    ` : ''}
    
    <div class="project-tech">
      ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
    </div>
    
    <div class="project-impact">
      <strong>Impact:</strong> ${project.impact}
    </div>
    
    ${project.metrics ? `
    <div class="project-metrics">
      ${Object.entries(project.metrics).map(([key, value]) => `
        <div class="metric">
          <span class="metric-label">${key.replace('_', ' ')}</span>
          <span class="metric-value">${value}</span>
        </div>
      `).join('')}
    </div>
    ` : ''}
    
    <div class="project-links">
      ${project.url ? `<a href="${project.url}" class="project-link" target="_blank">
        <i class="fab fa-github"></i> View Code
      </a>` : ''}
      ${project.demo_url ? `<a href="${project.demo_url}" class="project-link" target="_blank">
        <i class="fas fa-external-link-alt"></i> Live Demo
      </a>` : ''}
    </div>
  </div>
</div>`).join('');
  }

  // Generate advanced skills visualization
  generateAdvancedSkills(config) {
    return `
<div class="skills-container">
  ${config.skills.map(skill => `
    <div class="skill-chart" data-skill="${skill.name}" data-proficiency="${skill.proficiency || 75}">
      <div class="skill-name">
        <span>${skill.name}</span>
        <span class="skill-years">${skill.years}+ years</span>
      </div>
      <div class="skill-bar">
        <div class="skill-progress" style="--proficiency: ${skill.proficiency || 75}%"></div>
      </div>
      ${skill.verified ? '<i class="fas fa-check-circle verified-badge" title="Verified"></i>' : ''}
    </div>
  `).join('')}
</div>`;
  }

  // Generate metrics cards
  generateMetricsCards(config) {
    return config.metrics.map(metricKey => {
      const metric = this.data.metrics[metricKey];
      return `
<div class="metric-card">
  <div class="metric-value">${metric.value}</div>
  <div class="metric-label">${metric.description}</div>
  ${metric.trend ? `<div class="metric-trend">${metric.trend}</div>` : ''}
</div>`;
    }).join('');
  }

  // Generate language skills with proficiency
  generateLanguageSkills() {
    return `
<div class="languages-grid">
  ${this.data.languages.map(lang => `
    <div class="language-item">
      <div class="language-header">
        <span class="language-name">${lang.name}</span>
        <span class="language-level">${lang.level}</span>
      </div>
      ${lang.note ? `<div class="language-note">${lang.note}</div>` : ''}
    </div>
  `).join('')}
</div>`;
  }

  // Generate testimonials
  generateTestimonials(config) {
    const relevantTestimonials = this.data.testimonials.filter(t => 
      config.type === 'creative_voice' ? ['voice', 'creative'].includes(t.category) :
      config.type === 'ai_product' ? ['ai', 'tech'].includes(t.category) :
      true
    );

    return relevantTestimonials.map(testimonial => `
<div class="testimonial">
  <div class="testimonial-text">${testimonial.text}</div>
  <div class="testimonial-author">
    — ${testimonial.author}
    ${testimonial.organization ? `, ${testimonial.organization}` : ''}
    ${testimonial.location ? `, ${testimonial.location}` : ''}
  </div>
</div>`).join('');
  }

  // Generate achievements
  generateAchievements() {
    return this.data.achievements.map(achievement => `
<div class="achievement">
  <div class="achievement-icon">
    <i class="fas fa-trophy"></i>
  </div>
  <div class="achievement-text">
    <div class="achievement-title">${achievement}</div>
  </div>
</div>`).join('');
  }

  // Generate education section
  generateEducation() {
    const education = this.data.education.map(edu => `
<div class="education-item">
  <h4>${edu.degree} in ${edu.field}</h4>
  <div class="education-meta">
    ${edu.institution} • ${edu.period}
  </div>
</div>`).join('');

    const certifications = this.data.certifications.map(cert => 
      `<span class="certification-tag">${cert.name} (${cert.year})</span>`
    ).join('');

    return `
<div class="education-section">
  <div class="education-list">
    ${education}
  </div>
  
  <div class="certifications">
    <h4>Professional Certifications</h4>
    <div class="certifications-grid">
      ${certifications}
    </div>
  </div>
</div>`;
  }

  // Generate footer
  generateFooter(config) {
    return `
<footer class="resume-footer">
  <div class="footer-content">
    <div class="footer-links">
      <a href="${this.data.contact.website}" target="_blank">Portfolio</a> •
      <a href="${this.data.contact.linkedin}" target="_blank">LinkedIn</a> •
      <a href="${this.data.contact.github}" target="_blank">GitHub</a> •
      <a href="mailto:${this.data.personal.email}">${this.data.personal.email}</a>
    </div>
    <div class="footer-meta">
      Last Updated: ${this.data.version_history[0]?.date || 'December 2024'} •
      Version ${this.data.version_history[0]?.version || '2.1'}
      ${config.analytics ? ' • <span id="view-counter">Views: <span class="view-count">Loading...</span></span>' : ''}
    </div>
  </div>
</footer>`;
  }

  // Generate interactive elements and scripts
  generateInteractiveElements(config) {
    return `
<!-- Scroll progress indicator -->
<div id="scroll-progress"></div>

<!-- Theme switcher -->
<div id="theme-switcher" class="theme-switcher">
  <button id="theme-toggle" class="theme-button" title="Toggle theme">
    <i class="fas fa-moon"></i>
  </button>
</div>

<!-- Print button -->
<div id="print-controls" class="print-controls">
  <button id="print-btn" class="print-button" title="Print resume">
    <i class="fas fa-print"></i>
  </button>
  <button id="download-btn" class="download-button" title="Download PDF">
    <i class="fas fa-download"></i>
  </button>
</div>`;
  }

  // Generate JavaScript for interactivity
  generateScripts(config) {
    if (!config.interactivity) return '';

    return `
<script>
// Analytics tracking
${config.analytics ? this.generateAnalyticsScript() : ''}

// Theme switching
${this.generateThemeScript()}

// Scroll effects
${this.generateScrollScript()}

// Skill animations
${this.generateSkillAnimations()}

// Print functionality
${this.generatePrintScript()}

// Performance monitoring
${this.generatePerformanceScript()}

// Interactive tooltips
${this.generateTooltipScript()}

// Smooth scrolling navigation
${this.generateNavigationScript()}

// Resume download functionality
${this.generateDownloadScript()}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  initializeAnalytics();
  initializeTheme();
  initializeScrollEffects();
  initializeSkillAnimations();
  initializePrintControls();
  initializeTooltips();
  initializeNavigation();
  initializeDownload();
  
  console.log('Resume initialized successfully');
});
</script>`;
  }

  // Individual script generators
  generateAnalyticsScript() {
    return `
function initializeAnalytics() {
  // Track page views
  let viewCount = localStorage.getItem('resume-views') || 0;
  viewCount++;
  localStorage.setItem('resume-views', viewCount);
  
  const viewCounter = document.querySelector('.view-count');
  if (viewCounter) {
    viewCounter.textContent = viewCount;
  }
  
  // Track section visibility
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionTitle = entry.target.querySelector('.section-title')?.textContent || 'Unknown';
        console.log('Viewing section:', sectionTitle);
        // Send to analytics service if needed
      }
    });
  }, { threshold: 0.5 });
  
  sections.forEach(section => observer.observe(section));
  
  // Track link clicks
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = e.target.href;
      console.log('Link clicked:', href);
      // Send to analytics service if needed
    });
  });
}`;
  }

  generateThemeScript() {
    return `
function initializeTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  body.classList.add(currentTheme + '-theme');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = body.classList.contains('light-theme');
      body.classList.remove('light-theme', 'dark-theme');
      body.classList.add(isLight ? 'dark-theme' : 'light-theme');
      
      localStorage.setItem('theme', isLight ? 'dark' : 'light');
      
      // Update icon
      const icon = themeToggle.querySelector('i');
      icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    });
  }
}`;
  }

  generateScrollScript() {
    return `
function initializeScrollEffects() {
  // Scroll progress indicator
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    });
  }
  
  // Parallax header effect
  const header = document.querySelector('.resume-header');
  if (header) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      header.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
    });
  }
  
  // Reveal sections on scroll
  const sections = document.querySelectorAll('.section');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => revealObserver.observe(section));
}`;
  }

  generateSkillAnimations() {
    return `
function initializeSkillAnimations() {
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const proficiency = progressBar.style.getPropertyValue('--proficiency');
        progressBar.style.width = proficiency;
        
        // Animate counter if present
        const skillChart = entry.target.closest('.skill-chart');
        if (skillChart) {
          const proficiencyValue = parseInt(proficiency);
          animateCounter(skillChart, proficiencyValue);
        }
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => skillObserver.observe(bar));
  
  // Progress ring animations
  const progressRings = document.querySelectorAll('.progress-ring__circle.filled');
  progressRings.forEach(ring => {
    const proficiency = parseInt(ring.dataset.proficiency || 75);
    const circumference = 2 * Math.PI * 26; // radius = 26
    const offset = circumference - (proficiency / 100) * circumference;
    ring.style.strokeDashoffset = offset;
  });
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50; // 50 steps
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    const counterEl = element.querySelector('.skill-counter');
    if (counterEl) {
      counterEl.textContent = Math.round(current) + '%';
    }
  }, 20);
}`;
  }

  generatePrintScript() {
    return `
function initializePrintControls() {
  const printBtn = document.getElementById('print-btn');
  const downloadBtn = document.getElementById('download-btn');
  
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      // Optimize for printing
      document.body.classList.add('print-mode');
      
      // Hide interactive elements
      const interactiveElements = document.querySelectorAll('.theme-switcher, .print-controls, #scroll-progress');
      interactiveElements.forEach(el => el.style.display = 'none');
      
      // Print
      window.print();
      
      // Restore after printing
      setTimeout(() => {
        document.body.classList.remove('print-mode');
        interactiveElements.forEach(el => el.style.display = '');
      }, 1000);
    });
  }
  
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      generatePDF();
    });
  }
}

function generatePDF() {
  // Simple HTML to PDF conversion using browser's print functionality
  const printWindow = window.open('', '_blank');
  printWindow.document.write(document.documentElement.outerHTML);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}`;
  }

  generatePerformanceScript() {
    return `
function initializePerformanceMonitoring() {
  // Performance metrics
  const perfData = {
    loadTime: window.performance.timing.loadEventEnd - window.performance.timing.navigationStart,
    domContentLoaded: window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart,
    firstPaint: 0,
    firstContentfulPaint: 0
  };
  
  // Capture paint metrics
  if ('getEntriesByType' in window.performance) {
    const paintMetrics = window.performance.getEntriesByType('paint');
    paintMetrics.forEach(metric => {
      if (metric.name === 'first-paint') {
        perfData.firstPaint = metric.startTime;
      } else if (metric.name === 'first-contentful-paint') {
        perfData.firstContentfulPaint = metric.startTime;
      }
    });
  }
  
  console.log('Resume Performance Metrics:', perfData);
  
  // Monitor resource loading
  window.addEventListener('load', () => {
    const resources = window.performance.getEntriesByType('resource');
    const slowResources = resources.filter(resource => resource.duration > 1000);
    if (slowResources.length > 0) {
      console.warn('Slow loading resources:', slowResources);
    }
  });
}`;
  }

  generateTooltipScript() {
    return `
function initializeTooltips() {
  // Enhanced tooltips for interactive elements
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
    element.addEventListener('focus', showTooltip);
    element.addEventListener('blur', hideTooltip);
  });
}

function showTooltip(e) {
  const text = e.target.dataset.tooltip;
  if (!text) return;
  
  const tooltip = document.createElement('div');
  tooltip.className = 'dynamic-tooltip';
  tooltip.textContent = text;
  document.body.appendChild(tooltip);
  
  const rect = e.target.getBoundingClientRect();
  tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
  tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
  
  e.target._tooltip = tooltip;
}

function hideTooltip(e) {
  if (e.target._tooltip) {
    e.target._tooltip.remove();
    delete e.target._tooltip;
  }
}`;
  }

  generateNavigationScript() {
    return `
function initializeNavigation() {
  // Smooth scrolling for internal links
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Press 'P' to print
    if (e.key === 'p' && e.ctrlKey) {
      e.preventDefault();
      document.getElementById('print-btn')?.click();
    }
    
    // Press 'T' to toggle theme
    if (e.key === 't' && e.ctrlKey) {
      e.preventDefault();
      document.getElementById('theme-toggle')?.click();
    }
  });
}`;
  }

  generateDownloadScript() {
    return `
function initializeDownload() {
  // Advanced download functionality
  const downloadBtn = document.getElementById('download-btn');
  
  if (downloadBtn) {
    downloadBtn.addEventListener('click', async () => {
      try {
        await generateAdvancedPDF();
      } catch (error) {
        console.error('Download failed:', error);
        // Fallback to basic print
        window.print();
      }
    });
  }
}

async function generateAdvancedPDF() {
  // Create a clean version for PDF
  const clonedDoc = document.cloneNode(true);
  
  // Remove interactive elements
  const elementsToRemove = clonedDoc.querySelectorAll('.theme-switcher, .print-controls, #scroll-progress, .interactive-element');
  elementsToRemove.forEach(el => el.remove());
  
  // Optimize styles for PDF
  const style = clonedDoc.createElement('style');
  style.textContent = \`
    body { background: white !important; }
    .resume-card { box-shadow: none !important; }
    a { color: #000 !important; }
  \`;
  clonedDoc.head.appendChild(style);
  
  // Open in new window for PDF generation
  const pdfWindow = window.open('', '_blank');
  pdfWindow.document.write(clonedDoc.documentElement.outerHTML);
  pdfWindow.document.close();
  
  // Trigger print dialog
  pdfWindow.onload = () => {
    pdfWindow.focus();
    pdfWindow.print();
  };
}`;
  }

  // Helper methods for building different sections
  buildContactInfo(type) {
    const baseContacts = [
      { icon: 'fas fa-map-marker-alt', text: this.data.personal.location },
      { icon: 'fas fa-envelope', text: this.data.personal.email, link: `mailto:${this.data.personal.email}` },
      { icon: 'fas fa-globe', text: 'Portfolio', link: this.data.contact.website }
    ];

    if (type === 'creative_voice') {
      return [
        ...baseContacts,
        { icon: 'fas fa-microphone', text: 'Voice Demo', link: this.data.contact.voice_demo },
        { icon: 'fab fa-youtube', text: 'YouTube', link: this.data.contact.youtube },
        { icon: 'fab fa-linkedin', text: 'LinkedIn', link: this.data.contact.linkedin }
      ];
    } else {
      return [
        ...baseContacts,
        { icon: 'fab fa-linkedin', text: 'LinkedIn', link: this.data.contact.linkedin },
        { icon: 'fab fa-github', text: 'GitHub', link: this.data.contact.github }
      ];
    }
  }

  buildSections(type, preset) {
    const priorityMap = {
      high: ['experience', 'projects', 'skills'],
      medium: ['education', 'achievements', 'testimonials'],
      low: ['languages', 'certifications', 'availability']
    };
    
    return preset.sections_priority || priorityMap.high;
  }

  selectSkills(type) {
    switch (type) {
      case 'ai_product':
      case 'startup':
      case 'enterprise':
        return [...this.data.skills.ai_technical, ...this.data.skills.technical.slice(0, 4)];
      case 'creative_voice':
        return [...this.data.skills.voice_creative, ...this.data.skills.technical.slice(0, 3)];
      default:
        return [
          ...this.data.skills.ai_technical.slice(0, 4),
          ...this.data.skills.voice_creative.slice(0, 3),
          ...this.data.skills.technical.slice(0, 3)
        ];
    }
  }

  selectProjects(type) {
    const allProjects = this.data.projects;
    
    switch (type) {
      case 'ai_product':
      case 'startup':
        return allProjects.filter(p => ['open_source', 'funded_project', 'commercial'].includes(p.type));
      case 'creative_voice':
        return allProjects.filter(p => ['funded_project', 'creative', 'commercial'].includes(p.type));
      default:
        return allProjects.slice(0, 4);
    }
  }

  selectMetrics(type, emphasize) {
    const metricsByCategory = {
      technical: ['dataset_task_rating', 'compliance_rate', 'total_projects'],
      creative: ['voice_projects_completed', 'client_satisfaction', 'repeat_client_rate'],
      business: ['ton_app_engagement', 'ecommerce_ctr', 'seo_visibility'],
      growth: ['ton_app_engagement', 'total_projects', 'repeat_client_rate']
    };

    if (emphasize.includes('growth')) {
      return metricsByCategory.growth;
    } else if (type === 'creative_voice') {
      return [...metricsByCategory.creative, ...metricsByCategory.business.slice(0, 2)];
    } else {
      return [...metricsByCategory.technical, ...metricsByCategory.business.slice(0, 2)];
    }
  }

  // SEO and metadata generation
  generateSEOAttributes() {
    return `prefix="og: https://ogp.me/ns# profile: https://ogp.me/ns/profile#"`;
  }

  generateMetadata(config) {
    return {
      title: `${this.data.personal.name} - ${config.title}`,
      description: config.summary,
      keywords: this.data.seo.keywords,
      type: config.type,
      generated: new Date().toISOString(),
      version: this.data.version_history[0]?.version || '2.1',
      theme: config.theme.name || 'tech',
      layout: config.layout.name || 'modern'
    };
  }

  generateAnalytics(config) {
    return {
      generation_time: new Date().toISOString(),
      config_hash: this.hashConfig(config),
      estimated_read_time: this.calculateReadTime(),
      accessibility_score: this.calculateAccessibilityScore(config),
      performance_score: this.calculatePerformanceScore(config)
    };
  }

  // Utility methods
  hashConfig(config) {
    const configString = JSON.stringify({
      type: config.type,
      theme: config.theme.name,
      layout: config.layout.name,
      sections: config.sections
    });
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < configString.length; i++) {
      const char = configString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36);
  }

  calculateReadTime() {
    // Estimate reading time based on content length
    const textElements = [
      this.data.personal.summary,
      ...this.data.experience.map(exp => Object.values(exp.description).flat().join(' ')),
      ...this.data.projects.map(p => p.description),
      ...this.data.testimonials.map(t => t.text)
    ];
    
    const totalWords = textElements.join(' ').split(/\s+/).length;
    const wordsPerMinute = 200;
    
    return Math.ceil(totalWords / wordsPerMinute);
  }

  calculateAccessibilityScore(config) {
    let score = 100;
    
    // Deduct points for accessibility issues
    if (!config.interactivity) score -= 10; // No keyboard navigation
    if (config.theme.name === 'dark' && !this.checkContrast(config.theme)) score -= 15;
    if (!this.data.accessibility.screen_reader_friendly) score -= 20;
    
    return Math.max(0, score);
  }

  calculatePerformanceScore(config) {
    let score = 100;
    
    // Estimate performance based on features
    if (config.interactivity) score -= 5; // JavaScript overhead
    if (config.animations !== 'none') score -= 5; // Animation overhead
    if (this.data.projects.length > 6) score -= 10; // Too much content
    
    return Math.max(0, score);
  }

  checkContrast(theme) {
    // Simple contrast check (would need proper WCAG calculation in production)
    const lightness = this.getLightness(theme.primary);
    const bgLightness = this.getLightness(theme.bg);
    
    return Math.abs(lightness - bgLightness) > 0.5; // Simplified check
  }

  getLightness(color) {
    // Convert hex to lightness (simplified)
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    return (0.299 * r + 0.587 * g + 0.114 * b);
  }

  // Track analytics
  trackGeneration(type, config) {
    if (typeof this.data.analytics === 'undefined') return;
    
    this.data.analytics.resume_views++;
    
    if (!this.data.analytics.generation_history) {
      this.data.analytics.generation_history = [];
    }
    
    this.data.analytics.generation_history.push({
      type,
      timestamp: new Date().toISOString(),
      theme: config.theme.name || 'tech',
      layout: config.layout.name || 'modern'
    });
  }

  // A/B testing functionality
  runABTest(testName) {
    const activeTest = this.data.ab_tests.active_tests.find(test => test.name === testName);
    if (!activeTest) return null;
    
    // Simple random variant selection
    const variantIndex = Math.floor(Math.random() * activeTest.variants.length);
    return activeTest.variants[variantIndex];
  }

  // Export/import functionality
  exportResumeData() {
    return {
      data: this.data,
      version: '2.1',
      exported: new Date().toISOString(),
      generator_version: 'advanced-1.0'
    };
  }

  importResumeData(exportedData) {
    if (exportedData.version !== '2.1') {
      console.warn('Version mismatch. Data migration may be needed.');
    }
    
    this.data = { ...this.data, ...exportedData.data };
    return true;
  }
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdvancedResumeGenerator;
} else if (typeof window !== 'undefined') {
  window.AdvancedResumeGenerator = AdvancedResumeGenerator;
}
