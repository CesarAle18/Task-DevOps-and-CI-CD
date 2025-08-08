const fs = require('fs');
const { JSDOM } = require('jsdom');
const { describe } = require('yargs');

test('HTML is valid', () => {
    const html = fs.readFileSync('index.html', 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    expect(html).toContain('<!DOCTYPE html');
    expect(document.querySelector('title')).not.toBeNull();
    expect(document.querySelector('h1')).not.toBeNull();
});

describe('HTML Structure Tests', () => {
    let html;
    let document;

    beforeAll(() => {
        html = fs.readFileSync('index.html', 'utf8');
        const dom = new JSDOM(html);
        document = dom.window.document;
    });

    test('Should have valid HTML5 structure', () => {
        expect(html).toMatch(/<!DOCTYPE html>/i);
        expect(html).toMatch(/<html[^>]*>/i);
        expect(html).toMatch(/<head>/i);
        expect(html).toMatch(/<body>/i);
        expect(html).toMatch(/<\/html>/i);
    });

    test('Should have required meta tags', () => {
        const charset = document.querySelector('meta[charset]');
        const viewport = document.querySelector('meta[name="viewport"]');

        expect(charset).not.toBeNull();
        expect(charset.getAttribute('charset')).toBe('UTF-8');
        expect(viewport).not.toBeNull();
        expect(viewport.getAttribute('content')).toContain('width=device-width');
    });

    test('Should have correct title', () => {
        const title = document.querySelector('title');
        expect(title).not.toBeNull();
        expect(title.textContent).toBe('DevOps and CI CD');
    });

    test('Should have main heading', () => {
        const h1 = document.querySelector('h1');
        expect(h1).not.toBeNull();
        expect(h1.textContent).toBe('Automatic deployment to GitHub Pages');
    });

    test('Should have description paragraph', () => {
        const paragraph = document.querySelector('p');
        expect(paragraph).not.toBeNull();
        expect(paragraph.textContent).toBe('Simple HTML via CI/CD');
    });

    test('Should have valid lang attribute', () => {
        const htmlElement = document.querySelector('html');
        expect(htmlElement.getAttribute('lang')).toBe('en');
    });

    test('Should not have broken elements', () => {
        const allElements = document.querySelectorAll('*');
        expect(allElements.length).toBeGreaterThan(0);

        
        expect(document.querySelector('head')).not.toBeNull();
        expect(document.querySelector('body')).not.toBeNull();
    });
});

describe('Content Validation Tests', () => {
    let html;

    beforeAll(() => {
        html = fs.readFileSync('index.html', 'utf8');
    });

    test('Should contain CI/CD related content', () => {
        expect(html).toMatch(/CI.?CD/i);
        expect(html).toMatch(/GitHub Pages/i);
        expect(html).toMatch(/deployment/i);
    });

    test('Should have proper encoding', () => {
        expect(html).toContain('UTF-8');
    });

    test('Should be responsive ready', () => {
        expect(html).toContain('width=device-width');
        expect(html).toContain('initial-scale=1.0');
    });

    test('File should exist and be readable', () => {
        expect(fs.existsSync('index.html')).toBe(true);
        expect(html.length).toBeGreaterThan(0);
    });
});