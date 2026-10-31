import { useState, useEffect } from 'react'
import {
  BookOpen, Brain, BookMarked, PenLine, Headphones, Mic,
  Trophy, Flame, CheckCircle2, Clock, ChevronRight, ArrowLeft,
  Moon, Sun, Play, XCircle, RotateCcw, Target
} from 'lucide-react'

// ==================== MA'LUMOTLAR ====================
const SKILLS = [
  { id: 'grammar', name: 'Grammar', nameUz: 'Grammatika', icon: Brain, color: 'blue' },
  { id: 'vocabulary', name: 'Vocabulary', nameUz: 'Lug‘at', icon: BookOpen, color: 'indigo' },
  { id: 'reading', name: 'Reading', nameUz: 'O‘qish', icon: BookMarked, color: 'emerald' },
  { id: 'writing', name: 'Writing', nameUz: 'Yozish', icon: PenLine, color: 'amber' },
  { id: 'listening', name: 'Listening', nameUz: 'Tinglash', icon: Headphones, color: 'violet' },
  { id: 'speaking', name: 'Speaking', nameUz: 'Gapirish', icon: Mic, color: 'rose' },
]

const LEVELS = [
  { id: 'a1', code: 'A1', name: 'Beginner' },
  { id: 'a2', code: 'A2', name: 'Elementary' },
  { id: 'b1', code: 'B1', name: 'Intermediate' },
  { id: 'b2', code: 'B2', name: 'Upper-Intermediate' },
  { id: 'c1', code: 'C1', name: 'Advanced' },
]

const LESSONS = [
  // A1 Grammar
  { id: 'a1-g-1', level: 'a1', skill: 'grammar', order: 1, title: 'To be: am, is, are', desc: 'Kimligingiz va holatingiz haqida gap tuzing.', duration: 15,
    content: 'Fe\'l "to be" (bo\'lmoq) ingliz tilida eng muhim fe\'llardan biri.\n\n• I am a student.\n• You are a teacher.\n• He/She/It is happy.\n• We/You/They are friends.\n\nInkor: am not / is not (isn\'t) / are not (aren\'t)\nSo\'roq: Am I...? Is he...? Are they...?' },
  { id: 'a1-g-2', level: 'a1', skill: 'grammar', order: 2, title: 'Subject pronouns', desc: 'I, you, he, she, it, we, they.', duration: 15,
    content: 'Egа olmoshlari:\n\n• I – men\n• You – sen / siz\n• He – u (erkak)\n• She – u (ayol)\n• It – u (narsa/hayvon)\n• We – biz\n• They – ular\n\nMisol: She is my sister. They are students.' },
  { id: 'a1-g-3', level: 'a1', skill: 'grammar', order: 3, title: 'Articles: a / an', desc: 'A va an artikllarini to‘g‘ri ishlatish.', duration: 15,
    content: 'A – undosh tovush oldidan: a book, a car\nAn – unli tovush oldidan: an apple, an hour\n\nThe – aniq narsa uchun: the sun, the book on the table.' },
  { id: 'a1-g-4', level: 'a1', skill: 'grammar', order: 4, title: 'Singular and plural nouns', desc: 'Otlarning birlik va ko‘plik shakllari.', duration: 15,
    content: 'Ko\'plik: odatda -s qo\'shiladi.\n• book → books\n• box → boxes\n• baby → babies\n• child → children (istisno)\n• man → men (istisno)' },
  { id: 'a1-g-5', level: 'a1', skill: 'grammar', order: 5, title: 'Possessive adjectives', desc: 'My, your, his, her, our, their.', duration: 15,
    content: 'Egalik sifatdoshlari:\n• my book – mening kitobim\n• your name – sening isming\n• his car – uning mashinasi\n• her bag – uning sumkasi\n• our house – bizning uyimiz\n• their friends – ularning do\'stlari' },
  { id: 'a1-g-6', level: 'a1', skill: 'grammar', order: 6, title: 'Present Simple positive', desc: 'Kundalik odatlar.', duration: 20,
    content: 'Present Simple – hozirgi oddiy zamon.\n\nI/You/We/They + V1\nHe/She/It + V1 + s/es\n\n• I work every day.\n• She works in a bank.\n• They play football.' },

  // A1 Vocabulary
  { id: 'a1-v-1', level: 'a1', skill: 'vocabulary', order: 1, title: 'Greetings & Introductions', desc: 'Salomlashish.', duration: 12,
    content: 'Hello! / Hi!\nGood morning / afternoon / evening\nMy name is ...\nNice to meet you.\nHow are you? – I\'m fine, thank you.' },
  { id: 'a1-v-2', level: 'a1', skill: 'vocabulary', order: 2, title: 'Numbers 1–20', desc: 'Raqamlar.', duration: 12,
    content: '1 one, 2 two, 3 three, 4 four, 5 five\n6 six, 7 seven, 8 eight, 9 nine, 10 ten\n11 eleven, 12 twelve, 13 thirteen...\n20 twenty' },
  { id: 'a1-v-3', level: 'a1', skill: 'vocabulary', order: 3, title: 'Family members', desc: 'Oilа a’zolari.', duration: 12,
    content: 'mother – ona\nfather – ota\nbrother – aka/uka\nsister – opa/singil\ngrandmother – buvi\ngrandfather – bobo\nson – o\'g\'il\ndaughter – qiz' },

  // A1 Reading / Listening / Speaking / Writing
  { id: 'a1-r-1', level: 'a1', skill: 'reading', order: 1, title: 'My name is Anna', desc: 'Tanishuv matni.', duration: 10,
    content: 'My name is Anna. I am 20 years old. I am a student. I live in Tashkent. I have one brother and one sister. I like English and music.' },
  { id: 'a1-l-1', level: 'a1', skill: 'listening', order: 1, title: 'Hello and goodbye', desc: 'Salomlashish dialogi.', duration: 8,
    content: 'A: Hello! What is your name?\nB: My name is Tom. Nice to meet you.\nA: Nice to meet you too. Where are you from?\nB: I am from London.' },
  { id: 'a1-s-1', level: 'a1', skill: 'speaking', order: 1, title: 'Introduce yourself', desc: 'O‘zingizni tanishtiring.', duration: 10,
    content: 'Gapiring:\n1. My name is ...\n2. I am ... years old.\n3. I am from ...\n4. I am a student / teacher / ...\n5. I like ...' },
  { id: 'a1-w-1', level: 'a1', skill: 'writing', order: 1, title: 'Write about yourself', desc: 'O‘zingiz haqida yozing.', duration: 15,
    content: '5–6 ta gap yozing:\n- Ismingiz\n- Yoshingiz\n- Qayerdansiz\n- Kasbingiz / o\'qishingiz\n- Nimalarni yoqtirasiz' },

  // A2 samples
  { id: 'a2-g-1', level: 'a2', skill: 'grammar', order: 1, title: 'Past Simple: regular verbs', desc: 'O‘tgan zamon.', duration: 20,
    content: 'Regular fe\'llar: V1 + ed\n• work → worked\n• play → played\n• study → studied\n\nI worked yesterday. She played tennis last week.' },
  { id: 'a2-v-1', level: 'a2', skill: 'vocabulary', order: 1, title: 'Jobs', desc: 'Kasblar.', duration: 15,
    content: 'teacher – o\'qituvchi\ndoctor – shifokor\nengineer – muhandis\nstudent – talaba\ndriver – haydovchi' },
]

// Har bir dars uchun test savollari
const QUIZZES = {
  'a1-g-1': [
    { q: 'I ___ a student.', options: ['am', 'is', 'are'], correct: 0 },
    { q: 'She ___ happy.', options: ['am', 'is', 'are'], correct: 1 },
    { q: 'They ___ friends.', options: ['am', 'is', 'are'], correct: 2 },
  ],
  'a1-g-2': [
    { q: '___ is my brother. (erkak)', options: ['He', 'She', 'It'], correct: 0 },
    { q: '___ are students.', options: ['He', 'She', 'They'], correct: 2 },
  ],
  'a1-g-3': [
    { q: 'This is ___ apple.', options: ['a', 'an', 'the'], correct: 1 },
    { q: 'I have ___ book.', options: ['a', 'an', 'the'], correct: 0 },
  ],
  'a1-g-4': [
    { q: 'one book → two ___', options: ['book', 'books', 'bookes'], correct: 1 },
    { q: 'one child → two ___', options: ['childs', 'children', 'childes'], correct: 1 },
  ],
  'a1-g-5': [
    { q: 'This is ___ book. (meniki)', options: ['my', 'your', 'his'], correct: 0 },
    { q: 'That is ___ car. (uning - erkak)', options: ['her', 'his', 'their'], correct: 1 },
  ],
  'a1-g-6': [
    { q: 'She ___ in a bank.', options: ['work', 'works', 'working'], correct: 1 },
    { q: 'I ___ every day.', options: ['work', 'works', 'working'], correct: 0 },
  ],
  'a1-v-1': [
    { q: '"Salom" inglizcha?', options: ['Goodbye', 'Hello', 'Thanks'], correct: 1 },
    { q: 'Nice to ___ you.', options: ['meet', 'see', 'go'], correct: 0 },
  ],
  'a1-v-2': [
    { q: '5 = ?', options: ['four', 'five', 'six'], correct: 1 },
    { q: '10 = ?', options: ['ten', 'eleven', 'twelve'], correct: 0 },
  ],
  'a1-v-3': [
    { q: 'mother = ?', options: ['ota', 'ona', 'aka'], correct: 1 },
    { q: 'brother = ?', options: ['opa', 'aka/uka', 'buvi'], correct: 1 },
  ],
  'a1-r-1': [
    { q: 'Anna necha yoshda?', options: ['18', '20', '25'], correct: 1 },
    { q: 'Anna qayerda yashaydi?', options: ['Samarqand', 'Tashkent', 'Buxoro'], correct: 1 },
  ],
  'a1-l-1': [
    { q: 'Tom qayerdan?', options: ['Paris', 'London', 'Berlin'], correct: 1 },
  ],
  'a1-s-1': [
    { q: 'O\'zingizni tanishtirishda nima demaysiz?', options: ['My name is...', 'I am from...', 'I am a car'], correct: 2 },
  ],
  'a1-w-1': [
    { q: 'O\'zingiz haqida yozishda qaysi gap to\'g\'ri?', options: ['I is student', 'I am a student', 'I are student'], correct: 1 },
  ],
  'a2-g-1': [
    { q: 'work ning o\'tgan zamoni?', options: ['worked', 'work', 'working'], correct: 0 },
  ],
  'a2-v-1': [
    { q: 'teacher = ?', options: ['shifokor', 'o\'qituvchi', 'haydovchi'], correct: 1 },
  ],
}

// Skill yakuniy testlari
const FINAL_QUIZZES = {
  'a1-grammar': [
    { q: 'I ___ from Uzbekistan.', options: ['am', 'is', 'are'], correct: 0 },
    { q: 'She ___ a teacher.', options: ['am', 'is', 'are'], correct: 1 },
    { q: 'This is ___ orange.', options: ['a', 'an', 'the'], correct: 1 },
    { q: 'They ___ my friends.', options: ['am', 'is', 'are'], correct: 2 },
    { q: 'He ___ every day.', options: ['work', 'works', 'working'], correct: 1 },
  ],
  'a1-vocabulary': [
    { q: 'Hello = ?', options: ['Xayr', 'Salom', 'Rahmat'], correct: 1 },
    { q: 'mother = ?', options: ['ota', 'ona', 'aka'], correct: 1 },
    { q: '5 = ?', options: ['four', 'five', 'six'], correct: 1 },
  ],
}

const colorMap = {
  blue: { bg: 'bg-blue-500', light: 'bg-blue-50 text-blue-700 border-blue-200', ring: 'ring-blue-500' },
  indigo: { bg: 'bg-indigo-500', light: 'bg-indigo-50 text-indigo-700 border-indigo-200', ring: 'ring-indigo-500' },
  emerald: { bg: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-700 border-emerald-200', ring: 'ring-emerald-500' },
  amber: { bg: 'bg-amber-500', light: 'bg-amber-50 text-amber-700 border-amber-200', ring: 'ring-amber-500' },
  violet: { bg: 'bg-violet-500', light: 'bg-violet-50 text-violet-700 border-violet-200', ring: 'ring-violet-500' },
  rose: { bg: 'bg-rose-500', light: 'bg-rose-50 text-rose-700 border-rose-200', ring: 'ring-rose-500' },
}

// ==================== APP ====================
export default function App() {
  const [page, setPage] = useState('dashboard')
  const [level, setLevel] = useState('a1')
  const [skill, setSkill] = useState('grammar')
  const [currentLesson, setCurrentLesson] = useState(null)
  const [dark, setDark] = useState(() => localStorage.getItem('es-theme') === 'dark')
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem('es-completed') || '[]') } catch { return [] }
  })
  const [quizPassed, setQuizPassed] = useState(() => {
    try { return JSON.parse(localStorage.getItem('es-quiz-passed') || '[]') } catch { return [] }
  })

  // Quiz state
  const [quizMode, setQuizMode] = useState(null) // null | 'lesson' | 'final'
  const [quizQuestions, setQuizQuestions] = useState([])
  const [quizIndex, setQuizIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('es-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    localStorage.setItem('es-completed', JSON.stringify(completed))
  }, [completed])

  useEffect(() => {
    localStorage.setItem('es-quiz-passed', JSON.stringify(quizPassed))
  }, [quizPassed])

  const filteredLessons = LESSONS
    .filter(l => l.level === level && l.skill === skill)
    .sort((a, b) => a.order - b.order)

  const levelProgress = (lvl) => {
    const all = LESSONS.filter(l => l.level === lvl)
    if (!all.length) return 0
    return Math.round((all.filter(l => completed.includes(l.id)).length / all.length) * 100)
  }

  const skillProgress = (sk) => {
    const all = LESSONS.filter(l => l.level === level && l.skill === sk)
    if (!all.length) return 0
    return Math.round((all.filter(l => completed.includes(l.id)).length / all.length) * 100)
  }

  const isSkillComplete = () => {
    const all = filteredLessons
    return all.length > 0 && all.every(l => completed.includes(l.id))
  }

  const markComplete = (id) => {
    if (!completed.includes(id)) setCompleted([...completed, id])
  }

  const startLessonQuiz = (lesson) => {
    const qs = QUIZZES[lesson.id] || [
      { q: `${lesson.title} mavzusini tushundingizmi?`, options: ['Ha', 'Yo\'q', 'Qisman'], correct: 0 }
    ]
    setQuizQuestions(qs)
    setQuizIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizFinished(false)
    setQuizMode('lesson')
    setCurrentLesson(lesson)
  }

  const startFinalQuiz = () => {
    const key = `${level}-${skill}`
    const qs = FINAL_QUIZZES[key] || [
      { q: `${LEVELS.find(l => l.id === level)?.code} ${SKILLS.find(s => s.id === skill)?.nameUz} yakuniy testi`, options: ['Tayyorman', 'Hali emas', 'Qayta o\'rganaman'], correct: 0 }
    ]
    setQuizQuestions(qs)
    setQuizIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizFinished(false)
    setQuizMode('final')
  }

  const handleAnswer = (idx) => {
    if (showResult) return
    setSelectedAnswer(idx)
    setShowResult(true)
    if (idx === quizQuestions[quizIndex].correct) {
      setScore(s => s + 1)
    }
  }

  const nextQuestion = () => {
    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex(quizIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizFinished(true)
      if (quizMode === 'lesson' && currentLesson) {
        markComplete(currentLesson.id)
      }
      if (quizMode === 'final') {
        const key = `${level}-${skill}`
        if (!quizPassed.includes(key)) setQuizPassed([...quizPassed, key])
      }
    }
  }

  const goNextLesson = () => {
    const idx = filteredLessons.findIndex(l => l.id === currentLesson?.id)
    if (idx >= 0 && idx < filteredLessons.length - 1) {
      setCurrentLesson(filteredLessons[idx + 1])
      setQuizMode(null)
      setPage('lesson')
    } else {
      setQuizMode(null)
      setPage('lessons')
    }
  }

  // ========== NAVBAR ==========
  const Navbar = () => (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <button onClick={() => { setPage('dashboard'); setQuizMode(null) }} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">ES</div>
          <span className="font-bold text-gray-900 dark:text-white">EnglishStep</span>
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => setDark(!dark)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center font-semibold text-sm">O</div>
        </div>
      </div>
    </header>
  )

  // ========== QUIZ VIEW ==========
  if (quizMode) {
    const q = quizQuestions[quizIndex]
    const percent = quizFinished ? Math.round((score / quizQuestions.length) * 100) : 0
    const passed = percent >= 60

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="max-w-xl mx-auto px-4 py-8">
          {!quizFinished ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>Savol {quizIndex + 1} / {quizQuestions.length}</span>
                <span>{quizMode === 'final' ? 'Yakuniy test' : 'Dars testi'}</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }} />
              </div>

              <h2 className="text-lg font-semibold mb-6">{q.q}</h2>

              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  let cls = 'w-full text-left px-4 py-3 rounded-xl border transition '
                  if (showResult) {
                    if (i === q.correct) cls += 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-700 dark:text-emerald-300'
                    else if (i === selectedAnswer) cls += 'bg-red-50 border-red-300 text-red-800 dark:bg-red-950 dark:border-red-700 dark:text-red-300'
                    else cls += 'border-gray-200 dark:border-gray-700 opacity-50'
                  } else {
                    cls += selectedAnswer === i
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                  }
                  return (
                    <button key={i} onClick={() => handleAnswer(i)} disabled={showResult} className={cls}>
                      <span className="font-medium">{String.fromCharCode(65 + i)}.</span> {opt}
                      {showResult && i === q.correct && <CheckCircle2 className="inline w-4 h-4 ml-2 text-emerald-600" />}
                      {showResult && i === selectedAnswer && i !== q.correct && <XCircle className="inline w-4 h-4 ml-2 text-red-600" />}
                    </button>
                  )
                })}
              </div>

              {showResult && (
                <button onClick={nextQuestion} className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold">
                  {quizIndex + 1 < quizQuestions.length ? 'Keyingi savol' : 'Natijani ko‘rish'}
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 text-center">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${passed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                {passed ? <Trophy className="w-8 h-8" /> : <RotateCcw className="w-8 h-8" />}
              </div>
              <h2 className="text-2xl font-bold mb-2">{passed ? 'Tabriklaymiz!' : 'Yana urinib ko‘ring'}</h2>
              <p className="text-gray-500 mb-1">Natija: {score} / {quizQuestions.length}</p>
              <p className="text-3xl font-bold text-blue-600 mb-6">{percent}%</p>

              <div className="flex flex-col gap-3">
                {quizMode === 'lesson' && (
                  <>
                    <button onClick={goNextLesson} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold">
                      Keyingi darsga o‘tish
                    </button>
                    <button onClick={() => { setQuizMode(null); setPage('lessons') }} className="w-full py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-semibold">
                      Darslar ro‘yxatiga
                    </button>
                  </>
                )}
                {quizMode === 'final' && (
                  <>
                    {passed && (
                      <button onClick={() => { setQuizMode(null); setPage('dashboard') }} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold">
                        Dashboardga qaytish
                      </button>
                    )}
                    {!passed && (
                      <button onClick={() => startFinalQuiz()} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold">
                        Qayta ishlash
                      </button>
                    )}
                    <button onClick={() => { setQuizMode(null); setPage('lessons') }} className="w-full py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-semibold">
                      Darslarga qaytish
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    )
  }

  // ========== DASHBOARD ==========
  if (page === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">ENGLISHSTEP • SHAXSIY KABINET</p>
            <h1 className="text-3xl font-bold">Salom, Og‘abek! 👋</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">Darslarni o‘rganing, test topshiring va keyingi darajaga o‘ting.</p>
          </div>

          <div className="bg-blue-600 rounded-2xl p-6 text-white mb-8 shadow-lg shadow-blue-600/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-blue-100 text-sm mb-1">Umumiy progress ({LEVELS.find(l => l.id === level)?.code})</p>
                <div className="text-4xl font-bold">{levelProgress(level)}%</div>
                <p className="text-blue-100 text-sm mt-1">
                  {LESSONS.filter(l => l.level === level && completed.includes(l.id)).length} / {LESSONS.filter(l => l.level === level).length} dars
                </p>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-amber-300"><Flame className="w-5 h-5" /><span className="text-xl font-bold">7</span></div>
                  <p className="text-xs text-blue-100">ketma-ket kun</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1"><Trophy className="w-5 h-5" /><span className="text-xl font-bold">{completed.length}</span></div>
                  <p className="text-xs text-blue-100">tugatilgan</p>
                </div>
              </div>
            </div>
            <div className="mt-5 h-2.5 bg-blue-500/40 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${levelProgress(level)}%` }} />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">CEFR Darajalari</h2>
            <div className="flex flex-wrap gap-2">
              {LEVELS.map(l => (
                <button key={l.id} onClick={() => setLevel(l.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${level === l.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'}`}>
                  {l.code} {levelProgress(l.id) === 100 && <CheckCircle2 className="inline w-4 h-4 ml-1" />}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Ko‘nikmalar (Skills)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {SKILLS.map(s => {
                const Icon = s.icon
                const colors = colorMap[s.color]
                const prog = skillProgress(s.id)
                return (
                  <button key={s.id} onClick={() => { setSkill(s.id); setPage('lessons') }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition hover:shadow-md ${skill === s.id ? `${colors.light} ring-2 ${colors.ring}` : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${colors.bg}`}><Icon className="w-5 h-5" /></div>
                    <div className="text-center">
                      <div className="font-semibold text-sm">{s.nameUz}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{prog}%</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">{LEVELS.find(l => l.id === level)?.code} • {SKILLS.find(s => s.id === skill)?.nameUz}</h2>
              <button onClick={() => setPage('lessons')} className="text-sm text-blue-600 font-medium flex items-center gap-1">Barchasi <ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLessons.slice(0, 6).map(lesson => {
                const done = completed.includes(lesson.id)
                return (
                  <div key={lesson.id} onClick={() => { setCurrentLesson(lesson); setPage('lesson') }}
                    className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md transition cursor-pointer">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-medium px-2 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg">Dars {lesson.order}</span>
                      {done ? <span className="text-xs text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Tugallangan</span>
                        : <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {lesson.duration} daq</span>}
                    </div>
                    <h3 className="font-semibold mb-1">{lesson.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{lesson.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // ========== LESSONS LIST ==========
  if (page === 'lessons') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <button onClick={() => setPage('dashboard')} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 mb-6">
            <ArrowLeft className="w-4 h-4" /> Orqaga
          </button>

          <h1 className="text-2xl font-bold mb-1">{LEVELS.find(l => l.id === level)?.code} • {SKILLS.find(s => s.id === skill)?.nameUz}</h1>
          <p className="text-gray-500 mb-6">{filteredLessons.length} ta dars • Progress: {skillProgress(skill)}%</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {LEVELS.map(l => (
              <button key={l.id} onClick={() => setLevel(l.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${level === l.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'}`}>{l.code}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {SKILLS.map(s => (
              <button key={s.id} onClick={() => setSkill(s.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${skill === s.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'}`}>{s.nameUz}</button>
            ))}
          </div>

          {/* Yakuniy test tugmasi */}
          {isSkillComplete() && (
            <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-emerald-600" />
                <div>
                  <p className="font-semibold text-emerald-800 dark:text-emerald-300">Barcha darslar tugallandi!</p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">Yakuniy testni topshiring</p>
                </div>
              </div>
              <button onClick={startFinalQuiz} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm">
                Yakuniy testni boshlash
              </button>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLessons.map(lesson => {
              const done = completed.includes(lesson.id)
              return (
                <div key={lesson.id} onClick={() => { setCurrentLesson(lesson); setPage('lesson') }}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md transition cursor-pointer">
                  <div className="flex justify-between mb-3">
                    <span className="text-xs font-medium px-2.5 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg">{LEVELS.find(l => l.id === level)?.code} • Dars {lesson.order}</span>
                    {done ? <span className="text-xs text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Tugallangan</span>
                      : <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {lesson.duration} daq</span>}
                  </div>
                  <h3 className="font-semibold mb-1">{lesson.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{lesson.desc}</p>
                  <button className={`w-full py-2.5 rounded-xl text-sm font-semibold ${done ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                    {done ? 'Qayta o‘rganish' : 'Boshlash'}
                  </button>
                </div>
              )
            })}
          </div>

          {filteredLessons.length === 0 && (
            <div className="text-center py-16 text-gray-500">Bu daraja va skill uchun darslar hali qo‘shilmagan.</div>
          )}
        </main>
      </div>
    )
  }

  // ========== LESSON DETAIL ==========
  if (page === 'lesson' && currentLesson) {
    const idx = filteredLessons.findIndex(l => l.id === currentLesson.id)
    const hasNext = idx >= 0 && idx < filteredLessons.length - 1
    const done = completed.includes(currentLesson.id)

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <button onClick={() => setPage('lessons')} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 mb-6">
            <ArrowLeft className="w-4 h-4" /> Darslar ro‘yxatiga
          </button>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-3">
              <span className="font-medium">{LEVELS.find(l => l.id === currentLesson.level)?.code}</span>
              <span>•</span>
              <span>{SKILLS.find(s => s.id === currentLesson.skill)?.nameUz}</span>
              <span>•</span>
              <span>Dars {currentLesson.order}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-3">{currentLesson.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{currentLesson.desc}</p>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {currentLesson.duration} daqiqa</span>
              {done && <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 className="w-4 h-4" /> Tugallangan</span>}
            </div>

            {/* Content */}
            <div className="mb-8 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <h3 className="font-semibold mb-3">Dars mazmuni</h3>
              <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
                {currentLesson.content || 'Bu mavzu bo‘yicha tushuntirish tez orada qo‘shiladi.'}
              </pre>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => startLessonQuiz(currentLesson)}
                className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                {done ? 'Testni qayta ishlash' : 'Testni boshlash'}
              </button>

              {hasNext && (
                <button
                  onClick={() => setCurrentLesson(filteredLessons[idx + 1])}
                  className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  Keyingi dars
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return null
}