class ContactPage {
    constructor() {
        this.currentLang = 'zh';
        this.appName = '';
        this.contactEmail = 'support@example.com';
        this.init();
    }

    init() {
        this.bindEvents();
        this.getLanguageFromURL();
        this.getAppNameFromURL();
        this.getContactEmailFromURL();
        this.updateAppName();
        this.updateContactEmail();
    }

    bindEvents() {
        const zhBtn = document.getElementById('zh-btn');
        const enBtn = document.getElementById('en-btn');

        zhBtn.addEventListener('click', () => this.switchLanguage('zh'));
        enBtn.addEventListener('click', () => this.switchLanguage('en'));
    }

    getLanguageFromURL() {
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
            const jsLang = this.getLanguageFromJS();
            if (jsLang) {
                this.currentLang = jsLang;
            }
        }
        
        this.switchLanguage(this.currentLang);
    }

    getLanguageFromJS() {
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
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`${lang}-btn`).classList.add('active');
        
        document.querySelectorAll('.content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${lang}-content`).classList.add('active');
        
        document.title = lang === 'zh' ? '联系我们 - Contact Us' : 'Contact Us - 联系我们';
    }

    getAppNameFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const appNameParam = urlParams.get('app') || urlParams.get('appName');
        
        if (appNameParam) {
            this.appName = decodeURIComponent(appNameParam);
        } else {
            this.appName = this.getAppNameFromJS();
        }
        
        if (!this.appName) {
            this.appName = '示例应用';
        }
    }

    getAppNameFromJS() {
        return window.appName || '';
    }

    getContactEmailFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const emailParam = urlParams.get('email') || urlParams.get('contactEmail');
        
        if (emailParam) {
            this.contactEmail = decodeURIComponent(emailParam);
        } else {
            const jsEmail = window.contactEmail || window.supportEmail;
            if (jsEmail) {
                this.contactEmail = jsEmail;
            }
        }
    }

    setAppName(name) {
        this.appName = name;
        this.updateAppName();
    }

    setLanguage(lang) {
        const language = lang.toLowerCase();
        if (language === 'en' || language === 'english') {
            this.switchLanguage('en');
        } else if (language === 'zh' || language === 'chinese' || language === 'zh-cn') {
            this.switchLanguage('zh');
        }
    }

    setContactEmail(email) {
        this.contactEmail = email;
        this.updateContactEmail();
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

    updateContactEmail() {
        const zhEmailLink = document.getElementById('email-link-zh');
        const enEmailLink = document.getElementById('email-link-en');
        
        if (zhEmailLink) {
            zhEmailLink.textContent = this.contactEmail;
            zhEmailLink.href = `mailto:${this.contactEmail}`;
        }
        if (enEmailLink) {
            enEmailLink.textContent = this.contactEmail;
            enEmailLink.href = `mailto:${this.contactEmail}`;
        }
    }
}

// 初始化联系我们页面
const contactPage = new ContactPage();

// 全局函数，供外部调用
function setAppName(name) {
    contactPage.setAppName(name);
}

function setLanguage(lang) {
    contactPage.setLanguage(lang);
}

function setContactEmail(email) {
    contactPage.setContactEmail(email);
}

// 示例用法：
// 1. 通过URL参数：
//    contact.html?app=我的应用&lang=zh&email=support@myapp.com
// 2. 通过JavaScript调用：
//    setAppName('我的应用');
//    setLanguage('en');
//    setContactEmail('help@myapp.com');
// 3. 通过全局变量：
//    window.appName = '我的应用';
//    window.defaultLanguage = 'en';
//    window.contactEmail = 'support@myapp.com';