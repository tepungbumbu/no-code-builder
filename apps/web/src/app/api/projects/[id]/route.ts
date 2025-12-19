import { NextRequest, NextResponse } from 'next/server';

// GET single project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = global.projects?.find(p => p.id === params.id);
    
    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch project' }, { status: 500 });
  }
}

// DELETE project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const index = global.projects?.findIndex(p => p.id === params.id);
    
    if (index === -1) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    global.projects.splice(index, 1);

    return NextResponse.json({ message: 'Project deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete project' }, { status: 500 });
  }
}
