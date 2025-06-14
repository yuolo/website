// Blog articles configuration
const blogArticles = [
    {
        id: 'intro-to-ai',
        title: 'Introduction to Artificial Intelligence',
        description: 'A beginner-friendly guide to understanding AI fundamentals and key concepts.',
        date: '2024-01-15',
        tags: ['AI', 'Machine Learning', 'Tutorial'],
        file: 'blog/intro-to-ai.md'
    },
    {
        id: 'python-for-research',
        title: 'Python for Research: Essential Libraries',
        description: 'Exploring the most important Python libraries for scientific research and data analysis.',
        date: '2024-01-10',
        tags: ['Python', 'Research', 'Data Science'],
        file: 'blog/python-for-research.md'
    },
    {
        id: 'research-methodology',
        title: 'Research Methodology Best Practices',
        description: 'Key principles and methodologies for conducting effective research.',
        date: '2024-01-05',
        tags: ['Research', 'Methodology', 'Academia'],
        file: 'blog/research-methodology.md'
    }
];

class BlogManager {
    constructor() {
        this.articles = blogArticles;
        this.currentView = 'list';
        
        this.init();
    }

    init() {
        document.addEventListener('componentsLoaded', () => {
            this.loadBlogArticles();
            this.setupEventListeners();
        });
    }

    setupEventListeners() {
        const backButton = document.getElementById('back-to-blog');
        if (backButton) {
            backButton.addEventListener('click', () => {
                this.showBlogList();
            });
        }
    }

    loadBlogArticles() {
        const container = document.getElementById('blog-articles');
        if (!container) return;

        // Sort articles by date (newest first)
        const sortedArticles = this.articles.sort((a, b) => new Date(b.date) - new Date(a.date));

        container.innerHTML = sortedArticles.map(article => `
            <article class="blog-card" data-article-id="${article.id}">
                <div class="blog-card-content">
                    <div class="blog-meta">
                        <span class="blog-date">${this.formatDate(article.date)}</span>
                        <div class="blog-tags">
                            ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <h2 class="blog-title">${article.title}</h2>
                    <p class="blog-description">${article.description}</p>
                    <button class="read-more-btn" onclick="blogManager.loadArticle('${article.id}')">
                        Read More →
                    </button>
                </div>
            </article>
        `).join('');
    }

    async loadArticle(articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (!article) return;

        const articleView = document.getElementById('article-view');
        const articleContent = document.getElementById('article-content');
        const blogArticles = document.getElementById('blog-articles');

        if (!articleView || !articleContent || !blogArticles) return;

        try {
            // Show loading state
            articleContent.innerHTML = '<div class="loading">Loading article...</div>';
            
            // Hide blog list, show article view
            blogArticles.style.display = 'none';
            articleView.style.display = 'block';
            
            // Fetch markdown content
            const response = await fetch(article.file);
            if (!response.ok) {
                throw new Error('Article not found');
            }
            
            const markdownContent = await response.text();
            
            // Convert markdown to HTML
            const htmlContent = marked.parse(markdownContent);
            
            // Create article HTML
            articleContent.innerHTML = `
                <header class="article-header">
                    <div class="article-meta">
                        <span class="article-date">${this.formatDate(article.date)}</span>
                        <div class="article-tags">
                            ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <h1 class="article-title">${article.title}</h1>
                </header>
                <div class="article-body">
                    ${htmlContent}
                </div>
            `;
            
            // Highlight code blocks
            if (typeof hljs !== 'undefined') {
                hljs.highlightAll();
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
            
        } catch (error) {
            articleContent.innerHTML = `
                <div class="error-message">
                    <h2>Article not found</h2>
                    <p>Sorry, the article you're looking for doesn't exist or couldn't be loaded.</p>
                </div>
            `;
        }
    }

    showBlogList() {
        const articleView = document.getElementById('article-view');
        const blogArticles = document.getElementById('blog-articles');
        
        if (articleView && blogArticles) {
            articleView.style.display = 'none';
            blogArticles.style.display = 'block';
        }
        
        window.scrollTo(0, 0);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Initialize blog manager
const blogManager = new BlogManager(); 