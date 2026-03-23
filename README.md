# The Devs

**Structured Execution System for Future Developers**

An AI-powered web application designed for engineering students to build skills, track progress, and launch their careers through structured learning roadmaps, daily tasks, and real-world projects.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** Clerk Authentication
- **AI:** OpenAI GPT-4
- **Rate Limiting:** Upstash Redis

## ✨ Features

### AI Roadmap Generator
- Personalized learning paths based on your goals
- Multiple specializations: Full Stack, AI/ML, DevOps, Data Science
- Phase-based progression: Beginner → Intermediate → Advanced

### Daily Task System
- Structured daily tasks aligned with your roadmap
- Progress tracking with streaks and XP
- Gamified learning experience

### Project Portfolio
- Real-world projects for each specialization
- Step-by-step guidance
- Portfolio-ready project submissions

### Career Launchpad
- Job listings for freshers and interns
- Resume building with AI assistance
- Industry-specific opportunities

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key
- Clerk account for authentication

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd the-devs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
the-devs/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── app/
│   │   ├── page.tsx        # Landing page
│   │   ├── layout.tsx      # Root layout
│   │   ├── globals.css     # Global styles
│   │   └── dashboard/      # Dashboard routes
│   └── components/        # React components
├── .env.example           # Environment template
└── package.json
```

## 🎮 Gamification

- **XP System:** Earn experience points by completing tasks
- **Levels:** Progress through levels as you gain XP
- **Streaks:** Maintain daily streaks for bonus rewards
- **Projects:** Build portfolio-worthy projects

## 📄 License

MIT License - See LICENSE file for details.
