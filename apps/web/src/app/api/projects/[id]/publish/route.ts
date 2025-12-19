import { NextRequest, NextResponse } from 'next/server';

// POST publish project
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = global.projects?.find(p => p.id === params.id);
    
    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    // Copy draft to published
    project.publishedStructure = project.draftStructure;
    project.status = 'published';
    project.publishedAt = new Date().toISOString();
    project.updatedAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      url: `https://example.com/${project.slug}`,
      message: 'Project published successfully!',
    });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to publish project' }, { status: 500 });
  }
}
