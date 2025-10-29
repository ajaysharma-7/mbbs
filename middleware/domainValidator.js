// file: middleware/domainValidator.js
const defaultOptions = {
  // list of allowed domains (lowercase, without port)
  allowed: [],

  // default action for unknown domains:
  // 'block' => return 403 Forbidden
  // 'redirect' => redirect to redirectTo
  // 'close' => forcibly close socket (like nginx 444)
  action: 'block',

  // when action === 'redirect', redirectTo must be provided
  redirectTo: null,

  // allow 'www' variants automatically (if true, www.example.com is treated as example.com)
  allowWww: true,

  // allow subdomains if set to true (e.g. *.example.com)
  allowSubdomains: false,

  // optional logger function: (msg, level) => {}
  logger: console.warn,
};

function normalizeHost(rawHost = '') {
  // remove port if present
  return rawHost.split(':')[0].toLowerCase();
}

function domainMatches(host, allowedDomain, { allowWww, allowSubdomains }) {
  if (!host || !allowedDomain) return false;
  host = host.toLowerCase();
  allowedDomain = allowedDomain.toLowerCase();

  if (host === allowedDomain) return true;

  if (allowWww) {
    if (host === 'www.' + allowedDomain) return true;
  }

  if (allowSubdomains) {
    // allow e.g. sub.example.com to match example.com
    if (host.endsWith('.' + allowedDomain)) return true;
  }

  return false;
}

function createDomainValidator(options = {}) {
  const cfg = { ...defaultOptions, ...options };

  if (!Array.isArray(cfg.allowed)) {
    throw new Error('domainValidator: "allowed" must be an array of domain strings');
  }

  if (cfg.action === 'redirect' && !cfg.redirectTo) {
    throw new Error('domainValidator: "redirectTo" required when action is "redirect"');
  }

  // normalize allowed list
  const allowed = cfg.allowed.map(d => d.toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, ''));

  return function domainValidator(req, res, next) {
    // respect X-Forwarded-Host if present (when behind some proxies)
    const forwardedHost = req.headers['x-forwarded-host'];
    const hostHeader = forwardedHost ? forwardedHost.split(',')[0].trim() : req.headers['host'];

    const host = normalizeHost(hostHeader);

    // check whether host matches any allowed domain
    const ok = allowed.some(ad => domainMatches(host, ad, cfg));

    if (ok) {
      return next();
    }

    // Not allowed => take configured action
    const logMsg = `Blocked host "${host}" on path ${req.originalUrl}`;
    if (cfg.logger) cfg.logger(logMsg, 'warn');

    if (cfg.action === 'redirect') {
      // safe redirect preserving path/query
      const target = cfg.redirectTo + req.originalUrl;
      return res.redirect(301, target);
    }

    if (cfg.action === 'close') {
      // aggressively drop the connection (no response) — similar to nginx 444
      try {
        // destroy socket
        req.socket?.destroy();
      } catch (e) {
        // fallback to 403
        return res.status(403).send('Forbidden');
      }
      return;
    }

    // default: block with 403
    return res.status(403).send('Forbidden');
  };
}

module.exports = createDomainValidator;
