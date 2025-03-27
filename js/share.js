class SocialShare {
    constructor() {
        this.initializeShareButtons();
    }

    initializeShareButtons() {
        document.querySelectorAll('.share-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const platform = e.target.dataset.platform;
                const url = window.location.href;
                const title = document.title;
                
                this.share(platform, url, title);
            });
        });
    }

    share(platform, url, title) {
        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            kakao: () => {
                Kakao.Link.sendDefault({
                    objectType: 'feed',
                    content: {
                        title: title,
                        description: '체험단 참여하기',
                        imageUrl: 'IMAGE_URL',
                        link: {
                            mobileWebUrl: url,
                            webUrl: url
                        }
                    }
                });
            }
        };

        if (typeof shareUrls[platform] === 'function') {
            shareUrls[platform]();
        } else {
            window.open(shareUrls[platform], '_blank');
        }
    }
} 