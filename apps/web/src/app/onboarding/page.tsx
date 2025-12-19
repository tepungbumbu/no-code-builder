'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useProjectsStore } from '@/store/projects-store';
import { Button } from '@/components/ui/Button';
import { generateId } from '@/lib/utils';
import type { PageElement } from '@/lib/types';

export default function OnboardingPage() {
  const router = useRouter();
  const { createProject } = useProjectsStore();
  const [loading, setLoading] = useState(false);

  const handleSelectTemplate = async (template: typeof templates[0]) => {
    setLoading(true);
    try {
      const project = await createProject({
        name: 'My Website',
        template: template.id,
      });
      router.push(`/editor/${project.id}`);
    } catch (error) {
      console.error('Failed to create project:', error);
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    setLoading(true);
    try {
      const project = await createProject({
        name: 'Untitled Project',
      });
      router.push(`/editor/${project.id}`);
    } catch (error) {
      console.error('Failed to create project:', error);
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              Choose a Template to Get Started
            </h1>
            <p className="text-lg text-neutral-600">
              Or start from scratch with a blank canvas
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleSelectTemplate(template)}
                disabled={loading}
                className="clay-card p-6 text-left hover:shadow-clay-lg transition-all duration-300 disabled:opacity-50"
              >
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-5xl">{template.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {template.description}
                </p>
              </button>
            ))}
          </div>

          {/* Skip Button */}
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handleSkip}
              loading={loading}
              disabled={loading}
            >
              Start with Blank Canvas
            </Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

const templates = [
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Perfect for product launches and marketing campaigns',
    icon: '🚀',
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Showcase your work and projects beautifully',
    icon: '💼',
  },
  {
    id: 'blog',
    name: 'Blog',
    description: 'Start sharing your thoughts and stories',
    icon: '✍️',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    description: 'Sell products online with style',
    icon: '🛍️',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Professional website for your business',
    icon: '🏢',
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Menu and reservation system included',
    icon: '🍽️',
  },
];
