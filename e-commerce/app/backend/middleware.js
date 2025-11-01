import { NextResponse } from 'next/server';

export function middleware(request) {
  // This is a placeholder for actual authentication logic
  // You'll implement this properly in Step 2 with Supabase Auth
  
  const path = request.nextUrl.pathname;
  
  // Check if the path starts with /admin
  if (path.startsWith('/admin')) {
    // For now, we're just letting all requests through
    // In the authentication phase, you'll add proper checks here
    
    // Example of how you'll check authentication later:
    // const session = await getSession()
    // if (!session && path !== '/admin/login') {
    //   return NextResponse.redirect(new URL('/admin/login', request.url))
    // }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};