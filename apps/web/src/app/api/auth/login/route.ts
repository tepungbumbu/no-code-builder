import { NextRequest, NextResponse } from 'next/server';

// In-memory user storage (shared with register)
declare global {
  var users: any[];
  var demoUserInitialized: boolean;
}

global.users = global.users || [];

// Initialize demo user on first load (same as register route)
if (!global.demoUserInitialized) {
  global.users.push({
    id: 'demo-user-123',
    email: 'demo@example.com',
    password: 'password123',
    plan: 'pro',
    createdAt: new Date().toISOString(),
  });
  global.demoUserInitialized = true;
  console.log('✅ Demo user initialized:', global.users[0].email);
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    console.log('🔐 Login attempt:', email);
    console.log('👥 Available users:', global.users.map(u => u.email));

    // Find user
    const user = global.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials', code: 'INVALID_CREDENTIALS' },
        { status: 401 }
      );
    }

    // Generate simple token
    const token = Buffer.from(JSON.stringify({ userId: user.id })).toString('base64');

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        plan: user.plan,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Login failed' },
      { status: 500 }
    );
  }
}
