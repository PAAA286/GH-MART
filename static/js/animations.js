// Homepage animations with GSAP
document.addEventListener('DOMContentLoaded', function() {
    // Only run on homepage
    if (document.querySelector('.hero')) {
        // Hero section animation
        gsap.to('.hero h1', {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power2.out'
        });
        
        gsap.to('.hero p', {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.6,
            ease: 'power2.out'
        });
        
        gsap.to('.hero-btn', {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.9,
            ease: 'power2.out'
        });
        
        // Animate product cards on scroll
        gsap.utils.toArray('.product-card').forEach(card => {
            gsap.fromTo(card, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
        
        // Parallax effect on hero section
        gsap.to('.hero', {
            backgroundPosition: '50% 100px',
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }
    
    // Add animation to all buttons
    gsap.utils.toArray('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, { scale: 1.05, duration: 0.2 });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { scale: 1, duration: 0.2 });
        });
    });
});