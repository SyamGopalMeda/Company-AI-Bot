const puppeteer = require('puppeteer');
const { URL } = require('url');

let browserInstance = null;

async function getBrowser() {
    if (!browserInstance) {
        browserInstance = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }
    return browserInstance;
}

async function scrapeSinglePageFallback(targetUrl) {
    try {
        console.log(`Using fallback fetch for ${targetUrl}`);
        const response = await fetch(targetUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        
        const links = [];
        const linkRegex = /<a[^>]+href=["']([^"']+)["']/gi;
        let match;
        while ((match = linkRegex.exec(html)) !== null) {
            links.push(match[1]);
        }

        // Extremely simple HTML to text conversion for the fallback
        let textOutput = `Page Title: ${targetUrl}\n\n`;
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        const contentHtml = bodyMatch ? bodyMatch[1] : html;
        
        const cleanText = contentHtml
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
            .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
            .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
            
        textOutput += cleanText;
        return { text: textOutput, links };
    } catch (err) {
        console.error(`Fallback scraping failed for ${targetUrl}:`, err.message);
        return { text: '', links: [] };
    }
}

async function scrapeSinglePage(targetUrl) {
    let page = null;
    try {
        const browser = await getBrowser();
        page = await browser.newPage();
        
        // Disable images and CSS for faster scraping
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
                req.abort();
            } else {
                req.continue();
            }
        });

        await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 20000 });

        const extractedData = await page.evaluate(() => {
            const links = [];
            document.querySelectorAll('a').forEach(el => {
                if (el.href) links.push(el.href);
            });

            // Remove noise
            document.querySelectorAll('script, style, nav, footer, noscript, iframe, header').forEach(el => el.remove());

            let pageTitle = document.title.trim();
            let textOutput = `Page Title: ${pageTitle}\n\n`;

            function walkDOM(node) {
                if (node.nodeType === 3) { // Text node
                    const text = node.nodeValue.replace(/\s+/g, ' ').trim();
                    if (text.length > 3) {
                        const parentTag = (node.parentNode ? node.parentNode.nodeName.toLowerCase() : '');
                        if (parentTag.startsWith('h')) {
                            textOutput += `\n[HEADING] ${text}\n`;
                        } else if (parentTag === 'li') {
                            textOutput += `- ${text}\n`;
                        } else {
                            textOutput += `${text}\n`;
                        }
                    }
                } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
                    for (let i = 0; i < node.childNodes.length; i++) {
                        walkDOM(node.childNodes[i]);
                    }
                }
            }

            walkDOM(document.body);
            return { text: textOutput, links };
        });

        await page.close();
        return extractedData;
    } catch (error) {
        console.error(`Puppeteer failed for ${targetUrl}, trying fallback...`, error.message);
        if (page) await page.close().catch(() => {});
        return await scrapeSinglePageFallback(targetUrl);
    }
}

async function crawlWebsite(startUrl, maxPages = 15, progressCallback = null) {
    const visited = new Set();
    const queue = [startUrl];
    let combinedText = '';
    
    let baseUrl;
    try {
        baseUrl = new URL(startUrl).origin;
    } catch (e) {
        throw new Error("Invalid URL provided");
    }

    while (queue.length > 0 && visited.size < maxPages) {
        const currentUrl = queue.shift();
        const normalizedUrl = currentUrl.split('#')[0];
        
        if (visited.has(normalizedUrl)) continue;
        visited.add(normalizedUrl);

        if (progressCallback) {
            progressCallback({ 
                status: 'scraping', 
                currentUrl: normalizedUrl,
                pagesCrawled: visited.size,
                maxPages: maxPages,
                queueLength: queue.length
            });
        }

        const { text, links } = await scrapeSinglePage(normalizedUrl);
        
        if (text) {
            combinedText += `\n\n--- Content from ${normalizedUrl} ---\n` + text;
        }

        for (let href of links) {
            try {
                const resolvedUrl = new URL(href, normalizedUrl).href;
                const cleanUrl = resolvedUrl.split('#')[0];
                
                if (cleanUrl.startsWith(baseUrl) && !visited.has(cleanUrl) && !queue.includes(cleanUrl)) {
                    if (!cleanUrl.match(/\.(pdf|jpg|jpeg|png|gif|svg|mp4|zip)$/i)) {
                        queue.push(cleanUrl);
                    }
                }
            } catch (e) {}
        }
    }
    
    if (progressCallback) {
        progressCallback({ 
            status: 'completed',
            pagesCrawled: visited.size,
            maxPages: maxPages
        });
    }

    // Cleanup browser instance
    if (browserInstance) {
        await browserInstance.close();
        browserInstance = null;
    }

    return combinedText;
}

module.exports = { crawlWebsite };
