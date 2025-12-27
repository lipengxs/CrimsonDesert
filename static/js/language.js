// Crimson Desert - Language System
// Handles multi-language support (English, Chinese, Japanese)

(function() {
    'use strict';

    const LanguageManager = {
        currentLang: 'en-US',
        languagePacks: {
            'en-US': {},
            'zh-CN': {},
            'ja-JP': {}
        },
        languageUrls: {
            'en-US': 'static/js/language/languagepack_cd_global.en-us.js',
            'zh-CN': 'static/js/language/languagepack_cd_global.zh-cn.js',
            'ja-JP': 'static/js/language/languagepack_cd_global.ja-jp.js'
        },
        fallbackTranslations: {
            'en-US': {
                'nav.home': 'Home',
                'nav.news': 'News',
                'nav.media': 'Media',
                'nav.guides': 'Guides',
                'nav.characters': 'Characters',
                'nav.privacy': 'Privacy Policy',
                'nav.terms': 'Terms of Service',
                'lang.en': 'English',
                'lang.zh': '中文',
                'lang.ja': '日本語',
                'supported.languages.title': 'Supported Languages',
                'supported.languages.description': '<strong>Crimson Desert</strong> supports multiple languages including English, French, German, Spanish, Italian, Portuguese, Russian, Japanese, Chinese (Simplified & Traditional), and Korean, ensuring players worldwide can enjoy the full experience with proper localization. The comprehensive language support in <strong>Crimson Desert</strong> makes it accessible to a global audience, fostering an international community of open-world adventure enthusiasts who can fully immerse themselves in the epic tale of Kliff and the Greymanes.'
            },
            'zh-CN': {
                'nav.home': '首页',
                'nav.news': '新闻',
                'nav.media': '媒体',
                'nav.guides': '攻略',
                'nav.characters': '角色',
                'nav.privacy': '隐私政策',
                'nav.terms': '服务条款',
                'lang.en': 'English',
                'lang.zh': '中文',
                'lang.ja': '日本語',
                'supported.languages.title': '支持的语言',
                'supported.languages.description': '<strong>红色沙漠</strong>支持多种语言，包括英语、法语、德语、西班牙语、意大利语、葡萄牙语、俄语、日语、中文（简体与繁体）和韩语，确保全球玩家能够通过适当的本地化享受完整的游戏体验。<strong>红色沙漠</strong>的全面语言支持使其能够面向全球受众，培养一个国际化的开放世界冒险爱好者社区，让玩家能够完全沉浸在克里夫和灰鬃团的史诗故事中。'
            },
            'ja-JP': {
                'nav.home': 'ホーム',
                'nav.news': 'ニュース',
                'nav.media': 'メディア',
                'nav.guides': 'ガイド',
                'nav.characters': 'キャラクター',
                'nav.privacy': 'プライバシーポリシー',
                'nav.terms': '利用規約',
                'lang.en': 'English',
                'lang.zh': '中文',
                'lang.ja': '日本語',
                'supported.languages.title': 'サポート言語',
                'supported.languages.description': '<strong>クリムゾンデザート</strong>は、英語、フランス語、ドイツ語、スペイン語、イタリア語、ポルトガル語、ロシア語、日本語、中国語（簡体字・繁体字）、韓国語など、複数の言語をサポートしており、世界中のプレイヤーが適切なローカライゼーションで完全な体験を楽しめるようになっています。<strong>クリムゾンデザート</strong>の包括的な言語サポートにより、グローバルな視聴者にアクセス可能になり、クリフとグレイメインの壮大な物語に完全に没頭できるオープンワールドアドベンチャー愛好者の国際的なコミュニティを育成しています。'
            }
        },

        init: function() {
            // Detect language from URL parameter or localStorage
            const urlParams = new URLSearchParams(window.location.search);
            const langParam = urlParams.get('lang');
            const storedLang = localStorage.getItem('crimson-desert-lang');
            
            if (langParam && ['en-US', 'zh-CN', 'ja-JP'].includes(langParam)) {
                this.currentLang = langParam;
                localStorage.setItem('crimson-desert-lang', langParam);
            } else if (storedLang && ['en-US', 'zh-CN', 'ja-JP'].includes(storedLang)) {
                this.currentLang = storedLang;
            } else {
                // Detect browser language
                const browserLang = navigator.language || navigator.userLanguage;
                if (browserLang.startsWith('zh')) {
                    this.currentLang = 'zh-CN';
                } else if (browserLang.startsWith('ja')) {
                    this.currentLang = 'ja-JP';
                } else {
                    this.currentLang = 'en-US';
                }
            }

            this.updateLanguageSelector();
            this.applyLanguage();
        },

        loadLanguagePack: function(lang) {
            return new Promise((resolve, reject) => {
                if (this.languagePacks[lang] && Object.keys(this.languagePacks[lang]).length > 0) {
                    resolve(this.languagePacks[lang]);
                    return;
                }

                // Try to load from external URL
                const script = document.createElement('script');
                script.src = this.languageUrls[lang];
                script.charset = 'UTF-8';
                script.async = true;
                
                script.onload = () => {
                    // Extract language pack from BDWeb or pearlabyss global
                    if (window.BDWeb && window.BDWeb.Resource) {
                        this.languagePacks[lang] = window.BDWeb.Resource;
                    } else if (window.pearlabyss && window.pearlabyss.Resource) {
                        this.languagePacks[lang] = window.pearlabyss.Resource;
                    }
                    resolve(this.languagePacks[lang] || this.fallbackTranslations[lang]);
                };

                script.onerror = () => {
                    // Fallback to local translations
                    this.languagePacks[lang] = this.fallbackTranslations[lang];
                    resolve(this.languagePacks[lang]);
                };

                document.head.appendChild(script);
            });
        },

        getTranslation: function(key, lang) {
            const targetLang = lang || this.currentLang;
            const pack = this.languagePacks[targetLang] || this.fallbackTranslations[targetLang];
            return pack[key] || this.fallbackTranslations['en-US'][key] || key;
        },

        translate: function(key) {
            return this.getTranslation(key);
        },

        switchLanguage: function(lang) {
            if (!['en-US', 'zh-CN', 'ja-JP'].includes(lang)) {
                return;
            }

            this.currentLang = lang;
            localStorage.setItem('crimson-desert-lang', lang);
            
            // Update URL without reload
            const url = new URL(window.location);
            url.searchParams.set('lang', lang);
            window.history.pushState({}, '', url);

            this.loadLanguagePack(lang).then(() => {
                this.applyLanguage();
            });
        },

        updateLanguageSelector: function() {
            const selector = document.querySelector('.language-selector');
            if (selector) {
                const buttons = selector.querySelectorAll('button, a');
                buttons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.lang === this.currentLang) {
                        btn.classList.add('active');
                    }
                });
            }
        },

        applyLanguage: function() {
            // Update navigation and other elements
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = this.translate(key);
                if (translation && translation !== key) {
                    // Check if translation contains HTML tags
                    if (translation.includes('<') && translation.includes('>')) {
                        element.innerHTML = translation;
                    } else {
                        element.textContent = translation;
                    }
                }
            });

            // Update page title and meta if needed
            const titleElement = document.querySelector('title');
            if (titleElement && titleElement.dataset.i18n) {
                const titleKey = titleElement.dataset.i18n;
                const titleTranslation = this.translate(titleKey);
                if (titleTranslation && titleTranslation !== titleKey) {
                    titleElement.textContent = titleTranslation;
                }
            }

            // Update HTML lang attribute
            document.documentElement.lang = this.currentLang === 'zh-CN' ? 'zh-CN' : 
                                           this.currentLang === 'ja-JP' ? 'ja' : 'en';
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            LanguageManager.init();
        });
    } else {
        LanguageManager.init();
    }

    // Expose to global scope
    window.CrimsonDesertLang = LanguageManager;

    // Language selector click handlers
    document.addEventListener('click', (e) => {
        const langButton = e.target.closest('[data-lang]');
        if (langButton) {
            e.preventDefault();
            const lang = langButton.dataset.lang;
            LanguageManager.switchLanguage(lang);
        }
    });
})();

