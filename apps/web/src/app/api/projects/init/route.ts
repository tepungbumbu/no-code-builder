import { NextRequest, NextResponse } from 'next/server';

// Initialize demo projects
if (!global.projects) {
  global.projects = [
    {
      id: 'demo-project-1',
      userId: 'demo-user-123',
      name: 'My First Website',
      slug: 'my-first-website',
      status: 'draft',
      draftStructure: [
        {
          id: 'el-1',
          type: 'heading',
          props: { content: 'Welcome to My Website', level: 1 },
          styles: {
            desktop: {
              fontSize: '48px',
              fontWeight: '700',
              color: '#1e3a8a',
              padding: '32px',
              textAlign: 'center',
            },
          },
        },
        {
          id: 'el-2',
          type: 'text',
          props: { content: 'This is a demo project. Start editing to create your own beautiful website!' },
          styles: {
            desktop: {
              fontSize: '18px',
              color: '#404040',
              padding: '16px 32px',
              textAlign: 'center',
              lineHeight: '1.6',
            },
          },
        },
      ],
      publishedStructure: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

export async function GET() {
  return NextResponse.json({ initialized: true });
}
