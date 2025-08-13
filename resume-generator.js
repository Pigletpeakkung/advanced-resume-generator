class ResumeGenerator {
  constructor(data) {
    this.data = data;
  }

  // Generate different resume types
  generateAIProductResume() {
    return this.generateResume('ai_product', {
      colorScheme: 'tech', // blue theme
      focus: 'technical',
      showMetrics: ['dataset_task_rating', 'ton_app_engagement', 'ecommerce_ctr', 'compliance_rate', 'total_projects'],
      skills: [...this.data.skills.ai_technical, ...this.data.skills.technical],
      projects: this.data.projects.filter(p => ['open_source', 'funded_project', 'commercial'].includes(p.type))
    });
  }

  generateCreativeVoiceResume() {
    return this.generateResume('creative_voice', {
      colorScheme: 'creative', // purple theme
      focus: 'creative',
      showMetrics: ['voice_projects_completed', 'client_satisfaction', 'ton_app_engagement', 'seo_visibility', 'repeat_client_rate'],
      skills: [...this.data.skills.voice_creative, ...this.data.skills.technical.slice(0, 3)],
      projects: this.data.projects.filter(p => ['funded_project', 'creative', 'commercial'].includes(p.type))
    });
  }

  generateGeneralResume() {
    return this.generateResume('general', {
      colorScheme: 'balanced', // neutral theme
      focus: 'balanced',
      showMetrics: ['voice_projects_completed', 'dataset_task_rating', 'ton_app_engagement', 'ecommerce_ctr'],
      skills: [...this.data.skills.ai_technical.slice(0, 4), ...this.data.skills.voice_creative.slice(0, 3), ...this.data.skills.technical.slice(0, 3)],
      projects: this.data.projects
    });
  }

  // Main resume generation function
  generateResume(type, options) {
    const config = this.getConfig(type, options);
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${this.data.personal.name} — ${this.data.personal.titles[type]}</title>
<style>${this.getCSS(config.colorScheme)}</style>
</head>
<body>
<div class="container">
  <div class="card">
    ${this.generateHeader(type, config)}
    <div class="grid">
      ${this.generateMainContent(type, config)}
      ${this.generateSidebar(type, config)}
    </div>
    ${this.generateFooter()}
  </div>
</div>
</body>
</html>`;
  }

  // Configuration for different resume types
  getConfig(type, options) {
    const baseConfig = {
      type,
      title: this.data.personal.titles[type],
      summary: this.data.personal.summary[type],
      ...options
    };

    // Add type-specific contacts
    if (type === 'creative_voice') {
      baseConfig.contacts = [
        { icon: '📍', text: this.data.personal.location },
        { icon: '✉️', text: this.data.personal.email, link: `mailto:${this.data.personal.email}` },
        { icon: '🌐', text: 'www.pegearts.com', link: this.data.contact.website },
        { icon: '🎙️', text: 'Voice Portfolio', link: this.data.contact.voice_demo },
        { icon: '📺', text: 'YouTube', link: this.data.contact.youtube },
        { icon: '💼', text: 'LinkedIn', link: this.data.contact.linkedin }
      ];
    } else {
      baseConfig.contacts = [
        { icon: '📍', text: this.data.personal.location },
        { icon: '✉️', text: this.data.personal.email, link: `mailto:${this.data.personal.email}` },
        { icon: '🌐', text: 'www.pegearts.com', link: this.data.contact.website },
        { icon: '🔗', text: 'LinkedIn', link: this.data.contact.linkedin },
        { icon: '💻', text: 'GitHub', link: this.data.contact.github }
      ];
    }

    return baseConfig;
  }

  // Generate CSS based on color scheme
  getCSS(colorScheme) {
    const themes = {
      tech: {
        accent: '#2563eb',
        accent2: '#0ea5e9',
        bg: '#f8fafc',
        muted: '#64748b'
      },
      creative: {
        accent: '#7c3aed', 
        accent2: '#ec4899',
        bg: '#fefbff',
        muted: '#6b7280'
      },
      balanced: {
        accent: '#3b67a3',
        accent2: '#e85d75', 
        bg: '#fbfdff',
        muted: '#64707a'
      }
    };

    const theme = themes[colorScheme] || themes.balanced;

    return `
:root{
  --bg:${theme.bg};
  --card:#ffffff;
  --accent:${theme.accent};
  --accent-2:${theme.accent2};
  --muted:${theme.muted};
  --radius:12px;
  --maxw:900px;
  --sans: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
*{box-sizing:border-box}
html,body{height:100%;margin:0;font-family:var(--sans);background:var(--bg);color:#1f2937;}
.container{max-width:var(--maxw);margin:28px auto;padding:24px}
.card{background:var(--card);border-radius:var(--radius);box-shadow:0 8px 25px rgba(31,41,55,0.08);overflow:hidden;border:1px solid rgba(209,213,219,0.3)}
.header{display:flex;flex-wrap:wrap;align-items:center;gap:18px;padding:24px;background:linear-gradient(135deg, rgba(var(--accent-rgb),0.03), rgba(var(--accent2-rgb),0.02));border-bottom:2px solid rgba(var(--accent-rgb),0.1)}
.name-block{flex:1 1 400px}
h1{margin:0;font-size:1.85rem;color:var(--accent);font-weight:700}
.title{margin:8px 0 0;font-size:1.1rem;color:var(--muted);font-weight:500}
.contact{display:flex;flex-wrap:wrap;gap:12px;margin-top:14px;color:var(--muted);font-size:0.95rem}
.contact a{color:var(--accent);text-decoration:none;transition:all 0.2s}
.contact a:hover{text-decoration:underline}
.grid{display:grid;grid-template-columns: 1fr 300px;gap:0}
.main{padding:24px}
.side{width:300px;padding:24px;border-left:2px solid rgba(var(--accent-rgb),0.1);background:linear-gradient(180deg, rgba(var(--accent-rgb),0.02), rgba(255,255,255,0.5))}
.section{margin-bottom:18px}
.h{font-size:1.1rem;margin:0 0 10px;color:#374151;font-weight:700;border-left:4px solid var(--accent);padding-left:12px}
.p{margin:0;color:var(--muted);line-height:1.5;font-size:0.95rem}
.job{margin-bottom:16px;padding:16px;background:rgba(var(--accent-rgb),0.03);border-radius:10px;border-left:4px solid var(--accent)}
.job h3{margin:0;font-size:1.05rem;color:#1f2937;font-weight:600}
.job .meta{font-size:0.88rem;color:var(--accent);margin:4px 0 8px;font-weight:500}
.job ul{margin:8px 0 0;padding-left:18px;color:#4b5563;line-height:1.5}
.job li{margin-bottom:6px}
.tag{background:rgba(var(--accent-rgb),0.08);padding:7px 12px;border-radius:999px;font-size:0.85rem;color:var(--accent);font-weight:500;border:1px solid rgba(var(--accent-rgb),0.15);margin:4px 4px 4px 0;display:inline-block}
.metric{background:rgba(var(--accent-rgb),0.06);padding:12px;border-radius:10px;font-weight:600;color:#1f2937;font-size:0.9rem;display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;border:1px solid rgba(var(--accent-rgb),0.1)}
.metric-value{color:var(--accent);font-weight:700}
.badge{background:linear-gradient(135deg,var(--accent),var(--accent-2));color:white;padding:12px 16px;border-radius:10px;font-weight:700;text-align:center;min-width:180px}
.footer{padding:20px 24px;border-top:2px solid rgba(var(--accent-rgb),0.1);color:var(--muted);font-size:0.9rem;background:rgba(var(--accent-rgb),0.02)}
.small{font-size:0.85rem}
.testimonial{background:rgba(var(--accent-2-rgb),0.03);padding:16px;border-radius:10px;border-left:4px solid var(--accent-2);font-style:italic;margin:12px 0;color:#374151}
.testimonial-author{font-weight:600;color:var(--accent-2);margin-top:8px;font-style:normal;font-size:0.9rem}
@media (max-width:900px){
  .grid{grid-template-columns:1fr}
  .side{order:2;border-left:none;border-top:2px solid rgba(var(--accent-rgb),0.1);width:100%}
}
@media print{
  html,body{background:white}
  .container{margin:0;padding:0}
  .card{box-shadow:none;border:none}
  .side{background:white}
  a{color:#1f2937;text-decoration:none}
  .header,.main,.side{padding:16px}
}`;
  }

  // Generate header section
  generateHeader(type, config) {
    const contactsHTML = config.contacts.map(contact => 
      contact.link 
        ? `<div>${contact.icon} <a href="${contact.link}" target="_blank">${contact.text}</a></div>`
        : `<div>${contact.icon} ${contact.text}</div>`
    ).join('\n          ');

    const badgeText = type === 'ai_product' ? 'AI Product Focus' : 
                     type === 'creative_voice' ? 'Creative Professional' : 
                     'Versatile Specialist';

    return `    <div class="header">
      <div class="name-block">
        <h1>${this.data.personal.name}</h1>
        <div class="title">${config.title}</div>
        <div class="contact">
          ${contactsHTML}
        </div>
      </div>
      <div class="badge">${badgeText}</div>
    </div>`;
  }

  // Generate main content
  generateMainContent(type, config) {
    return `      <main class="main">
        <section class="section">
          <div class="h">Profile</div>
          <p class="p">${config.summary}</p>
        </section>

        <section class="section">
          <div class="h">Professional Experience</div>
          ${this.generateExperience(type)}
        </section>

        <section class="section">
          <div class="h">Featured Projects</div>
          ${this.generateProjects(config.projects)}
        </section>

        ${this.generateTestimonials(type)}

        <section class="section">
          <div class="h">Education & Certifications</div>
          ${this.generateEducation()}
        </section>
      </main>`;
  }

  // Generate sidebar
  generateSidebar(type, config) {
    return `      <aside class="side">
        <section class="section">
          <div class="h">Core Skills</div>
          ${this.generateSkills(config.skills)}
        </section>

        <section class="section">
          <div class="h">Key Metrics</div>
          ${this.generateMetrics(config.showMetrics)}
        </section>

        <section class="section">
          <div class="h">Languages</div>
          ${this.generateLanguages()}
        </section>

        ${this.generateAvailability(type)}
      </aside>`;
  }

  // Generate experience section
  generateExperience(type) {
    return this.data.experience.slice(0, 4).map(exp => {
      const descriptions = exp.description[type] || exp.description.ai_product || exp.description.creative_voice;
      const bulletPoints = descriptions.map(desc => `<li>${desc}</li>`).join('\n              ');
      
      return `          <article class="job">
            <h3>${exp.title} — ${exp.company}</h3>
            <div class="meta">${exp.period}</div>
            <ul>
              ${bulletPoints}
            </ul>
          </article>`;
    }).join('\n\n');
  }

  // Generate projects section
  generateProjects(projects) {
    return `          <ul>
            ${projects.map(project => {
              const techStr = project.technologies ? ` | <em>${project.technologies.join(', ')}</em>` : '';
              const impactStr = project.impact ? ` | <strong>Result:</strong> ${project.impact}` : '';
              const linkStr = project.url ? ` | <a href="${project.url}" target="_blank">View Project</a>` : '';
              
              return `<li><strong>${project.name}</strong> — ${project.description}${techStr}${impactStr}${linkStr}</li>`;
            }).join('\n            ')}
          </ul>`;
  }

  // Generate skills section
  generateSkills(skills) {
    return `          <div>
            ${skills.map(skill => `<span class="tag">${skill.name}</span>`).join('\n            ')}
          </div>`;
  }

  // Generate metrics section
  generateMetrics(metricKeys) {
    return `          <div>
            ${metricKeys.map(key => {
              const metric = this.data.metrics[key];
              return `<div class="metric">
              <span>${metric.description}</span>
              <span class="metric-value">${metric.value}</span>
            </div>`;
            }).join('\n            ')}
          </div>`;
  }

  // Generate languages section
  generateLanguages() {
    return `          <div>
            ${this.data.languages.map(lang => 
              `<p class="p"><strong>${lang.name}:</strong> ${lang.level} ${lang.note ? `(${lang.note})` : ''}</p>`
            ).join('\n            ')}
          </div>`;
  }

  // Generate testimonials (only for creative resume)
  generateTestimonials(type) {
    if (type !== 'creative_voice') return '';
    
    const relevantTestimonials = this.data.testimonials.filter(t => 
      ['voice', 'creative'].includes(t.category)
    ).slice(0, 2);

    if (relevantTestimonials.length === 0) return '';

    return `        <section class="section">
          <div class="h">Client Testimonials</div>
          ${relevantTestimonials.map(testimonial => `
          <div class="testimonial">
            <p>"${testimonial.text}"</p>
            <div class="testimonial-author">— ${testimonial.author}${testimonial.location ? `, ${testimonial.location}` : ''}</div>
          </div>`).join('')}
        </section>`;
  }

  // Generate education section
  generateEducation() {
    const education = this.data.education.slice(0, 2).map(edu => 
      `<strong>${edu.degree}</strong> — ${edu.institution} (${edu.period})`
    ).join('<br/>');
    
    const certs = this.data.certifications.slice(0, 4).map(cert => cert.name).join(' • ');
    
    return `          <p class="p">${education}</p>
          <p class="p"><strong>Certifications:</strong> ${certs}</p>`;
  }

  // Generate availability section
  generateAvailability(type) {
    const availText = type === 'ai_product' 
      ? 'Open to product roles, contract work, and AI consulting opportunities.'
      : 'Available for freelance projects, voice work, and creative consulting.';
      
    return `        <section class="section">
          <div class="h">Availability</div>
          <p class="p">${availText}</p>
          <p class="p"><strong>Response time:</strong> ${this.data.availability.response_time}</p>
        </section>`;
  }

  // Generate footer
  generateFooter() {
    return `    <div class="footer">
      <div class="small">Portfolio: <a href="${this.data.contact.website}" target="_blank">www.pegearts.com</a> • GitHub: <a href="${this.data.contact.github}" target="_blank">Pigletpeakkung</a></div>
      <div class="small">Updated: ${this.data.meta.last_updated} • <a href="mailto:${this.data.personal.email}">${this.data.personal.email}</a></div>
    </div>`;
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ResumeGenerator;
}
