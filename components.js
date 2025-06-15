// Component loader for reusable elements
class ComponentLoader {
    static async loadComponent(componentName, targetSelector) {
        try {
            const response = await fetch(`components/${componentName}.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                targetElement.innerHTML = html;
            }
            return true;
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
            // Fallback: load inline components
            this.loadInlineComponents();
            return false;
        }
    }

    static loadInlineComponents() {
        // Fallback navbar
        const navbarPlaceholder = document.querySelector('#navbar-placeholder');
        if (navbarPlaceholder && !navbarPlaceholder.innerHTML.trim()) {
            navbarPlaceholder.innerHTML = `
                <nav class="navbar">
                    <div class="nav-container">
                        <div class="nav-logo">
                            <a href="index.html">Vladimir Gurlev</a>
                        </div>
                        <ul class="nav-menu">
                            <li class="nav-item">
                                <a href="index.html" class="nav-link">Home</a>
                            </li>
                            <li class="nav-item">
                                <a href="about.html" class="nav-link">About</a>
                            </li>
                            <li class="nav-item">
                                <a href="research.html" class="nav-link">Research</a>
                            </li>
                            <li class="nav-item">
                                <a href="projects.html" class="nav-link">Projects</a>
                            </li>
                            <li class="nav-item">
                                <a href="contact.html" class="nav-link">Contact</a>
                            </li>
                        </ul>
                        <div class="hamburger">
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                        </div>
                    </div>
                </nav>
            `;
        }

        // Fallback footer
        const footerPlaceholder = document.querySelector('#footer-placeholder');
        if (footerPlaceholder && !footerPlaceholder.innerHTML.trim()) {
            footerPlaceholder.innerHTML = `
                <footer class="footer">
                    <div class="footer-content">
                        <p>&copy; 2025 Vladimir Gurlev. All rights reserved.</p>
                        <div class="social-links">
                            <a href="#" class="social-link">LinkedIn</a>
                            <a href="#" class="social-link">GitHub</a>
                            <a href="#" class="social-link">Scholar</a>
                        </div>
                    </div>
                </footer>
            `;
        }
    }

    static async loadAllComponents() {
        // Load inline components immediately as fallback
        this.loadInlineComponents();
        
        try {
            // Try to load components from files (will override inline ones if successful)
            await this.loadComponent('navbar', '#navbar-placeholder');
            await this.loadComponent('footer', '#footer-placeholder');
        } catch (error) {
            // If fetch fails, inline components are already loaded
            console.log('Using inline components fallback');
        }
        
        // Update active navigation link after navbar is loaded
        setTimeout(() => {
            this.updateActiveNavLink();
            // Initialize mobile navigation after components load
            if (typeof initMobileNavigation === 'function') {
                initMobileNavigation();
            }
            // Notify that components are loaded
            document.dispatchEvent(new CustomEvent('componentsLoaded'));
        }, 50); // Reduced delay for faster initialization
    }

    static updateActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    ComponentLoader.loadAllComponents();
});

// Re-export functions for backward compatibility
window.ComponentLoader = ComponentLoader; 