export const HOME = { path: '/', name: "home", icon: "home", requiresAuth: true };
export const WELCOME = { path: '/', name: "welcome" };
export const PROFILE = { path: '/profile', name: "profile", requiresAuth: true };
export const SETTINGS = { path: '/settings', name: "settings", requiresAuth: true };
export const ABOUT = { path: '/about', name: "about", requiresAuth: true };
export const LOGIN = { path: '/login', name: "login" };
export const LOGOUT = { path: '/logout', name: "logout", requiresAuth: true };
export const SIGNUP = { path: '/signup', name: "signup" };

export const MAIN_TYPES = [HOME, PROFILE, SETTINGS, ABOUT, WELCOME];
export const AUTH_TYPES = [LOGIN, SIGNUP, LOGOUT];
