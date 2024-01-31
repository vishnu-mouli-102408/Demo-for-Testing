import { NextResponse, NextRequest } from "next/server";

// The country to block from accessing the secret page
const BLOCKED_COUNTRY = "IN";

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
    const url = request.nextUrl.clone();
    url.pathname = "/client";
    return NextResponse.rewrite(url);
  } else {
    const url = request.nextUrl.clone();
    url.pathname = "/secret";
    return NextResponse.rewrite(url);
  }

  // Rewrite to URL
  //   return NextResponse.rewrite(request.url);
}
