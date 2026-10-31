import { BookOpen, Brain, BookMarked, PenLine, Headphones, Mic } from 'lucide-react'
import { SKILLS, lessons } from '../data/lessons'

const skillIcons = {
  grammar: Brain,
  vocabulary: BookOpen,
  reading: BookMarked,
  writing: PenLine,
  listening: Headphones,
  speaking: Mic,
}

const skillColors = {
  grammar: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900',
  vocabulary: 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950 dark:text-indigo-400 dark:border-indigo-900',
  reading: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900',
  writing: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-900',
  listening: 'bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-950 dark:text-violet-400 dark:border-violet-900',
  speaking: 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950 dark:text-rose-400 dark:border-rose-900',
}

function SkillsSection({ selectedLevel = 'a1', onSelectSkill }) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Ko‘nikmalar (Skills)
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {SKILLS.map((skill) => {
          const Icon = skillIcons[skill.id]
          const count = lessons.filter(
            (l) => l.level === selectedLevel && l.skill === skill.id
          ).length

          return (
            <button
              key={skill.id}
              onClick={() => onSelectSkill?.(skill.id)}
              className={`flex flex-col items-center gap-3 p-5 rounded-2xl border transition hover:shadow-md ${skillColors[skill.id]}`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/70 dark:bg-black/20 flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-center">
                <div className="font-semibold text-sm">{skill.nameUz}</div>
                <div className="text-xs opacity-70 mt-0.5">{count} dars</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SkillsSection