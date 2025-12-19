import { NextRequest, NextResponse } from 'next/server';

// POST save project structure
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { pageStructure } = await request.json();
    
    const project = global.projects?.find(p => p.id === params.id);
    
    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    project.draftStructure = pageStructure;
    project.updatedAt = new Date().toISOString();

    return NextResponse.json({ message: 'Project saved successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to save project' }, { status: 500 });
  }
}
