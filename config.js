const CONFIG = {
    whatsappNumber: "923703159642",
    whatsappDisplayNumber: "+92 370 3159642",
    ebook1Title: "The Generative AI Specialist by Abeer Nasir",
    ebook1Url: "https://bit.ly/44sikZs",
    coursePrice: "PKR 3,000 / Month",
    courseFullPrice: "PKR 3,000 Total (1 Month)",
    freeTrialDays: 0,
    ga4TrackingId: "G-MEASUREMENT_ID",
    siteUrl: "https://learn-ai-sable-phi.vercel.app",
    siteName: "AI Automation Platform",
    siteDescription: "AI Automation step-by-step in 30 days (90-day extended access) - no coding required. Master no-code AI tools for business automation, content creation & chatbot building.",
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
    return getWhatsAppUrl("Hi! I want to start the AI Automation course (PKR 3,000).");
}

function getWhatsAppUrlForEnroll() {
    return getWhatsAppUrl("Hi! I want to enroll in the AI Automation course (PKR 3,000).");
}

function getWhatsAppUrlForContact(name, message) {
    return getWhatsAppUrl("Hello! I'm " + name + ". " + message);
}

function getWhatsAppUrlWithTrack(trackName) {
    return getWhatsAppUrl("Hi! I'm interested in the \"" + trackName + "\" track. I want to enroll & claim my Free eBook!");
}

function getWhatsAppUrlDefault() {
    return getWhatsAppUrl("Hi! I want to enroll in the AI Automation course (PKR 3,000) + Free eBook!");
}
