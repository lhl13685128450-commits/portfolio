document.addEventListener('DOMContentLoaded', () => {
    // 1. 初始化 Lucide 图标 (统一线性美学)
    lucide.createIcons();

    // 2. 导航栏滚动效果
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });

    // 3. 暗色模式切换与本地存储
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    const updateIcons = (isDark) => {
        document.getElementById('sun-icon').style.display = isDark ? 'none' : 'block';
        document.getElementById('moon-icon').style.display = isDark ? 'block' : 'none';
    };

    themeBtn.addEventListener('click', () => {
        const isDark = html.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateIcons(!isDark);
    });

    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateIcons(savedTheme === 'dark');

    // 4. GSAP 滚动入场动画
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
        });
    });
});