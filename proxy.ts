import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths targeted by automated vulnerability scanners and malicious probes
const PROBE_PATHS = [
  "/.env",
  "/.git",
  "/wp-login.php",
  "/wp-admin",
  "/xmlrpc.php",
  "/.aws",
  "/phpmyadmin",
  "/admin",
  "/config.json",
  "/cgi-bin",
  "/.vscode",
  "/.DS_Store",
  "/eval-stdin.php",
  "/boaform",
];

// CLI and automated scrapers with no legitimate browser purpose for a portfolio
const SUSPICIOUS_USER_AGENTS = [
  "curl",
  "python-requests",
  "scrapy",
  "libwww-perl",
  "aiohttp",
  "go-http-client",
  "zgrab",
  "gobuster",
  "sqlmap",
  "wappalyzer",
  "nikto",
  "masscan",
];

// Whitelist verified search engines and social preview bots
const ALLOWED_BOT_SUBSTRINGS = [
  "googlebot",
  "bingbot",
  "slurp",
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "twitterbot",
  "facebookexternalhit",
  "linkedinbot",
  "whatsapp",
  "telegrambot",
  "applebot",
  "pinterest",
];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase();
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();

  // 1. Immediately drop common vulnerability scanning attempts with 404
  if (PROBE_PATHS.some((probe) => pathname.startsWith(probe) || pathname.includes(probe))) {
    return new NextResponse(null, { status: 404 });
  }

  // 2. Allow legitimate search engine crawlers and social unfurlers through
  const isAllowedBot = ALLOWED_BOT_SUBSTRINGS.some((bot) => userAgent.includes(bot));

  // 3. Block known automated scraping and scanning user-agents
  if (!isAllowedBot && SUSPICIOUS_USER_AGENTS.some((agent) => userAgent.includes(agent))) {
    return new NextResponse("Access Denied", { status: 403 });
  }

  // 4. Block empty user-agent requests from automated HTTP clients
  if (!userAgent || userAgent.trim() === "") {
    return new NextResponse("Access Denied", { status: 403 });
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    // Apply to all routes except Next.js internals, static images, and favicon files
    "/((?!_next/static|_next/image|favicon.ico|apple-icon.png|icon.svg|images/.*|.*\\.(?:jpg|jpeg|png|webp|svg|ico|gif)$).*)",
  ],
};
