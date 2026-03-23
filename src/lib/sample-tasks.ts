export type TaskType = 'video' | 'article' | 'practice' | 'project';

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  duration: string;
  xp: number;
  description: string;
  completed: boolean;
  completedAt?: Date;
}

export const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Complete HTML Basics Module',
    type: 'video',
    duration: '45 min',
    xp: 50,
    description: 'Watch the HTML fundamentals video series and learn semantic structure',
    completed: false,
  },
  {
    id: '2',
    title: 'Build a Todo App Component',
    type: 'practice',
    duration: '30 min',
    xp: 75,
    description: 'Implement a fully functional Todo app with React hooks',
    completed: false,
  },
  {
    id: '3',
    title: 'Read: Understanding Closures in JavaScript',
    type: 'article',
    duration: '15 min',
    xp: 30,
    description: 'Deep dive into closures, scope chain, and lexical environment',
    completed: false,
  },
  {
    id: '4',
    title: 'Portfolio Homepage Project',
    type: 'project',
    duration: '2 hours',
    xp: 150,
    description: 'Build a responsive portfolio homepage with modern CSS',
    completed: false,
  },
  {
    id: '5',
    title: 'CSS Flexbox & Grid Tutorial',
    type: 'video',
    duration: '1 hour',
    xp: 60,
    description: 'Master modern CSS layout techniques with Flexbox and Grid',
    completed: false,
  },
  {
    id: '6',
    title: 'Practice: Array Methods in JavaScript',
    type: 'practice',
    duration: '45 min',
    xp: 80,
    description: 'Solve 20 array method exercises - map, filter, reduce, and more',
    completed: false,
  },
  {
    id: '7',
    title: 'Read: REST API Design Best Practices',
    type: 'article',
    duration: '20 min',
    xp: 40,
    description: 'Learn how to design clean, scalable REST APIs',
    completed: false,
  },
  {
    id: '8',
    title: 'Build a Weather Dashboard',
    type: 'project',
    duration: '3 hours',
    xp: 200,
    description: 'Create a weather app using a public API and modern UI',
    completed: false,
  },
];

export const taskTypeConfig: Record<TaskType, { icon: string; color: string; bgColor: string; label: string }> = {
  video: {
    icon: '📹',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    label: 'Video',
  },
  article: {
    icon: '📄',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    label: 'Article',
  },
  practice: {
    icon: '💻',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    label: 'Practice',
  },
  project: {
    icon: '🚀',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    label: 'Project',
  },
};

export const levelThresholds = [
  { level: 1, minXP: 0, maxXP: 500 },
  { level: 2, minXP: 500, maxXP: 1200 },
  { level: 3, minXP: 1200, maxXP: 2100 },
  { level: 4, minXP: 2100, maxXP: 3200 },
  { level: 5, minXP: 3200, maxXP: 4500 },
  { level: 6, minXP: 4500, maxXP: 6000 },
  { level: 7, minXP: 6000, maxXP: 7700 },
  { level: 8, minXP: 7700, maxXP: 9600 },
  { level: 9, minXP: 9600, maxXP: 11700 },
  { level: 10, minXP: 11700, maxXP: Infinity },
];

export function getLevelFromXP(xp: number): number {
  for (const threshold of levelThresholds) {
    if (xp >= threshold.minXP && xp < threshold.maxXP) {
      return threshold.level;
    }
  }
  return 10;
}

export function getXPProgress(xp: number): { current: number; required: number; percentage: number } {
  const level = getLevelFromXP(xp);
  const threshold = levelThresholds.find(t => t.level === level);
  if (!threshold) return { current: 0, required: 1000, percentage: 0 };
  
  const current = xp - threshold.minXP;
  const required = threshold.maxXP === Infinity ? 1000 : threshold.maxXP - threshold.minXP;
  const percentage = (current / required) * 100;
  
  return { current, required, percentage };
}
