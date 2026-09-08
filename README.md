# Two Factor Authentication for Shopware 6
[![Latest Stable Version](https://poser.pugx.org/tinect/shopware6-two-factor-auth/v)](//packagist.org/packages/tinect/shopware6-two-factor-auth)
[![Total Downloads](https://poser.pugx.org/tinect/shopware6-two-factor-auth/downloads)](//packagist.org/packages/tinect/shopware6-two-factor-auth)
[![License](https://poser.pugx.org/tinect/shopware6-two-factor-auth/license)](//packagist.org/packages/tinect/shopware6-two-factor-auth)

![Two Factor Authentication for Shopware 6](https://user-images.githubusercontent.com/3930922/90954708-f8394c80-e476-11ea-940d-4733d4ce2588.png)

> **Fork notice**
> This is a maintained fork of [runelaenen/shopware6-two-factor-auth](https://github.com/runelaenen/shopware6-two-factor-auth),
> originally created and published by [Rune Laenen](https://github.com/runelaenen) and [Kraftware](https://www.kraftware.be).
> The original repository seems no longer maintained, so this fork continues development under the
> package name `tinect/shopware6-two-factor-auth`.

Add extra security to your Shopware 6 shop by enabling Two Factor Authentication.

Adds an extra prompt to admin- or customer-accounts in your Shopware 6 website.

## Features
 - 'Google Authenticator' provider
 - Storefront customer 2FA
 - Admin user 2FA
 - Local QR code generation
 - Fully localized:
   - English
   - German
   - French
   - Dutch
   - Polish
 
## Providers
At the moment only Google Authenticator (compatible) apps are supported. 
For example Google Authenticator, Authy, LastPass, Bitwarden, ...

## Installation guide

This plugin can only be installed using Composer.

```
# Install plugin using composer
composer require tinect/shopware6-two-factor-auth

# Refresh plugins & install & activate plugin
bin/console plugin:refresh
bin/console plugin:install --activate TinectTwoFactorAuth

# Build javascript files
bin/build-js.sh
```

## Development
Keep in mind that 2FA authentication will not work in the development Administration watcher mode.

## Migrating from `runelaenen/shopware6-two-factor-auth`
The plugin technical name changed from `RuneLaenenTwoFactorAuth` to `TinectTwoFactorAuth`.
Existing 2FA secrets are stored in the `rl_2fa_secret` custom field and are kept as-is, so
users do not have to re-register their authenticator apps. The plugin configuration
(`RuneLaenenTwoFactorAuth.config.*` vs. `TinectTwoFactorAuth.config.*`) is *not* migrated
and has to be set again after switching.

Everything else that carried the `rl` prefix is now prefixed with `tinect`. Adjust your
project if you rely on any of these:

| Before | After |
|---|---|
| snippet keys `rl-2fa.*` | `tinect-2fa.*` |
| routes `frontend.rl2fa.*`, `widgets.rl-2fa.*` | `frontend.tinect2fa.*`, `widgets.tinect-2fa.*` |
| URLs `/rl-2fa/...` | `/tinect-2fa/...` |
| admin API `_action/rl-2fa` | `_action/tinect-2fa` |
| OAuth token parameter `rl_2fa_otp` | `tinect_2fa_otp` |
| CSS `.rl-2fa-*`, `.rl2fa-*` | `.tinect-2fa-*`, `.tinect2fa-*` |
| storefront plugin `Rl2faVerificationPlugin`, `data-rl2fa-verification-plugin` | `Tinect2faVerificationPlugin`, `data-tinect2fa-verification-plugin` |
| admin component `rl-user-otp`, service `rl2faService`, Twig filter `rl2fa_main_js` | `tinect-user-otp`, `tinect2faService`, `tinect2fa_main_js` |
| custom field `rl_2fa_secret` | **unchanged** |

```
composer remove runelaenen/shopware6-two-factor-auth
composer require tinect/shopware6-two-factor-auth
bin/console plugin:refresh
bin/console plugin:install --activate TinectTwoFactorAuth
```

## Credits
Original author: [Rune Laenen](https://github.com/runelaenen) / [Kraftware](https://www.kraftware.be) — MIT licensed.
Thanks to all [contributors](https://github.com/tinect/shopware6-two-factor-auth/graphs/contributors) of the original project.
