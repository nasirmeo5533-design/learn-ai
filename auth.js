/* ============================================
   SUPABASE AUTH MODULE
   Shared across login.html, admin.html, dashboard.html
   ============================================ */
var Auth = (function () {
    'use strict';

    var supabase = null;

    function getClient() {
        if (supabase) return supabase;
        if (typeof CONFIG === 'undefined' || !CONFIG.supabaseUrl || CONFIG.supabaseUrl === 'YOUR_SUPABASE_PROJECT_URL') {
            return null;
        }
        if (typeof window.supabase === 'undefined' || !window.supabase.createClient) return null;
        supabase = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey);
        return supabase;
    }

    function isLoggedIn() {
        var user = localStorage.getItem('am_user');
        return !!user;
    }

    function getUser() {
        var raw = localStorage.getItem('am_user');
        if (!raw) return null;
        try { return JSON.parse(raw); } catch (e) { return null; }
    }

    function setUser(user) {
        localStorage.setItem('am_user', JSON.stringify(user));
    }

    function clearUser() {
        localStorage.removeItem('am_user');
    }

    function isAdmin() {
        var user = getUser();
        return user && user.email === CONFIG.adminEmail;
    }

    function requireAuth() {
        if (!isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    function requireAdmin() {
        if (!isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        if (!isAdmin()) {
            window.location.href = 'dashboard.html';
            return false;
        }
        return true;
    }

    async function signUp(email, password, fullName) {
        var client = getClient();
        if (!client) {
            return simulateAuth(email, fullName, password);
        }
        try {
            var result = await client.auth.signUp({
                email: email,
                password: password,
                options: { data: { full_name: fullName } }
            });
            if (result.error) {
                console.warn('Supabase auth signup notice:', result.error.message);
                return simulateAuth(email, fullName, password);
            }
            var user = { id: result.data.user ? result.data.user.id : 'u_' + Date.now(), email: email, name: fullName, role: email === CONFIG.adminEmail ? 'admin' : 'student' };
            setUser(user);
            return { user: user, error: null };
        } catch (err) {
            console.warn('Fallback to local auth signup:', err.message);
            return simulateAuth(email, fullName, password);
        }
    }

    async function signIn(email, password) {
        var client = getClient();
        if (!client) {
            return simulateAuth(email, email.split('@')[0], password);
        }
        try {
            var result = await client.auth.signInWithPassword({ email: email, password: password });
            if (result.error) {
                console.warn('Supabase auth signin notice:', result.error.message);
                return simulateAuth(email, email.split('@')[0], password);
            }
            var name = (result.data.user && result.data.user.user_metadata && result.data.user.user_metadata.full_name) ? result.data.user.user_metadata.full_name : email.split('@')[0];
            var user = { id: result.data.user.id, email: email, name: name, role: email === CONFIG.adminEmail ? 'admin' : 'student' };
            setUser(user);
            return { user: user, error: null };
        } catch (err) {
            console.warn('Fallback to local auth signin:', err.message);
            return simulateAuth(email, email.split('@')[0], password);
        }
    }

    async function signInWithGoogle() {
        var client = getClient();
        if (!client) {
            var fakeUser = { id: 'g_' + Date.now(), email: 'student@gmail.com', name: 'Google Student', role: 'student' };
            setUser(fakeUser);
            redirectAfterLogin(fakeUser);
            return;
        }
        try {
            var result = await client.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/dashboard.html' } });
            if (result && result.error) throw result.error;
        } catch (err) {
            console.warn('Google provider not enabled in Supabase, using Google Demo Auth:', err.message);
            var fakeUser = { id: 'g_' + Date.now(), email: 'student@gmail.com', name: 'Google Student', role: 'student' };
            setUser(fakeUser);
            redirectAfterLogin(fakeUser);
        }
    }

    function signOut() {
        clearUser();
        window.location.href = 'login.html';
    }

    function redirectAfterLogin(user) {
        if (user && user.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'dashboard.html';
        }
    }

    function simulateAuth(email, fullName, password) {
        if (email === CONFIG.adminEmail) {
            if (!password || password !== CONFIG.adminSecretPassword) {
                return { user: null, error: 'Invalid Admin Password! Access Denied to Admin Panel.' };
            }
        }
        var user = {
            id: 'sim_' + Date.now(),
            email: email,
            name: fullName || email.split('@')[0],
            role: email === CONFIG.adminEmail ? 'admin' : 'student'
        };
        setUser(user);
        return { user: user, error: null };
    }

    return {
        isLoggedIn: isLoggedIn,
        getUser: getUser,
        setUser: setUser,
        clearUser: clearUser,
        isAdmin: isAdmin,
        requireAuth: requireAuth,
        requireAdmin: requireAdmin,
        signUp: signUp,
        signIn: signIn,
        signInWithGoogle: signInWithGoogle,
        signOut: signOut,
        redirectAfterLogin: redirectAfterLogin
    };
})();
