<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="3.0">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
            <head>
                <title>
                    <xsl:value-of select="/rss/channel/title"/>
                    Web Feed
                </title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
                <style type="text/css">
                    *, *::before, *::after {
                      box-sizing: border-box;
                      margin: 0;
                      padding: 0;
                    }

                    :root {
                      --bg-primary: #ffffff;
                      --bg-secondary: #f8f9fa;
                      --text-primary: #2d3748;
                      --text-secondary: #4a5568;
                      --accent-primary: #3182ce;
                      --accent-secondary: #4299e1;
                      --border-color: #e2e8f0;
                      --header-border: #edf2f7;
                      --code-bg: #f7fafc;
                      --alert-bg: #fff5b1;
                      --alert-border: #f9c513;
                      --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
                      --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
                      --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);

                      --space-1: 0.25rem;
                      --space-2: 0.5rem;
                      --space-3: 1rem;
                      --space-4: 1.5rem;
                      --space-5: 2rem;

                      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                      --line-height-tight: 1.25;
                      --line-height-relaxed: 1.625;
                    }

                    [data-theme="dark"] {
                      --bg-primary: #1a202c;
                      --bg-secondary: #2d3748;
                      --text-primary: #f7fafc;
                      --text-secondary: #e2e8f0;
                      --accent-primary: #63b3ed;
                      --accent-secondary: #90cdf4;
                      --border-color: #4a5568;
                      --header-border: #2d3748;
                      --code-bg: #2d3748;
                      --alert-bg: #744210;
                      --alert-border: #d69e2e;
                      --shadow-sm: 0 1px 3px rgba(0,0,0,0.5);
                      --shadow-md: 0 4px 6px rgba(0,0,0,0.4);
                      --shadow-lg: 0 10px 15px rgba(0,0,0,0.4);
                    }

                    body {
                      background-color: var(--bg-primary);
                      color: var(--text-primary);
                      font-family: var(--font-sans);
                      line-height: var(--line-height-relaxed);
                      transition: background-color 0.3s ease, color 0.3s ease;
                    }

                    h1, h2, h3, h4, h5, h6 {
                      color: var(--text-primary);
                      line-height: var(--line-height-tight);
                      margin-bottom: var(--space-3);
                    }

                    h1 {
                      font-size: 2.25rem;
                      font-weight: 700;
                    }

                    h2 {
                      font-size: 1.8rem;
                      font-weight: 600;
                      border-bottom: 2px solid var(--header-border);
                      padding-bottom: var(--space-2);
                    }

                    h3 {
                      font-size: 1.5rem;
                      font-weight: 600;
                    }

                    p {
                      margin-bottom: var(--space-3);
                      color: var(--text-secondary);
                    }

                    a {
                      color: var(--accent-primary);
                      text-decoration: none;
                      transition: color 0.2s ease;
                    }

                    a:hover {
                      color: var(--accent-secondary);
                      text-decoration: underline;
                    }

                    .container-md {
                      max-width: 768px;
                      margin: 24px auto 0 auto;
                      padding: 0 var(--space-4);
                    }

                    .feed-item {
                      background-color: var(--bg-secondary);
                      border-radius: 0.5rem;
                      padding: var(--space-4);
                      margin-bottom: var(--space-4);
                      box-shadow: var(--shadow-sm);
                      transition: transform 0.2s ease, box-shadow 0.2s ease;
                    }

                    .feed-item:hover {
                      transform: translateY(-2px);
                      box-shadow: var(--shadow-md);
                    }

                    .alert {
                      background-color: var(--alert-bg);
                      border: 1px solid var(--alert-border);
                      border-radius: 0.5rem;
                      padding: var(--space-3);
                      margin-bottom: var(--space-4);
                    }

                    .theme-switch {
                      position: fixed;
                      top: var(--space-4);
                      right: var(--space-4);
                      background-color: var(--bg-secondary);
                      border: 2px solid var(--border-color);
                      border-radius: 2rem;
                      padding: var(--space-2) var(--space-3);
                      cursor: pointer;
                      display: flex;
                      align-items: center;
                      gap: var(--space-2);
                      font-size: 1.1rem;
                      box-shadow: var(--shadow-md);
                      transition: all 0.2s ease;
                    }

                    .theme-switch:hover {
                      transform: translateY(-2px);
                      box-shadow: var(--shadow-lg);
                    }

                    #theme-text {
                      color: var(--text-secondary);
                    }

                    .site-header {
                      padding: var(--space-5) 0;
                      text-align: center;
                      border-bottom: 1px solid var(--border-color);
                      margin-bottom: var(--space-5);
                    }

                    .site-title {
                      font-size: 2.5rem;
                      margin-bottom: var(--space-2);
                    }

                    .site-description {
                      color: var(--text-secondary);
                      font-size: 1.2rem;
                      max-width: 600px;
                      margin: 0 auto var(--space-4);
                    }

                    .rss-items {
                      display: grid;
                      gap: var(--space-4);
                    }

                    .item-meta {
                      display: flex;
                      align-items: center;
                      gap: var(--space-2);
                      color: var(--text-secondary);
                      font-size: 0.9rem;
                      margin-top: var(--space-2);
                    }

                    .pr-2 {
                      padding-right: var(--space-2);
                    }

                    @media (max-width: 640px) {
                      :root {
                        --space-4: 1rem;
                        --space-5: 1.5rem;
                      }

                      h1 { font-size: 1.8rem; }
                      h2 { font-size: 1.5rem; }
                      h3 { font-size: 1.2rem; }

                      .container-md {
                        padding: 0 var(--space-3);
                      }

                      .theme-switch {
                        top: var(--space-3);
                        right: var(--space-3);
                      }
                    }
                </style>
                <script>
                    function toggleTheme() {
                        const html = document.documentElement;
                        const currentTheme = html.getAttribute('data-theme');
                        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

                        html.setAttribute('data-theme', newTheme);
                        localStorage.setItem('theme', newTheme);

                        const icon = document.getElementById('theme-icon');
                        const text = document.getElementById('theme-text');

                        if (newTheme === 'dark') {
                            icon.textContent = '🌙';
                            text.textContent = 'Dark';
                        } else {
                            icon.textContent = '☀️';
                            text.textContent = 'Light';
                        }
                    }

                    document.addEventListener('DOMContentLoaded', () => {
                        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
                        document.documentElement.setAttribute('data-theme', savedTheme);

                        const icon = document.getElementById('theme-icon');
                        const text = document.getElementById('theme-text');

                        if (savedTheme === 'dark') {
                            icon.textContent = '🌙';
                            text.textContent = 'Dark';
                        } else {
                            icon.textContent = '☀️';
                            text.textContent = 'Light';
                        }
                    });
                </script>
            </head>
            <body>
                <button onclick="toggleTheme()" class="theme-switch">
                    <span id="theme-icon">☀️</span>
                    <span id="theme-text">Light</span>
                </button>

                <div class="container-md">
                    <nav class="alert">
                        <p>
                            <strong>This is a web feed,</strong>
                            also known as an RSS feed. <strong>Subscribe</strong> by copying the URL from the address
                            bar into your newsreader.
                        </p>
                        <p style="margin-bottom: 0;">
                            Visit <a href="https://aboutfeeds.com">About Feeds</a> to get started with newsreaders and
                            subscribing. It's free.
                        </p>
                    </nav>

                    <header class="site-header">
                        <h1 class="site-title">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                 style="vertical-align: text-bottom; width: 1.2em; height: 1.2em;" class="pr-2"
                                 id="RSSicon" viewBox="0 0 256 256">
                                <defs>
                                    <linearGradient x1="0.085" y1="0.085" x2="0.915" y2="0.915" id="RSSg">
                                        <stop offset="0.0" stop-color="#E3702D"/>
                                        <stop offset="0.1071" stop-color="#EA7D31"/>
                                        <stop offset="0.3503" stop-color="#F69537"/>
                                        <stop offset="0.5" stop-color="#FB9E3A"/>
                                        <stop offset="0.7016" stop-color="#EA7C31"/>
                                        <stop offset="0.8866" stop-color="#DE642B"/>
                                        <stop offset="1.0" stop-color="#D95B29"/>
                                    </linearGradient>
                                </defs>
                                <rect width="256" height="256" rx="55" ry="55" x="0" y="0" fill="#CC5D15"/>
                                <rect width="246" height="246" rx="50" ry="50" x="5" y="5" fill="#F49C52"/>
                                <rect width="236" height="236" rx="47" ry="47" x="10" y="10" fill="url(#RSSg)"/>
                                <circle cx="68" cy="189" r="24" fill="#FFF"/>
                                <path d="M160 213h-34a82 82 0 0 0 -82 -82v-34a116 116 0 0 1 116 116z" fill="#FFF"/>
                                <path d="M184 213A140 140 0 0 0 44 73 V 38a175 175 0 0 1 175 175z" fill="#FFF"/>
                            </svg>
                            <xsl:value-of select="/rss/channel/title"/>
                        </h1>
                        <p class="site-description">
                            <xsl:value-of select="/rss/channel/description"/>
                        </p>
                        <a href="{/rss/channel/link}" class="btn" target="_blank">Visit Website &#x2192;</a>
                    </header>

                    <main>
                        <h2>Recent Items</h2>
                        <div class="rss-items">
                            <xsl:for-each select="/rss/channel/item">
                                <article class="feed-item">
                                    <h3>
                                        <a href="{link}" target="_blank">
                                            <xsl:value-of select="title"/>
                                        </a>
                                    </h3>
                                    <div class="item-meta">
                                        <span>📅</span>
                                        <time>
                                            <xsl:value-of select="pubDate"/>
                                        </time>
                                    </div>
                                </article>
                            </xsl:for-each>
                        </div>
                    </main>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
