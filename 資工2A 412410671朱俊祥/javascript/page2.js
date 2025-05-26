// page2 專屬 JavaScript
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page 2 loaded');
    
    // 獲取所有區域連結和區域內容
    const regionLinks = document.querySelectorAll('.region-link');
    const regionSections = document.querySelectorAll('.region-section');

    // 為每個區域連結添加點擊事件
    regionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 移除所有活動狀態
            regionLinks.forEach(l => l.classList.remove('active'));
            regionSections.forEach(s => s.classList.remove('active'));
            
            // 添加新的活動狀態
            link.classList.add('active');
            const targetId = link.getAttribute('href').slice(1);
            document.getElementById(targetId).classList.add('active');
            
            // 平滑滾動到目標區域
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // 視差滾動效果
    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('.hero-section');
        const scrolled = window.pageYOffset;
        heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });

    // 氣候卡片動畫
    const cards = document.querySelectorAll('.climate-card');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
}); 