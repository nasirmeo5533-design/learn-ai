/* ============================================
   LEARN AI - MAIN SCRIPT V7
   ============================================ */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initAnnouncementBar();
        initTheme();
        initHeader();
        initMobileNav();
        initScrollReveal();
        initFAQ();
        initSyllabusAccordion();
        initCounters();
        initDynamicPrices();
        initEbookModal();
        initContactForm();
        initTrackSelector();
        initBlogSearch();
        initGA4();
        initVideoModal();
        initBuyerToast();
        initDynamicMeta();
        initStickyCta();
        initSmoothAnchors();
    }

    /* --- ANNOUNCEMENT BAR --- */
    function initAnnouncementBar() {
        var bar = document.querySelector('.announcement-bar');
        if (!bar) return;
        var msgs = bar.querySelectorAll('.announcement-msg');
        var closeBtn = bar.querySelector('.announcement-close');
        var current = 0;
        var msgInterval = null;

        if (localStorage.getItem('announcementClosed') === '1') {
            document.body.classList.add('announcement-hidden');
            return;
        }

        if (msgs.length > 0) {
            msgs[0].classList.add('active');
            msgInterval = setInterval(function () {
                msgs[current].classList.remove('active');
                current = (current + 1) % msgs.length;
                msgs[current].classList.add('active');
            }, 4000);
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                if (msgInterval) { clearInterval(msgInterval); msgInterval = null; }
                bar.style.transition = 'height .3s ease, opacity .3s ease';
                bar.style.height = '0';
                bar.style.opacity = '0';
                bar.style.overflow = 'hidden';
                setTimeout(function () {
                    document.body.classList.add('announcement-hidden');
                    localStorage.setItem('announcementClosed', '1');
                }, 300);
            });
        }
    }

    /* --- THEME (Default: Light) --- */
    function initTheme() {
        var toggle = document.querySelector('.theme-toggle');
        if (!toggle) return;
        var saved = localStorage.getItem('theme');
        if (saved === 'dark') {
            document.body.classList.add('dark');
            toggle.innerHTML = '&#9788;';
        } else {
            toggle.innerHTML = '&#9790;';
        }
        toggle.addEventListener('click', function () {
            document.body.classList.toggle('dark');
            var isDark = document.body.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            toggle.innerHTML = isDark ? '&#9788;' : '&#9790;';
        });
    }

    /* --- HEADER SCROLL --- */
    function initHeader() {
        var header = document.querySelector('.header');
        if (!header) return;
        function onScroll() {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }
        window.addEventListener('scroll', onScroll);
        onScroll();
    }

    /* --- MOBILE NAV --- */
    function initMobileNav() {
        var toggle = document.querySelector('.nav-toggle');
        var links = document.querySelector('.nav-links');
        if (!toggle || !links) return;
        toggle.addEventListener('click', function () {
            toggle.classList.toggle('active');
            links.classList.toggle('open');
        });
        links.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                toggle.classList.remove('active');
                links.classList.remove('open');
            });
        });
    }

    /* --- SCROLL REVEAL --- */
    function initScrollReveal() {
        var els = document.querySelectorAll('.reveal');
        if (!els.length) return;
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        els.forEach(function (el) { observer.observe(el); });
    }

    /* --- FAQ ACCORDION --- */
    function initFAQ() {
        document.querySelectorAll('.faq-item').forEach(function (item) {
            var btn = item.querySelector('.faq-question');
            if (!btn) return;
            var answer = item.querySelector('.faq-answer');
            btn.setAttribute('aria-expanded', 'false');
            if (answer) answer.setAttribute('role', 'region');
            btn.addEventListener('click', function () {
                var wasActive = item.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(function (i) {
                    i.classList.remove('active');
                    var q = i.querySelector('.faq-question');
                    if (q) q.setAttribute('aria-expanded', 'false');
                });
                if (!wasActive) {
                    item.classList.add('active');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    /* --- SYLLABUS ACCORDION --- */
    function initSyllabusAccordion() {
        document.querySelectorAll('.syllabus-stage').forEach(function (stage) {
            var header = stage.querySelector('.syllabus-header');
            if (!header) return;
            header.setAttribute('aria-expanded', 'false');
            header.addEventListener('click', function () {
                var wasActive = stage.classList.contains('active');
                document.querySelectorAll('.syllabus-stage').forEach(function (s) {
                    s.classList.remove('active');
                    var h = s.querySelector('.syllabus-header');
                    if (h) h.setAttribute('aria-expanded', 'false');
                });
                if (!wasActive) {
                    stage.classList.add('active');
                    header.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    /* --- COUNTERS --- */
    function initCounters() {
        var counters = document.querySelectorAll('.counter-item .number');
        if (!counters.length) return;
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(function (el) { observer.observe(el); });
    }

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 2000;
        var startTime = null;
        function step(time) {
            if (!startTime) startTime = time;
            var progress = Math.min((time - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target.toLocaleString() + suffix;
        }
        requestAnimationFrame(step);
    }

    /* --- DYNAMIC PRICES FROM CONFIG --- */
    function initDynamicPrices() {
        if (typeof CONFIG === 'undefined') return;
        setText('.dynamic-price', CONFIG.coursePrice);
        setText('.dynamic-original-price', CONFIG.courseOriginalPrice);
        setText('.dynamic-trial-days', CONFIG.freeTrialDays);

        setAttr('.dynamic-whatsapp-link', 'href', getWhatsAppUrlDefault());
        setAttr('.dynamic-trial-link', 'href', getWhatsAppUrlForTrial());
        setAttr('.dynamic-ebook-link', 'href', getWhatsAppUrlForEbook());
        setAttr('.dynamic-ebook1-link', 'href', CONFIG.ebook1Url);
        setAttr('.dynamic-ebook2-link', 'href', CONFIG.ebook2Url);

        document.querySelectorAll('[data-whatsapp="enroll"]').forEach(function (el) {
            el.href = getWhatsAppUrlForEnroll();
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener noreferrer');
        });
        document.querySelectorAll('[data-whatsapp="trial"]').forEach(function (el) {
            el.href = getWhatsAppUrlForTrial();
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener noreferrer');
        });
        document.querySelectorAll('[data-whatsapp="ebook"]').forEach(function (el) {
            el.href = getWhatsAppUrlForEbook();
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener noreferrer');
        });

        document.querySelectorAll('.dynamic-whatsapp-link, .dynamic-trial-link, .dynamic-ebook1-link, .dynamic-ebook2-link').forEach(function (el) {
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener noreferrer');
        });
    }

    function setText(sel, val) {
        document.querySelectorAll(sel).forEach(function (el) { el.textContent = val; });
    }
    function setAttr(sel, attr, val) {
        document.querySelectorAll(sel).forEach(function (el) { el.setAttribute(attr, val); });
    }

    /* --- EBOOK MODAL --- */
    function initEbookModal() {
        var triggers = document.querySelectorAll('[data-modal="ebooks"]');
        var overlay = document.getElementById('ebookModal');
        if (!overlay) return;

        triggers.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                overlay.classList.add('active');
                document.body.classList.add('modal-open');
            });
        });

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeModal();
        });
        var closeBtn = overlay.querySelector('.modal-close');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeModal();
        });

        function closeModal() {
            overlay.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    }

    /* --- TRACK SELECTOR --- */
    function initTrackSelector() {
        document.querySelectorAll('.track-card').forEach(function (card) {
            card.addEventListener('click', function () {
                document.querySelectorAll('.track-card').forEach(function (c) { c.classList.remove('selected'); });
                card.classList.add('selected');
                var track = card.getAttribute('data-track');
                var whatsappBtn = card.querySelector('.track-whatsapp');
                if (whatsappBtn && track) {
                    whatsappBtn.href = getWhatsAppUrlWithTrack(track);
                    whatsappBtn.setAttribute('target', '_blank');
                    whatsappBtn.setAttribute('rel', 'noopener noreferrer');
                }
            });
        });
    }

    /* --- BLOG SEARCH --- */
    function initBlogSearch() {
        var input = document.getElementById('blogSearch');
        if (!input) return;
        input.addEventListener('input', function () {
            var query = input.value.toLowerCase();
            document.querySelectorAll('.blog-card').forEach(function (card) {
                var text = card.textContent.toLowerCase();
                card.style.display = text.indexOf(query) > -1 ? '' : 'none';
            });
        });
    }

    /* --- CONTACT FORM --- */
    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (!form) return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = form.querySelector('[name="name"]').value.trim();
            var email = form.querySelector('[name="email"]').value.trim();
            var subject = form.querySelector('[name="subject"]').value.trim();
            var message = form.querySelector('[name="message"]').value.trim();

            if (!name || !email || !message) {
                showStatus(form, 'Please fill in all required fields.', 'error');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showStatus(form, 'Please enter a valid email address.', 'error');
                return;
            }

            var whatsappMsg = 'Hello! I\'m ' + name + ' (' + email + '). ' + (subject ? 'Subject: ' + subject + '. ' : '') + message;
            window.open(getWhatsAppUrl(whatsappMsg), '_blank');
            showStatus(form, 'Opening WhatsApp... Redirecting your message now!', 'success');
            form.reset();
        });

        function showStatus(form, text, type) {
            var existing = form.querySelector('.form-status');
            if (existing) existing.remove();
            var div = document.createElement('div');
            div.className = 'form-status';
            div.style.cssText = 'padding:12px 16px;border-radius:8px;margin-top:4px;font-size:.88rem;text-align:center;';
            div.style.background = type === 'success' ? 'var(--green-100)' : 'var(--red-100)';
            div.style.color = type === 'success' ? 'var(--green-600)' : 'var(--red-500)';
            div.textContent = text;
            form.appendChild(div);
            setTimeout(function () { div.remove(); }, 5000);
        }
    }

    /* --- GA4 TRACKING --- */
    function initGA4() {
        if (typeof CONFIG === 'undefined' || !CONFIG.ga4TrackingId || CONFIG.ga4TrackingId === 'G-MEASUREMENT_ID') return;
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + CONFIG.ga4TrackingId;
        document.head.appendChild(script);
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', CONFIG.ga4TrackingId);
    }

    /* --- PRODUCTION FIX 1: VIDEO MODAL --- */
    function initVideoModal() {
        var trigger = document.querySelector('[data-modal="video"]');
        var overlay = document.getElementById('videoModal');
        if (!trigger || !overlay) return;

        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            var iframe = overlay.querySelector('iframe');
            if (iframe && !iframe.src && iframe.getAttribute('data-src')) {
                iframe.src = iframe.getAttribute('data-src');
            }
            overlay.classList.add('active');
            document.body.classList.add('modal-open');
        });

        function closeVideoModal() {
            overlay.classList.remove('active');
            document.body.classList.remove('modal-open');
        }

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeVideoModal();
        });
        var closeBtn = overlay.querySelector('.modal-close');
        if (closeBtn) closeBtn.addEventListener('click', closeVideoModal);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay.classList.contains('active')) closeVideoModal();
        });
    }

    /* --- PRODUCTION FIX 3: BUYER SOCIAL PROOF TOAST --- */
    function initBuyerToast() {
        if (typeof CONFIG === 'undefined' || !CONFIG.buyerNotifications) return;
        if (localStorage.getItem('toastDismissed') === '1') return;

        var toast = document.createElement('div');
        toast.className = 'buyer-toast';
        toast.innerHTML = '<div class="buyer-toast-content"><span class="buyer-toast-icon">&#9889;</span><div class="buyer-toast-text"><span class="buyer-toast-msg"></span><span class="buyer-toast-time"></span></div><button class="buyer-toast-close" aria-label="Close">&times;</button></div>';
        document.body.appendChild(toast);

        var msgEl = toast.querySelector('.buyer-toast-msg');
        var timeEl = toast.querySelector('.buyer-toast-time');
        var closeBtn = toast.querySelector('.buyer-toast-close');
        var notifications = CONFIG.buyerNotifications;
        var index = 0;

        function showNotification() {
            var n = notifications[index % notifications.length];
            msgEl.textContent = n.name + ' from ' + n.city + ' ' + n.action;
            timeEl.textContent = n.time + ' mins ago';
            toast.classList.add('visible');
            setTimeout(function () {
                toast.classList.remove('visible');
            }, 5000);
            index++;
        }

        setTimeout(function () {
            showNotification();
            setInterval(showNotification, 15000);
        }, 8000);

        closeBtn.addEventListener('click', function () {
            toast.classList.remove('visible');
            toast.style.display = 'none';
            localStorage.setItem('toastDismissed', '1');
        });
    }

    /* --- PRODUCTION FIX 4: DYNAMIC META LINKS --- */
    function initDynamicMeta() {
        if (typeof CONFIG === 'undefined') return;
        var currentFile = window.location.pathname.split('/').pop() || 'index.html';
        var baseUrl = CONFIG.siteUrl;

        document.querySelectorAll('link[rel="canonical"]').forEach(function (link) {
            link.setAttribute('href', baseUrl + '/' + currentFile);
        });

        document.querySelectorAll('meta[property="og:url"]').forEach(function (meta) {
            meta.setAttribute('content', baseUrl + '/' + currentFile);
        });

        var ldScripts = document.querySelectorAll('script[type="application/ld+json"]');
        ldScripts.forEach(function (script) {
            try {
                var data = JSON.parse(script.textContent);
                if (data.provider && data.provider.url) {
                    data.provider.url = baseUrl;
                }
                if (data.url) {
                    data.url = baseUrl + '/' + currentFile;
                }
                script.textContent = JSON.stringify(data, null, 2);
            } catch (e) {}
        });
    }

    /* --- STICKY CTA (MOBILE) --- */
    function initStickyCta() {
        var sticky = document.querySelector('.sticky-cta');
        if (!sticky) return;
        var hero = document.querySelector('.hero');
        function toggleSticky() {
            if (!hero) { sticky.style.display = 'none'; return; }
            var heroBottom = hero.offsetTop + hero.offsetHeight;
            if (window.scrollY > heroBottom - 100) {
                sticky.style.display = 'block';
            } else {
                sticky.style.display = 'none';
            }
        }
        window.addEventListener('scroll', toggleSticky, { passive: true });
        toggleSticky();
    }

    /* --- SMOOTH ANCHOR SCROLL --- */
    function initSmoothAnchors() {
        document.querySelectorAll('a[href^="#"]').forEach(function (a) {
            a.addEventListener('click', function (e) {
                var href = a.getAttribute('href');
                if (href.length > 1) {
                    var target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }
})();
