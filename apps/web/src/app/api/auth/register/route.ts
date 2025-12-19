import { NextRequest, NextResponse } from 'next/server';

// In-memory user storage (for demo purposes)
declare global {
  var users: any[];
  var demoUserInitialized: boolean;
}

global.users = global.users || [];

// Initialize demo user on first load
if (!global.demoUserInitialized) {
  global.users.push({
    id: 'demo-user-123',
    email: 'demo@example.com',
    password: 'password123',
    plan: 'pro',
    createdAt: new Date().toISOString(),
  });
  global.demoUserInitialized = true;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Check if user already exists
    const existingUser = global.users.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already registered', code: 'EMAIL_EXISTS' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password, // In production, hash this!
      plan: 'free',
      createdAt: new Date().toISOString(),
    };

    global.users.push(newUser);

    // Generate simple token
    const token = Buffer.from(JSON.stringify({ userId: newUser.id })).toString('base64');

    return NextResponse.json({
      user: {
        id: newUser.id,
        email: newUser.email,
        plan: newUser.plan,
        createdAt: newUser.createdAt,
      },
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Registration failed' },
      { status: 500 }
    );
  }
}
