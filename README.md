# SysProxy [![Build Status](https://github.com/httptoolkit/sysproxy/workflows/CI/badge.svg)](https://github.com/httptoolkit/sysproxy/actions) [![Available on NPM](https://img.shields.io/npm/v/sysproxy.svg)](https://npmjs.com/package/sysproxy)

> _Part of [HTTP Toolkit](https://httptoolkit.tech): powerful tools for building, testing & debugging HTTP(S)_

Access the configured system proxy settings from Node.js, for all platforms. Use it like so:

```javascript
import { getSystemProxy } from 'sysproxy';

const proxy = await getSystemProxy();
```

The promise from `getSystemProxy` resolves to something like:

```json
{
    "proxyUrl": "https://proxy-server:123/",
    "noProxy": ["localhost", "example.com"]
}
```

The proxyUrl is returned in a format suitable for use with [proxy-agent](https://www.npmjs.com/package/proxy-agent): it might be an HTTP or HTTPS URL (for an HTTP proxy), a `socks://` or `socks5://` URL for SOCKS proxies, or a `pac+http://` URL (or similar) with the address of a PAC file for PAC-configured proxies.

If there's no proxy configured, it will resolve to `undefined` instead. If something major goes wrong and the settings can't be detected, the promise will be rejected.

This works slightly differently on each platform:

* On Windows it uses [@cypress/get-windows-proxy](https://www.npmjs.com/package/@cypress/get-windows-proxy), which reads proxy configuration from the registry using [registry-js](https://www.npmjs.com/package/registry-js).
* On Mac it uses [mac-system-proxy](https://github.com/httptoolkit/mac-system-proxy), which reads proxy configuration using the `scutil` command-line tool.
* On Linux it parses the various *_PROXY environment variables.

If you only need one platform, it's probably better to just use one of these approaches directly - this package is designed for use in cross-platform tools.