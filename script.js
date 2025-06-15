class PrivacyPolicy {
    constructor() {
        this.currentLang = 'zh';
        this.appName = '';
        this.init();
    }

    init() {
        this.bindEvents();
        this.getLanguageFromURL();
        this.getAppNameFromURL();
        this.updateAppName();
        this.updateDate();
    }

    bindEvents() {
        const zhBtn = document.getElementById('zh-btn');
        const enBtn = document.getElementById('en-btn');

        zhBtn.addEventListener('click', () => this.switchLanguage('zh'));
        enBtn.addEventListener('click', () => this.switchLanguage('en'));
    }

    getLanguageFromURL() {
        // 从URL参数获取语言设置
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang') || urlParams.get('language');
        
        if (langParam) {
            const language = langParam.toLowerCase();
            if (language === 'en' || language === 'english') {
                this.currentLang = 'en';
            } else if (language === 'zh' || language === 'chinese' || language === 'zh-cn') {
                this.currentLang = 'zh';
            }
        } else {
            // 如果没有URL参数，尝试从JavaScript调用获取
            const jsLang = this.getLanguageFromJS();
            if (jsLang) {
                this.currentLang = jsLang;
            }
        }
        
        // 应用语言设置
        this.switchLanguage(this.currentLang);
    }

    getLanguageFromJS() {
        // 从全局变量或其他JavaScript设置获取语言
        const globalLang = window.defaultLanguage || window.lang;
        if (globalLang) {
            const language = globalLang.toLowerCase();
            if (language === 'en' || language === 'english') {
                return 'en';
            } else if (language === 'zh' || language === 'chinese' || language === 'zh-cn') {
                return 'zh';
            }
        }
        return null;
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        
        // 更新按钮状态
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`${lang}-btn`).classList.add('active');
        
        // 切换内容
        document.querySelectorAll('.content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${lang}-content`).classList.add('active');
        
        // 更新页面标题
        document.title = lang === 'zh' ? '隐私策略 - Privacy Policy' : 'Privacy Policy - 隐私策略';
    }

    getAppNameFromURL() {
        // 从URL参数获取应用名
        const urlParams = new URLSearchParams(window.location.search);
        const appNameParam = urlParams.get('app') || urlParams.get('appName');
        
        if (appNameParam) {
            this.appName = decodeURIComponent(appNameParam);
        } else {
            // 如果没有URL参数，尝试从JavaScript调用获取
            this.appName = this.getAppNameFromJS();
        }
        
        // 如果仍然没有应用名，使用默认值
        if (!this.appName) {
            this.appName = '示例应用';
        }
    }

    getAppNameFromJS() {
        // 这个方法可以被外部调用来设置应用名
        // 例如：privacyPolicy.setAppName('我的应用');
        return window.appName || '';
    }

    setAppName(name) {
        this.appName = name;
        this.updateAppName();
    }

    setLanguage(lang) {
        // 新增：设置语言的方法
        const language = lang.toLowerCase();
        if (language === 'en' || language === 'english') {
            this.switchLanguage('en');
        } else if (language === 'zh' || language === 'chinese' || language === 'zh-cn') {
            this.switchLanguage('zh');
        }
    }

    updateAppName() {
        const zhElement = document.getElementById('app-name-zh');
        const enElement = document.getElementById('app-name-en');
        
        if (zhElement) {
            zhElement.textContent = this.appName;
        }
        if (enElement) {
            enElement.textContent = this.appName;
        }
    }

    updateDate() {
        const now = new Date();
        const zhDate = now.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const enDate = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const zhDateElement = document.getElementById('update-date-zh');
        const enDateElement = document.getElementById('update-date-en');
        
        if (zhDateElement) {
            zhDateElement.textContent = zhDate;
        }
        if (enDateElement) {
            enDateElement.textContent = enDate;
        }
    }
}

// 初始化隐私策略页面
const privacyPolicy = new PrivacyPolicy();

// 全局函数，供外部调用
function setAppName(name) {
    privacyPolicy.setAppName(name);
}

function setLanguage(lang) {
    privacyPolicy.setLanguage(lang);
}

// 示例用法：
// 1. 通过URL参数设置应用名和语言：
//    privacy-policy.html?app=我的应用&lang=zh
//    privacy-policy.html?appName=MyApp&language=en
// 2. 通过JavaScript调用：
//    setAppName('我的应用');
//    setLanguage('en');
// 3. 通过全局变量：
//    window.appName = '我的应用';
//    window.defaultLanguage = 'en';