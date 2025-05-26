// page4 專屬 JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.monument-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // 更新輪播狀態
    function updateSlides(newIndex) {
        // 移除所有 active 類
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // 處理邊界情況
        if (newIndex >= totalSlides) {
            currentSlide = 0;
        } else if (newIndex < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = newIndex;
        }

        // 添加新的 active 類
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // 下一張幻燈片
    function nextSlide() {
        updateSlides(currentSlide + 1);
    }

    // 上一張幻燈片
    function prevSlide() {
        updateSlides(currentSlide - 1);
    }

    // 按鈕事件監聽器
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // 導航點點擊事件
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateSlides(index);
            resetAutoPlay();
        });
    });

    // 鍵盤導航
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoPlay();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoPlay();
        }
    });

    // 自動播放
    let autoPlayTimer;

    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, 5000); // 每5秒切換一次
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    // 滑動支援
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // 最小滑動距離
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
            resetAutoPlay();
        }
    }

    // 初始化自動播放
    startAutoPlay();

    // 當頁面不可見時暫停自動播放
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(autoPlayTimer);
        } else {
            startAutoPlay();
        }
    });
}); 