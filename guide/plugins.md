# Plugins

Plugins are trusted code that add custom rules. Parity can load plugins from:

| Source | Location |
|--------|----------|
| Project-local | `.parity/plugins/*.php` |
| User-global | `~/.parity/plugins/*.php` |
| Composer package | `extra.parity.rules` |

Review plugin code before enabling it in public CI.
