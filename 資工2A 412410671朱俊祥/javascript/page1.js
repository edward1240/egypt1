document.addEventListener('DOMContentLoaded', function() {
    // 神祇卡片懸停效果
    const godCards = document.querySelectorAll('.god-card');
    
    godCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 8px 16px rgba(139, 69, 19, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        });
    });

    // 故事卡片的漸入效果
    const storyCards = document.querySelectorAll('.story-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });

    storyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = index % 2 === 0 ? 'translateX(-20px)' : 'translateX(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // 創世神話文字的打字機效果
    const mythStory = document.querySelector('.myth-story');
    if (mythStory) {
        mythStory.style.opacity = '0';
        mythStory.style.transform = 'translateY(20px)';
        mythStory.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        const storyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        storyObserver.observe(mythStory);
    }

    // 點擊神祇卡片時的放大效果
    const godImages = document.querySelectorAll('.god-image');
    let currentZoom = false;
    let overlay = null;

    godImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault(); // 防止連結跳轉
            if (!currentZoom) {
                // 創建遮罩層
                overlay = document.createElement('div');
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                overlay.style.zIndex = '1000';
                overlay.style.display = 'flex';
                overlay.style.justifyContent = 'center';
                overlay.style.alignItems = 'center';
                overlay.style.cursor = 'pointer';

                // 創建放大的圖片
                const zoomedImg = this.cloneNode();
                zoomedImg.style.maxWidth = '90%';
                zoomedImg.style.maxHeight = '90vh';
                zoomedImg.style.objectFit = 'contain';
                zoomedImg.style.transform = 'scale(0.5)';
                zoomedImg.style.transition = 'transform 0.3s ease';

                overlay.appendChild(zoomedImg);
                document.body.appendChild(overlay);

                // 添加動畫效果
                setTimeout(() => {
                    zoomedImg.style.transform = 'scale(1)';
                }, 50);

                currentZoom = true;

                // 點擊遮罩層關閉
                overlay.addEventListener('click', function() {
                    zoomedImg.style.transform = 'scale(0.5)';
                    setTimeout(() => {
                        document.body.removeChild(overlay);
                        currentZoom = false;
                    }, 300);
                });
            }
        });
    });
}); 