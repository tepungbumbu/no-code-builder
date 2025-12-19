import { NextRequest, NextResponse } from 'next/server';

// In-memory project storage
declare global {
  var projects: any[];
}

global.projects = global.projects || [];

// GET all projects
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());

    // Filter projects by user
    const userProjects = global.projects.filter(p => p.userId === decoded.userId);

    return NextResponse.json(userProjects);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST create project
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());

    const { name, template } = await request.json();

    const newProject = {
      id: `project-${Date.now()}`,
      userId: decoded.userId,
      name: name || 'Untitled Project',
      slug: name?.toLowerCase().replace(/\s+/g, '-') || 'untitled',
      status: 'draft',
      draftStructure: [],
      publishedStructure: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    global.projects.push(newProject);

    return NextResponse.json(newProject);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create project' }, { status: 500 });
  }
}
