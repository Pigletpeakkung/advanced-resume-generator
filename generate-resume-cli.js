const fs = require('fs');
const path = require('path');
const ResumeGenerator = require('./resume-generator.js');
const resumeData = require('./resume-data.js');

function generateAllResumes() {
  const generator = new ResumeGenerator(resumeData);
  
  const resumes = {
    'ai-product': generator.generateAIProductResume(),
    'creative-voice': generator.generateCreativeVoiceResume(),
    'general': generator.generateGeneralResume()
  };
  
  // Create output directory
  const outputDir = 'generated-resumes';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  
  // Generate each resume
  for (const [type, html] of Object.entries(resumes)) {
    const filename = `thanatsitt-${type}-resume.html`;
    const filepath = path.join(outputDir, filename);
    
    fs.writeFileSync(filepath, html);
    console.log(`✅ Generated: ${filepath}`);
  }
  
  console.log(`\n🎉 All resumes generated in ./${outputDir}/`);
  console.log('Open the HTML files in a browser and print to PDF for final versions.');
}

// Run if called directly
if (require.main === module) {
  generateAllResumes();
}

module.exports = { generateAllResumes };
