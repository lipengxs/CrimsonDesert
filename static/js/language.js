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
                'nav.privacy': 'Privacy Policy',
                'nav.terms': 'Terms of Service',
                'lang.en': 'English',
                'lang.zh': '中文',
                'lang.ja': '日本語'
            },
            'zh-CN': {
                'nav.home': '首页',
                'nav.news': '新闻',
                'nav.media': '媒体',
                'nav.guides': '攻略',
                'nav.privacy': '隐私政策',
                'nav.terms': '服务条款',
                'lang.en': 'English',
                'lang.zh': '中文',
                'lang.ja': '日本語'
            },
            'ja-JP': {
                'nav.home': 'ホーム',
                'nav.news': 'ニュース',
                'nav.media': 'メディア',
                'nav.guides': 'ガイド',
                'nav.privacy': 'プライバシーポリシー',
                'nav.terms': '利用規約',
                'lang.en': 'English',
                'lang.zh': '中文',
                'lang.ja': '日本語'
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
            // Update navigation
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = this.translate(key);
                if (translation && translation !== key) {
                    element.textContent = translation;
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

