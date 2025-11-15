'use client';

import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const colorThemes = {
  emerald: {
    bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    icon: 'bg-emerald-500',
    text: 'text-emerald-600',
    trend: 'text-emerald-500',
  },
  rose: {
    bg: 'bg-gradient-to-br from-rose-50 to-rose-100',
    icon: 'bg-rose-500',
    text: 'text-rose-600',
    trend: 'text-rose-500',
  },
  blue: {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    icon: 'bg-blue-500',
    text: 'text-blue-600',
    trend: 'text-blue-500',
  },
  amber: {
    bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
    icon: 'bg-amber-500',
    text: 'text-amber-600',
    trend: 'text-amber-500',
  },
};

export default function StatsCard({
  title,
  value,
  trend,
  trendDirection = 'up',
  icon: Icon,
  color = 'emerald',
  delay = 0,
}) {
  const theme = colorThemes[color] || colorThemes.emerald;
  const TrendIcon = trendDirection === 'up' ? FiTrendingUp : FiTrendingDown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`${theme.bg} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`${theme.icon} p-3 rounded-lg shadow-md`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {trend && (
          <div className="flex items-center gap-1">
            <TrendIcon className={`h-4 w-4 ${theme.trend}`} />
            <span className={`text-sm font-medium ${theme.trend}`}>
              {trend}
            </span>
          </div>
        )}
      </div>

      <div>
        <p className="text-sm text-neutral-600 mb-1">{title}</p>
        <p className={`text-3xl font-bold ${theme.text}`}>
          {value}
        </p>
      </div>
    </motion.div>
  );
}


