'use client';
import React, { useState } from 'react';
import { IoCheckmarkOutline, IoFlashOutline, IoPeopleOutline, IoRocketOutline } from 'react-icons/io5';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    desc: 'For individuals just getting started.',
    icon: <IoRocketOutline size={20} />,
    color: 'text-gray-600',
    accent: 'border-gray-200',
    btn: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    features: ['Up to 50 tasks', '2 team members', 'Basic analytics', '7-day history'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$12',
    period: '/month',
    desc: 'For professionals who need more power.',
    icon: <IoFlashOutline size={20} />,
    color: 'text-blue-600',
    accent: 'border-blue-500 ring-2 ring-blue-100',
    btn: 'bg-blue-600 text-white hover:bg-blue-700',
    badge: 'Most Popular',
    features: ['Unlimited tasks', '10 team members', 'Advanced analytics', 'Full history', 'Priority support', 'Custom labels'],
  },
  {
    id: 'team',
    name: 'Team',
    price: '$39',
    period: '/month',
    desc: 'For growing teams that need collaboration.',
    icon: <IoPeopleOutline size={20} />,
    color: 'text-indigo-600',
    accent: 'border-indigo-200',
    btn: 'bg-indigo-600 text-white hover:bg-indigo-700',
    features: ['Everything in Pro', 'Unlimited members', 'Admin controls', 'SSO / SAML', 'Audit logs', 'SLA support'],
  },
];

const PlanCards = () => {
  const [current] = useState('free');

  return (
    <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
      <h2 className='text-sm font-semibold text-gray-800 mb-1'>Choose a Plan</h2>
      <p className='text-xs text-gray-400 mb-6'>Upgrade anytime. Cancel anytime.</p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {plans.map((plan) => (
          <div key={plan.id} className={`relative flex flex-col rounded-xl border ${plan.accent} p-5 transition-all`}>
            {plan.badge && (
              <span className='absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-3 py-0.5 text-xs font-semibold text-white shadow'>
                {plan.badge}
              </span>
            )}
            <div className={`flex items-center gap-2 mb-3 ${plan.color}`}>
              {plan.icon}
              <span className='font-semibold text-sm text-gray-800'>{plan.name}</span>
            </div>
            <div className='mb-2'>
              <span className='text-3xl font-bold text-gray-900'>{plan.price}</span>
              <span className='text-sm text-gray-400'>{plan.period}</span>
            </div>
            <p className='text-xs text-gray-500 mb-4'>{plan.desc}</p>
            <ul className='flex flex-col gap-1.5 mb-5 flex-1'>
              {plan.features.map((f) => (
                <li key={f} className='flex items-start gap-2 text-xs text-gray-600'>
                  <IoCheckmarkOutline size={13} className='shrink-0 mt-0.5 text-emerald-500' />
                  {f}
                </li>
              ))}
            </ul>
            <button
              disabled={plan.id === current}
              className={`w-full rounded-lg py-2 text-sm font-medium transition-all ${plan.id === current ? 'bg-gray-100 text-gray-400 cursor-default' : plan.btn}`}
            >
              {plan.id === current ? 'Current Plan' : `Upgrade to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanCards;
