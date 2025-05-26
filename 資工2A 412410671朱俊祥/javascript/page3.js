// page3 專屬 JavaScript
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page 3 loaded');
    
    // 分類按鈕功能
    const categoryButtons = document.querySelectorAll('.category-btn');
    const foodCards = document.querySelectorAll('.food-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按鈕的 active 狀態
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // 添加當前按鈕的 active 狀態
            button.classList.add('active');

            const category = button.dataset.category;

            // 過濾顯示對應類別的卡片
            foodCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    // 重新觸發動畫
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 10);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('visible');
                }
            });
        });
    });

    // 卡片滾動動畫
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    foodCards.forEach(card => {
        observer.observe(card);
    });

    // 初始化所有卡片為可見
    setTimeout(() => {
        foodCards.forEach(card => {
            card.classList.add('visible');
        });
    }, 100);
}); 