'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuthStore } from '@/store/auth-store';
import { useProjectsStore } from '@/store/projects-store';
import { Button } from '@/components/ui/Button';
import { ProjectsSkeleton } from '@/components/ui/Skeleton';
import { formatDate, formatBytes } from '@/lib/utils';
import type { Project } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { projects, loading, fetchProjects, createProject, deleteProject } = useProjectsStore();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = async () => {
    if (!user) return;

    // Check plan limits
    const limits = { free: 3, pro: 999, enterprise: 9999 };
    if (projects.length >= limits[user.plan]) {
      setShowUpgradeModal(true);
      return;
    }

    try {
      const project = await createProject({
        name: `New Project ${projects.length + 1}`,
      });
      router.push(`/editor/${project.id}`);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteProject(id);
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50">
        {/* Header */}
        <header className="clay-card mx-6 mt-6 px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-2xl font-bold text-neutral-900">NoCode Builder</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-neutral-900">{user?.email}</p>
                <p className="text-xs text-neutral-600 capitalize">{user?.plan} Plan</p>
              </div>
              <Button variant="ghost" onClick={() => logout()}>
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="clay-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Total Projects</p>
                  <p className="text-3xl font-bold text-neutral-900">{projects.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                  <span className="text-2xl">📁</span>
                </div>
              </div>
            </div>
            <div className="clay-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Storage Used</p>
                  <p className="text-3xl font-bold text-neutral-900">500MB</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center">
                  <span className="text-2xl">💾</span>
                </div>
              </div>
            </div>
            <div className="clay-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Current Plan</p>
                  <p className="text-3xl font-bold text-neutral-900 capitalize">{user?.plan}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-neutral-900">My Projects</h1>
            <Button variant="primary" size="lg" onClick={handleCreateProject}>
              + New Project
            </Button>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <ProjectsSkeleton />
          ) : projects.length === 0 ? (
            <div className="clay-card p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">🎨</span>
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">No Projects Yet</h2>
              <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                Start building your first website by creating a new project
              </p>
              <Button variant="primary" size="lg" onClick={handleCreateProject}>
                Create Your First Project
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="clay-card p-6 space-y-4 hover:shadow-clay-lg transition-all duration-300">
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
                    <span className="text-5xl">🌐</span>
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">{project.name}</h3>
                    <p className="text-sm text-neutral-600">
                      Updated {formatDate(project.updatedAt)}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        project.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-neutral-200 text-neutral-700'
                      }`}>
                        {project.status === 'published' ? '✓ Published' : 'Draft'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="primary"
                      className="flex-1"
                      onClick={() => router.push(`/editor/${project.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="clay-card max-w-md w-full p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Upgrade Your Plan</h2>
              <p className="text-neutral-600 mb-6">
                You've reached the project limit for your {user?.plan} plan. Upgrade to create more projects and unlock additional features.
              </p>
              <div className="flex space-x-4">
                <Button variant="primary" className="flex-1">
                  Upgrade Now
                </Button>
                <Button variant="outline" onClick={() => setShowUpgradeModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
