import { NextResponse, NextRequest } from "next/server";

// The country to block from accessing the secret page
const BLOCKED_COUNTRY = "SE";

// Trigger this middleware to run on the `/secret-page` route
export const config = {
  matcher: "/secret",
};

export default function middleware(request: NextRequest) {
  // Extract country. Default to US if not found.
  const country = (request.geo && request.geo.country) || "US";

  console.log(`Visitor from ${country}`);

  // Specify the correct route based on the requests location
  if (country === BLOCKED_COUNTRY) {
    return NextResponse.redirect(new URL("/client", request.url));
  } else {
    return NextResponse.redirect(new URL("/secret", request.url));
  }

  // Rewrite to URL
  return NextResponse.rewrite(request.url);
}
