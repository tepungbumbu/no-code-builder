'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  const router = useRouter();
  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50">
      {/* Navigation */}
      <nav className="clay-card mx-6 mt-6 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-2xl font-bold text-neutral-900">NoCode Builder</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-bold text-neutral-900 leading-tight">
            Build Websites
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              Without Code
            </span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Create stunning, professional websites with our intuitive drag-and-drop editor. 
            No coding skills required. Just your creativity.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/register">
              <Button variant="primary" size="lg">
                Start Building Free
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-neutral-900 mb-16">
          Everything You Need to Build Amazing Sites
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="clay-card p-8 hover:shadow-clay-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-6">
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-neutral-900 mb-16">
          Simple, Transparent Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`clay-card p-8 ${plan.popular ? 'ring-4 ring-primary-500 shadow-clay-lg' : ''}`}
            >
              {plan.popular && (
                <div className="bg-primary-600 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-neutral-900">${plan.price}</span>
                <span className="text-neutral-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register">
                <Button 
                  variant={plan.popular ? 'primary' : 'outline'} 
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <span className="text-xl font-bold">NoCode Builder</span>
              </div>
              <p className="text-neutral-400">
                Build amazing websites without writing a single line of code.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
            <p>&copy; 2024 NoCode Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: '🎨',
    title: 'Drag & Drop Editor',
    description: 'Intuitive visual editor with drag-and-drop functionality. Build layouts faster than ever.',
  },
  {
    icon: '📱',
    title: 'Responsive Design',
    description: 'Your websites look perfect on all devices. Edit separately for desktop, tablet, and mobile.',
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Optimized performance and loading times. Your visitors will love the speed.',
  },
  {
    icon: '🔧',
    title: 'Powerful Components',
    description: 'Pre-built components library with buttons, forms, galleries, and more.',
  },
  {
    icon: '💾',
    title: 'Export Code',
    description: 'Export clean HTML, CSS, and JavaScript. Own your code completely.',
  },
  {
    icon: '🚀',
    title: 'One-Click Publish',
    description: 'Deploy your website instantly with a single click. No server setup required.',
  },
];

const plans = [
  {
    name: 'Free',
    price: 0,
    popular: false,
    features: [
      '3 projects',
      'Basic components',
      '500MB storage',
      'Community support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: 19,
    popular: true,
    features: [
      'Unlimited projects',
      'All components',
      '10GB storage',
      'Priority support',
      'Custom domain',
      'Export code',
    ],
    cta: 'Start Pro Trial',
  },
  {
    name: 'Enterprise',
    price: 99,
    popular: false,
    features: [
      'Everything in Pro',
      'Unlimited storage',
      'Team collaboration',
      'Advanced analytics',
      'Custom integrations',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
  },
];
