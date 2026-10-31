import { useState } from 'react'
import { 
  BookOpen, Brain, BookMarked, PenLine, Headphones, Mic,
  Trophy, Flame, Target, ChevronRight, CheckCircle2, Clock
} from 'lucide-react'

const skills = [
  { id: 'grammar', name: 'Grammar', nameUz: 'Grammatika', icon: Brain, color: 'bg-blue-500', light: 'bg-blue-50 text-blue-700 border-blue-100' },
  { id: 'vocabulary', name: 'Vocabulary', nameUz: 'Lug‘at', icon: BookOpen, color: 'bg-indigo-500', light: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
  { id: 'reading', name: 'Reading', nameUz: 'O‘qish', icon: BookMarked, color: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { id: 'writing', name: 'Writing', nameUz: 'Yozish', icon: PenLine, color: 'bg-amber-500', light: 'bg-amber-50 text-amber-700 border-amber-100' },
  { id: 'listening', name: 'Listening', nameUz: 'Tinglash', icon: Headphones, color: 'bg-violet-500', light: 'bg-violet-50 text-violet-700 border-violet-100' },
  { id: 'speaking', name: 'Speaking', nameUz: 'Gapirish', icon: Mic, color: 'bg-rose-500', light: 'bg-rose-50 text-rose-700 border-rose-100' },
]

const levels = [
  { id: 'a1', code: 'A1', name: 'Beginner', progress: 100 },
  { id: 'a2', code: 'A2', name: 'Elementary', progress: 35 },
  { id: 'b1', code: 'B1', name: 'Intermediate', progress: 0 },
  { id: 'b2', code: 'B2', name: 'Upper-Int.', progress: 0 },
  { id: 'c1', code: 'C1', name: 'Advanced', progress: 0 },
]

function DashboardPage() {
  const [selectedLevel, setSelectedLevel] = useState('a1')
  const [selectedSkill, setSelectedSkill] = useState('grammar')

  const currentLevel = levels.find(l => l.id === selectedLevel)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">ES</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">EnglishStep</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
              Progress
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
              Sozlamalar
            </button>
            <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">
              O
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600 mb-1">ENGLISHSTEP • SHAXSIY KABINET</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Salom, Og‘abek! 👋
          </h1>
          <p className="mt-2 text-gray-600">
            Darslarni navbat bilan o‘rganing. Har bir testdan muvaffaqiyatli o‘ting.
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-blue-600 rounded-2xl p-6 sm:p-8 text-white mb-10 shadow-lg shadow-blue-600/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Sizning progress</p>
              <div className="text-4xl font-bold">{currentLevel?.progress || 0}%</div>
              <p className="text-blue-100 mt-1 text-sm">
                {currentLevel?.code} darajasi • {currentLevel?.progress === 100 ? 'Tugallangan' : 'Davom etmoqda'}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-amber-300 mb-1">
                  <Flame className="w-5 h-5" />
                  <span className="text-xl font-bold">7</span>
                </div>
                <p className="text-xs text-blue-100">ketma-ket kun</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-white mb-1">
                  <Trophy className="w-5 h-5" />
                  <span className="text-xl font-bold">12</span>
                </div>
                <p className="text-xs text-blue-100">tugatilgan dars</p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 h-2.5 bg-blue-500/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${currentLevel?.progress || 0}%` }}
            />
          </div>

          {currentLevel?.progress === 100 && (
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-amber-200">
              <Trophy className="w-4 h-4" />
              {currentLevel.code} kursi muvaffaqiyatli yakunlandi!
            </div>
          )}
        </div>

        {/* Levels */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">CEFR Darajalari</h2>
          <div className="flex flex-wrap gap-3">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition border ${
                  selectedLevel === level.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {level.code}
                {level.progress === 100 && (
                  <CheckCircle2 className="inline-block w-4 h-4 ml-1.5 -mt-0.5" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ko‘nikmalar (Skills)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {skills.map((skill) => {
              const Icon = skill.icon
              const isActive = selectedSkill === skill.id
              return (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill.id)}
                  className={`flex flex-col items-center gap-3 p-5 rounded-2xl border transition ${
                    isActive
                      ? `${skill.light} border-current shadow-sm ring-2 ring-offset-1 ring-current/20`
                      : 'bg-white border-gray-100 hover:shadow-md hover:border-gray-200'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isActive ? 'bg-white/80' : skill.color + ' text-white'}`}>
                    <Icon className={`w-5 h-5 ${isActive ? '' : 'text-white'}`} />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{skill.nameUz}</div>
                    <div className="text-xs opacity-60 mt-0.5">{skill.name}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Lessons preview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {currentLevel?.code} • {skills.find(s => s.id === selectedSkill)?.nameUz}
            </h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Barchasini ko‘rish
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-blue-100 transition group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg">
                    {currentLevel?.code} • Dars {num}
                  </span>
                  {num <= 3 ? (
                    <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Tugallangan
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      15 daqiqa
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition">
                  {selectedSkill === 'grammar' && num === 1 && 'To be: am, is, are'}
                  {selectedSkill === 'grammar' && num === 2 && 'Subject pronouns'}
                  {selectedSkill === 'grammar' && num === 3 && 'Articles: a / an'}
                  {selectedSkill === 'grammar' && num > 3 && `Grammar darsi ${num}`}
                  {selectedSkill !== 'grammar' && `${skills.find(s => s.id === selectedSkill)?.name} darsi ${num}`}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  Qisqa tushuntirish va mashqlar bilan o‘rganing.
                </p>

                <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${
                  num <= 3
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                }`}>
                  {num <= 3 ? 'Qayta o‘rganish' : 'Boshlash'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage