import { NextRequest, NextResponse } from 'next/server';

// POST export project
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = global.projects?.find(p => p.id === params.id);
    
    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    // Generate HTML (simplified)
    const html = generateHTML(project);

    return NextResponse.json({
      success: true,
      html,
      message: 'Project exported successfully!',
    });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to export project' }, { status: 500 });
  }
}

function generateHTML(project: any): string {
  const elements = project.draftStructure || [];
  
  let bodyContent = '';
  elements.forEach((el: any) => {
    bodyContent += renderElement(el);
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${project.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  </style>
</head>
<body>
  ${bodyContent}
</body>
</html>`;
}

function renderElement(el: any): string {
  const styles = el.styles?.desktop || {};
  const styleString = Object.entries(styles)
    .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
    .join('; ');

  switch (el.type) {
    case 'heading':
      return `<h${el.props.level || 1} style="${styleString}">${el.props.content}</h${el.props.level || 1}>`;
    case 'text':
      return `<p style="${styleString}">${el.props.content}</p>`;
    case 'image':
      return `<img src="${el.props.src}" alt="${el.props.alt}" style="${styleString}">`;
    case 'button':
      return `<button style="${styleString}">${el.props.content}</button>`;
    case 'container':
    case 'grid':
      const children = (el.children || []).map((child: any) => renderElement(child)).join('');
      return `<div style="${styleString}">${children}</div>`;
    default:
      return '';
  }
}
