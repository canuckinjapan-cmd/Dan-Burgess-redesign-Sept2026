window.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});
document.getElementById('year').textContent = new Date().getFullYear();
window.addEventListener('load', () => { document.getElementById('hero-content').classList.remove('opacity-0', 'translate-y-10'); });
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (isOpen) toggleMenu();
    const scrolled = window.scrollY > 50;
    if (scrolled) { navbar.classList.add('bg-dark-900/95', 'backdrop-blur-md', 'py-4', 'shadow-lg', 'border-b', 'border-white/5'); navbar.classList.remove('py-6'); scrollTopBtn.classList.remove('hidden'); scrollTopBtn.classList.add('flex'); }
    else { navbar.classList.remove('bg-dark-900/95', 'backdrop-blur-md', 'py-4', 'shadow-lg', 'border-b', 'border-white/5'); navbar.classList.add('py-6'); scrollTopBtn.classList.add('hidden'); scrollTopBtn.classList.remove('flex'); }
    document.getElementById('hero-bg').style.transform = `translateY(${window.scrollY * 0.15}px)`;
});
scrollTopBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
let isOpen = false;
function toggleMenu() {
    isOpen = !isOpen;
    const button = document.getElementById('menu-toggle');
    button.innerHTML = isOpen ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
    
    if (isOpen) { 
        mobileMenu.classList.remove('hidden'); 
    } else { 
        mobileMenu.classList.add('hidden'); 
    }
    lucide.createIcons();
}
menuToggle.addEventListener('click', toggleMenu);
document.querySelectorAll('.mobile-link').forEach(link => { link.addEventListener('click', () => { if (isOpen) toggleMenu(); }); });
const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.remove('opacity-0', 'translate-y-10'); observer.unobserve(entry.target); } }); }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = '送信中...';
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const targetUrl = "/api/contact";
            
            console.log(`Contact: Sending to ${targetUrl}`);
            
            const response = await fetch(targetUrl, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                alert('お問い合わせありがとうございます。送信が完了しました。');
                contactForm.reset();
            } else {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to send');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('エラーが発生しました: ' + error.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}
