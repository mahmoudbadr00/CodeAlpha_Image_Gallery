document.addEventListener('DOMContentLoaded', () => {
    const images = [
        {
            src: 'https://images.unsplash.com/photo-1456139333202-745e9029f0ef',
            title: 'Mountain Landscape',
            description: 'Breathtaking view of snow-capped mountains and a serene valley'
        },
        {
            src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
            title: 'Ocean Sunset',
            description: 'Dramatic sunset over a calm ocean with vibrant colors'
        },
        {
            src: 'https://images.unsplash.com/photo-1465652044861-81e32c824058',
            title: 'Forest Path',
            description: 'Mystical forest path with sunlight filtering through trees'
        },
        {
            src: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1',
            title: 'Starry Night',
            description: 'Clear night sky filled with countless stars over a mountain range'
        },
        {
            src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
            title: 'Nature Harmony',
            description: 'Peaceful landscape with lake, mountains, and lush greenery'
        },
        {
            src: 'https://images.unsplash.com/photo-1539768942893-daf53e448371',
            title: 'Influences of the past',
            description: 'Stories, desire and a vivid imagination attract people to this place.'
        },
        {
            src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
            title: 'Sea Landscape',
            description: 'The last night of a two week stay on the North Shore of Oahu, Hawaii'
        },
        {
            src: 'https://images.unsplash.com/photo-1502085671122-2d218cd434e6',
            title: 'Ireland',
            description: 'Also doubles as Luke Sky walker\'s retreat/pity palace in Star Wars'
        }
    ];

    const mainImage = document.getElementById('mainImage');
    const imageTitle = document.getElementById('imageTitle');
    const imageDescription = document.getElementById('imageDescription');
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    var head = document.getElementById('head');
    const autoplayBtn = document.createElement('button');
    autoplayBtn.classList.add('autoplay-btn');
    autoplayBtn.innerHTML = '<i class="fas fa-play"></i>';
    head.insertAdjacentElement('afterend',autoplayBtn);

    let currentIndex = 0;
    let autoplayInterval = null;
    let isAutoplayActive = false;

    function createThumbnails() {
        thumbnailContainer.innerHTML = '';
        images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.title;

            thumbnail.appendChild(img);
            thumbnail.addEventListener('click', () => {
                stopAutoplay();
                displayImage(index);
            });
            thumbnailContainer.appendChild(thumbnail);
        });
    }

    function displayImage(index) {
        currentIndex = index;
        const image = images[index];
        
        mainImage.src = image.src;
        mainImage.alt = image.title;
        imageTitle.textContent = image.title;
        imageDescription.textContent = image.description;

        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    function startAutoplay() {
        if (isAutoplayActive) return;
        
        isAutoplayActive = true;
        autoplayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            displayImage(currentIndex);
        }, 3000);
    }

    function stopAutoplay() {
        if (!isAutoplayActive) return;
        
        isAutoplayActive = false;
        autoplayBtn.innerHTML = '<i class="fas fa-play"></i>';
        
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    autoplayBtn.addEventListener('click', () => {
        isAutoplayActive ? stopAutoplay() : startAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoplay();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        displayImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        stopAutoplay();
        currentIndex = (currentIndex + 1) % images.length;
        displayImage(currentIndex);
    });

    createThumbnails();
    displayImage(0);
});