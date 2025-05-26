document.addEventListener('DOMContentLoaded', function() {
    // 滾動時的導航欄效果
    let nav = document.querySelector('nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加陰影效果
        if (scrollTop > 50) {
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });

    // 特色區塊的動畫效果
    const featureItems = document.querySelectorAll('.feature-item');
    
    // 使用 Intersection Observer 監測元素是否進入視窗
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // 為每個特色區塊添加初始樣式和觀察者
    featureItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

   
}); 