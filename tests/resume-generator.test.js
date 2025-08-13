const AdvancedResumeGenerator = require('../advanced-resume-generator');
const enhancedResumeData = require('../enhanced-resume-data');

describe('AdvancedResumeGenerator', () => {
  let generator;
  
  beforeEach(() => {
    generator = new AdvancedResumeGenerator(enhancedResumeData);
  });

  describe('Initialization', () => {
    test('should initialize with resume data', () => {
      expect(generator.data).toBeDefined();
      expect(generator.data.personal).toBeDefined();
      expect(generator.data.experience).toBeDefined();
    });

    test('should have all required methods', () => {
      expect(typeof generator.generateAdvancedResume).toBe('function');
      expect(typeof generator.generateHTML).toBe('function');
      expect(typeof generator.generateCSS).toBe('function');
    });
  });

  describe('Resume Generation', () => {
    test('should generate AI product resume', () => {
      const config = {
        type: 'ai_product',
        theme: 'tech',
        layout: 'modern',
        interactivity: true
      };

      const result = generator.generateAdvancedResume('ai_product', config);
      
      expect(result).toBeDefined();
      expect(result.html).toContain('<!DOCTYPE html>');
      expect(result.html).toContain(enhancedResumeData.personal.name);
      expect(result.analytics).toBeDefined();
    });

    test('should generate creative voice resume', () => {
      const config = {
        type: 'creative_voice',
        theme: 'creative',
        layout: 'creative',
        interactivity: true
      };

      const result = generator.generateAdvancedResume('creative_voice', config);
      
      expect(result).toBeDefined();
      expect(result.html).toContain('Voice Artist');
      expect(result.html).toContain('creative');
    });

    test('should handle different themes', () => {
      const themes = ['tech', 'creative', 'corporate', 'minimal', 'dark'];
      
      themes.forEach(theme => {
        const config = { type: 'general', theme };
        const result = generator.generateAdvancedResume('general', config);
        
        expect(result).toBeDefined();
        expect(result.html).toContain('html');
      });
    });

    test('should generate valid HTML structure', () => {
      const config = {
        type: 'general',
        theme: 'tech',
        layout: 'modern'
      };

      const result = generator.generateAdvancedResume('general', config);
      
      // Check for essential HTML elements
      expect(result.html).toMatch(/<html[^>]*>/);
      expect(result.html).toContain('<head>');
      expect(result.html).toContain('<body>');
      expect(result.html).toContain('<title>');
      expect(result.html).toContain('</html>');
    });
  });

  describe('Configuration Handling', () => {
    test('should apply preset configurations', () => {
      const presets = generator.getPresets();
      
      expect(presets).toBeDefined();
      expect(presets.ai_product_manager).toBeDefined();
      expect(presets.creative_professional).toBeDefined();
    });

    test('should merge custom configs with presets', () => {
      const customConfig = {
        theme: 'dark',
        animations: 'none'
      };

      const result = generator.generateAdvancedResume('ai_product', customConfig);
      expect(result).toBeDefined();
    });
  });

  describe('Analytics', () => {
    test('should calculate performance metrics', () => {
      const config = { type: 'general', theme: 'tech' };
      const result = generator.generateAdvancedResume('general', config);
      
      expect(result.analytics).toBeDefined();
      expect(typeof result.analytics.performance_score).toBe('number');
      expect(typeof result.analytics.accessibility_score).toBe('number');
      expect(typeof result.analytics.estimated_read_time).toBe('number');
    });

    test('should track generation history', () => {
      const config = { type: 'general', theme: 'tech' };
      generator.generateAdvancedResume('general', config);
      
      // Check if generation was tracked (implementation dependent)
      expect(generator.data.analytics).toBeDefined();
    });
  });

  describe('SEO and Metadata', () => {
    test('should include SEO metadata when enabled', () => {
      const config = {
        type: 'general',
        theme: 'tech',
        seoOptimized: true
      };

      const result = generator.generateAdvancedResume('general', config);
      
      expect(result.html).toContain('meta name="description"');
      expect(result.html).toContain('meta property="og:title"');
      expect(result.html).toContain('application/ld+json');
    });

    test('should generate structured data', () => {
      const config = { type: 'general', seoOptimized: true };
      const result = generator.generateAdvancedResume('general', config);
      
      expect(result.html).toContain('"@type": "Person"');
      expect(result.html).toContain(enhancedResumeData.personal.name);
    });
  });

  describe('Accessibility', () => {
    test('should include accessibility features', () => {
      const config = {
        type: 'general',
        accessibility: true
      };

      const result = generator.generateAdvancedResume('general', config);
      
      expect(result.html).toContain('aria-label');
      expect(result.html).toContain('role=');
      expect(result.html).toContain('alt=');
    });

    test('should support keyboard navigation', () => {
      const config = {
        type: 'general',
        interactivity: true,
        accessibility: true
      };

      const result = generator.generateAdvancedResume('general', config);
      
      expect(result.html).toContain('tabindex');
      expect(result.html).toContain('focus');
    });
  });

  describe('Export/Import', () => {
    test('should export resume data', () => {
      const exportData = generator.exportResumeData();
      
      expect(exportData).toBeDefined();
      expect(exportData.data).toBeDefined();
      expect(exportData.version).toBeDefined();
      expect(exportData.exported).toBeDefined();
    });

    test('should import resume data', () => {
      const exportData = generator.exportResumeData();
      const success = generator.importResumeData(exportData);
      
      expect(success).toBe(true);
    });
  });

  describe('Error Handling', () => {
    test('should handle invalid resume type', () => {
      expect(() => {
        generator.generateAdvancedResume('invalid_type', {});
      }).not.toThrow();
    });

    test('should handle missing configuration', () => {
      expect(() => {
        generator.generateAdvancedResume('general', null);
      }).not.toThrow();
    });

    test('should handle empty data gracefully', () => {
      const emptyGenerator = new AdvancedResumeGenerator({});
      
      expect(() => {
        emptyGenerator.generateAdvancedResume('general', {});
      }).not.toThrow();
    });
  });

  describe('Performance', () => {
    test('should generate resume within reasonable time', async () => {
      const startTime = Date.now();
      
      generator.generateAdvancedResume('general', {
        type: 'general',
        theme: 'tech'
      });
      
      const duration = Date.now() - startTime;
      expect(duration).toBeLessThan(5000); // 5 seconds max
    });

    test('should handle batch generation efficiently', () => {
      const types = ['ai_product', 'creative_voice', 'general'];
      const startTime = Date.now();
      
      types.forEach(type => {
        generator.generateAdvancedResume(type, { type, theme: 'tech' });
      });
      
      const duration = Date.now() - startTime;
      expect(duration).toBeLessThan(10000); // 10 seconds for batch
    });
  });

  describe('Responsive Design', () => {
    test('should include responsive CSS', () => {
      const config = { type: 'general', theme: 'tech' };
      const result = generator.generateAdvancedResume('general', config);
      
      expect(result.html).toContain('@media');
      expect(result.html).toContain('max-width');
      expect(result.html).toContain('grid-template-columns');
    });

    test('should support print styles', () => {
      const config = {
        type: 'general',
        printOptimized: true
      };

      const result = generator.generateAdvancedResume('general', config);
      
      expect(result.html).toContain('@media print');
      expect(result.html).toContain('page-break');
    });
  });
});
