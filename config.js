const CONFIG = {
    whatsappNumber: "923703159642",
    whatsappDisplayNumber: "+92 370 3159642",
    ebook1Title: "The Generative AI Specialist by Abeer Nasir",
    ebook1Url: "https://bit.ly/44sikZs",
    coursePrice: "PKR 2,000 / Month",
    courseFullPrice: "PKR 6,000 Total (3 Months)",
    courseOriginalPrice: "PKR 15,000",
    freeTrialDays: 7,
    ga4TrackingId: "G-MEASUREMENT_ID",
    siteUrl: "https://yourdomain.com",
    siteName: "Learn AI",
    siteDescription: "Learn AI step-by-step in 90 days - no coding required. Master no-code AI tools for business automation, content creation & chatbot building.",
    supabaseUrl: "https://njnbcjuoomyydzefvkqq.supabase.co",
    supabaseAnonKey: "sb_publishable_Z1WOq7jn1EpG1Lu_ZPowwg_dsajE",
    adminEmail: "abeerinfo5566@gmail.com",
    adminSecretPassword: "02034000",
    demoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    buyerNotifications: [
        { name: "Sara K.", city: "Karachi", action: "enrolled", time: "6" },
        { name: "Usman R.", city: "Lahore", action: "claimed 7-Day Trial", time: "12" },
        { name: "Fatima Z.", city: "Islamabad", action: "enrolled", time: "3" },
        { name: "Ahmed M.", city: "Faisalabad", action: "claimed 7-Day Trial", time: "8" },
        { name: "Ayesha N.", city: "Rawalpindi", action: "enrolled", time: "15" },
        { name: "Hassan B.", city: "Multan", action: "claimed 7-Day Trial", time: "5" },
        { name: "Zainab S.", city: "Peshawar", action: "enrolled", time: "10" },
        { name: "Bilal T.", city: "Quetta", action: "claimed 7-Day Trial", time: "7" },
        { name: "Mariam K.", city: "Sialkot", action: "enrolled", time: "4" },
        { name: "Omar F.", city: "Gujranwala", action: "claimed 7-Day Trial", time: "9" },
        { name: "Hira A.", city: "Hyderabad", action: "enrolled", time: "2" },
        { name: "Danish I.", city: "Bahawalpur", action: "claimed 7-Day Trial", time: "11" }
    ]
};

function getWhatsAppUrl(message) {
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function getWhatsAppUrlForEbook() {
    return getWhatsAppUrl("Hi! I want to download the Free AI eBook.");
}

function getWhatsAppUrlForTrial() {
    return getWhatsAppUrl("Hi! I want to claim the 7-Day Free AI Trial.");
}

function getWhatsAppUrlForEnroll() {
    return getWhatsAppUrl("Hi! I want to enroll in the Learn AI course (PKR 2,000/month installment plan).");
}

function getWhatsAppUrlForContact(name, message) {
    return getWhatsAppUrl("Hello! I'm " + name + ". " + message);
}

function getWhatsAppUrlWithTrack(trackName) {
    return getWhatsAppUrl("Hi! I'm interested in the \"" + trackName + "\" track. I want to enroll & claim my " + CONFIG.freeTrialDays + "-Day Free Trial + Free eBook!");
}

function getWhatsAppUrlDefault() {
    return getWhatsAppUrl("Hi! I want to enroll in the Learn AI course & Claim my 7-Day Trial + Free eBook!");
}
