const CONFIG = {
    whatsappNumber: "923703159642",
    whatsappDisplayNumber: "+92 370 3159642",
    ebook1Title: "The Generative AI Specialist by Abeer Nasir",
    ebook1Url: "https://bit.ly/44sikZs",
    coursePrice: "PKR 3,000 / Month",
    courseFullPrice: "PKR 3,000 Total (1 Month)",
    freeTrialDays: 3,
    ga4TrackingId: "G-MEASUREMENT_ID",
    siteUrl: "https://learn-ai-sable-phi.vercel.app",
    siteName: "AI Career Platform",
    siteDescription: "Learn AI step-by-step in 90 days - no coding required. Master no-code AI tools for business automation, content creation & chatbot building.",
    supabaseUrl: "https://njnbcjuoomyydzefvkqq.supabase.co",
    supabaseAnonKey: "sb_publishable_Z1WOq7jn1EpG1Lu_ZPowwg_dsajE",
    adminEmail: "abeerinfo5566@gmail.com",
    adminSecretPassword: "02034000",
    demoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
};

function getWhatsAppUrl(message) {
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function getWhatsAppUrlForEbook() {
    return getWhatsAppUrl("Hi! I want to download the Free AI eBook.");
}

function getWhatsAppUrlForTrial() {
    return getWhatsAppUrl("Hi! I want to claim the 3-Day Free AI Trial.");
}

function getWhatsAppUrlForEnroll() {
    return getWhatsAppUrl("Hi! I want to enroll in the Learn AI course (PKR 3,000/month).");
}

function getWhatsAppUrlForContact(name, message) {
    return getWhatsAppUrl("Hello! I'm " + name + ". " + message);
}

function getWhatsAppUrlWithTrack(trackName) {
    return getWhatsAppUrl("Hi! I'm interested in the \"" + trackName + "\" track. I want to enroll & claim my " + CONFIG.freeTrialDays + "-Day Free Trial + Free eBook!");
}

function getWhatsAppUrlDefault() {
    return getWhatsAppUrl("Hi! I want to enroll in the Learn AI course & Claim my 3-Day Trial + Free eBook!");
}
