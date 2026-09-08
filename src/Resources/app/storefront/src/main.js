window.PluginManager.register(
    'Tinect2faVerificationPlugin',
    () => import('./plugin/tinect2fa-verification.plugin'),
    '[data-tinect2fa-verification-plugin]'
);
