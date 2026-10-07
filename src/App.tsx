import { useState } from 'react';
import { trafficSigns, TrafficSign } from './data/signs';
import { roadRules, roadMarkings } from './data/rules';
import { quizQuestions, getShuffledQuestions, QuizQuestion } from './data/quiz';

// ============ SIGN CARD COMPONENT ============
function SignCard({ sign, onClick }: { sign: TrafficSign; onClick: () => void }) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
    onClick();
  };

  return (
    <div
      className="perspective-1000 cursor-pointer group"
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-56 transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl border-2 border-gray-200 flex flex-col items-center justify-center p-4 backface-hidden shadow-sm hover:shadow-md transition-shadow"
          style={{ backfaceVisibility: 'hidden', backgroundColor: sign.bgColor }}
        >
          <div className="text-4xl mb-2">{sign.icon}</div>
          <h3 className="font-bold text-center text-sm" style={{ color: sign.color }}>{sign.name}</h3>
          <span className="text-xs mt-1 px-2 py-0.5 rounded-full bg-white/50 capitalize">{sign.category}</span>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl border-2 border-gray-200 flex flex-col items-center justify-center p-4 backface-hidden shadow-sm bg-white"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="font-bold text-center text-sm text-gray-800 mb-1">{sign.name}</h3>
          <p className="text-xs text-gray-600 text-center italic mb-2">{sign.nameRw}</p>
          <p className="text-xs text-gray-700 text-center leading-relaxed">{sign.lesson}</p>
        </div>
      </div>
    </div>
  );
}

// ============ SIGN DETAIL MODAL ============
function SignDetail({ sign, onClose }: { sign: TrafficSign; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs px-2 py-1 rounded-full capitalize font-medium ${
            sign.category === 'warning' ? 'bg-amber-100 text-amber-800' :
            sign.category === 'regulatory' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>{sign.category}</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl font-bold border-2"
            style={{ backgroundColor: sign.bgColor, color: sign.color, borderColor: sign.color + '40' }}
          >
            {sign.icon}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{sign.name}</h3>
            <p className="text-sm text-gray-500 italic">{sign.nameRw}</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3">{sign.description}</p>
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold text-sm text-gray-800 mb-1">What to do:</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{sign.lesson}</p>
        </div>
      </div>
    </div>
  );
}

// ============ QUIZ COMPONENT ============
function Quiz({ questions, title, onFinish }: { questions: QuizQuestion[]; title: string; onFinish?: (score: number) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const current = questions[currentIndex];

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const newAnswers = [...answers, index];
    setAnswers(newAnswers);
    if (index === current.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
      if (onFinish) onFinish(score + (selected === current.correct ? 0 : 0));
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
    }
  };

  if (finished) {
    const finalScore = answers.filter((a, i) => a === questions[i].correct).length;
    const percentage = Math.round((finalScore / questions.length) * 100);
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">{percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '📚'}</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h3>
        <p className="text-lg text-gray-600 mb-4">
          You scored <span className="font-bold text-green-600">{finalScore}</span> out of <span className="font-bold">{questions.length}</span> ({percentage}%)
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div
            className={`h-3 rounded-full transition-all ${percentage >= 70 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mb-6">
          {percentage >= 70 ? 'Great job! You\'re on your way to passing the theory test.' :
           percentage >= 50 ? 'Good effort! Review the signs and rules you missed.' :
           'Keep studying! Review the lessons and try again.'}
        </p>
        <button
          onClick={() => { setCurrentIndex(0); setSelected(null); setScore(0); setFinished(false); setAnswers([]); }}
          className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">Question {currentIndex + 1} of {questions.length}</span>
        <span className="text-sm font-medium text-green-600">Score: {answers.filter((a, i) => a === questions[i].correct).length}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div className="h-2 rounded-full bg-green-500 transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
      </div>
      
      {current.scene && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-sm text-amber-800">
          {current.scene}
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{current.question}</h3>
      
      <div className="space-y-3 mb-6">
        {current.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              selected === null
                ? 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                : selected === i
                  ? i === current.correct
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : i === current.correct
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 opacity-50'
            }`}
          >
            <span className="font-medium text-sm">
              {String.fromCharCode(65 + i)}. {option}
            </span>
            {selected !== null && i === current.correct && (
              <span className="ml-2 text-green-600">✓</span>
            )}
            {selected === i && i !== current.correct && (
              <span className="ml-2 text-red-600">✗</span>
            )}
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className={`rounded-xl p-4 mb-4 ${selected === current.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className="text-sm font-medium mb-1" style={{ color: selected === current.correct ? '#166534' : '#991b1b' }}>
            {selected === current.correct ? '✓ Correct!' : '✗ Not quite.'}
          </p>
          <p className="text-sm text-gray-700">{current.explanation}</p>
        </div>
      )}

      {selected !== null && (
        <button
          onClick={handleNext}
          className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
        >
          {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}

// ============ MODULE COMPONENT ============
function CourseModule({ title, duration, topics, icon, questions, color }: {
  title: string; duration: string; topics: string[]; icon: string; questions: QuizQuestion[]; color: string;
}) {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (started) {
    return (
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
        <Quiz
          questions={questions}
          title={title}
          onFinish={() => setCompleted(true)}
        />
        {completed && (
          <button
            onClick={() => setStarted(false)}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to module
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-gray-300 transition-colors">
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl`} style={{ backgroundColor: color + '20' }}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{duration} · {questions.length} questions</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {topics.map((topic, i) => (
          <span key={i} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{topic}</span>
        ))}
      </div>
      <button
        onClick={() => setStarted(true)}
        className="w-full py-2.5 rounded-xl font-semibold text-sm transition-colors text-white"
        style={{ backgroundColor: color }}
      >
        Start Module →
      </button>
    </div>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedSign, setSelectedSign] = useState<TrafficSign | null>(null);
  const [signFilter, setSignFilter] = useState<'all' | 'warning' | 'regulatory' | 'information'>('all');
  const [quizMode, setQuizMode] = useState<'quick' | 'exam' | null>(null);
  const [quizQuestions2, setQuizQuestions2] = useState<QuizQuestion[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredSigns = signFilter === 'all' ? trafficSigns : trafficSigns.filter(s => s.category === signFilter);

  const startQuiz = (mode: 'quick' | 'exam') => {
    setQuizMode(mode);
    const count = mode === 'quick' ? 10 : 20;
    setQuizQuestions2(getShuffledQuestions(count));
  };

  const getQuestionsForModule = (category: string): QuizQuestion[] => {
    return quizQuestions.filter(q => q.category === category).slice(0, 8);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* NAVIGATION */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">Rw</div>
            <span className="font-bold text-lg">RoadWise</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a href="#signs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Signs</a>
            <a href="#rules" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Rules</a>
            <a href="#learn" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Learn</a>
            <a href="#quiz" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Practice</a>
            <a href="#plans" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Plans</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#quiz" className="hidden sm:inline-flex px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
              Start Free
            </a>
            <button className="md:hidden text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 px-4 py-3 space-y-2">
            <a href="#signs" className="block py-2 text-sm text-gray-600" onClick={() => setMobileMenuOpen(false)}>Signs</a>
            <a href="#rules" className="block py-2 text-sm text-gray-600" onClick={() => setMobileMenuOpen(false)}>Rules</a>
            <a href="#learn" className="block py-2 text-sm text-gray-600" onClick={() => setMobileMenuOpen(false)}>Learn</a>
            <a href="#quiz" className="block py-2 text-sm text-gray-600" onClick={() => setMobileMenuOpen(false)}>Practice</a>
            <a href="#plans" className="block py-2 text-sm text-gray-600" onClick={() => setMobileMenuOpen(false)}>Plans</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full text-green-800 text-xs font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Rwanda-first road school for beginners
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Learn the road.<br />
              <span className="text-green-600">Know the signs.</span><br />
              Drive smart.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Learn road rules, traffic signs, road markings, and safe-driving basics through simple interactive lessons — built around how roads actually work in <strong>Rwanda</strong>.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#learn" className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20">
                Start Learning →
              </a>
              <a href="#quiz" className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 transition-colors">
                Take a Quick Quiz
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-10 text-sm text-gray-500">
              <span className="flex items-center gap-2"><span className="text-xl">🚦</span> {trafficSigns.length} signs decoded</span>
              <span className="flex items-center gap-2"><span className="text-xl">📋</span> {roadRules.length} core rules</span>
              <span className="flex items-center gap-2"><span className="text-xl">📝</span> {quizQuestions.length}-question quiz</span>
            </div>
          </div>
        </div>
      </section>

      {/* KEY RULES TICKER */}
      <section className="bg-gray-900 text-white py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[
            'STOP ≠ SLOW DOWN',
            'ZEBRA LINES = PEOPLE FIRST',
            'RWANDA DRIVES ON THE RIGHT',
            '2-SECOND FOLLOWING GAP',
            'ROUNDABOUT: THE CIRCLE GOES FIRST',
            'THE NUMBER IS A CEILING, NOT A GOAL',
            'HORN ≠ RIGHT OF WAY',
            'SOLID LINE = INVISIBLE WALL',
          ].concat([
            'STOP ≠ SLOW DOWN',
            'ZEBRA LINES = PEOPLE FIRST',
            'RWANDA DRIVES ON THE RIGHT',
            '2-SECOND FOLLOWING GAP',
            'ROUNDABOUT: THE CIRCLE GOES FIRST',
            'THE NUMBER IS A CEILING, NOT A GOAL',
            'HORN ≠ RIGHT OF WAY',
            'SOLID LINE = INVISIBLE WALL',
          ]).map((rule, i) => (
            <span key={i} className="mx-8 text-sm font-medium opacity-80">{rule}</span>
          ))}
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Know your road.</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Three simple building blocks turn a nervous beginner into a confident, careful driver. No legalese — just pictures, plain words, and practice.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <div className="text-3xl mb-3">🚦</div>
            <h3 className="font-bold text-lg mb-1">Traffic Signs</h3>
            <p className="text-sm text-amber-800 mb-2">{trafficSigns.length} signs</p>
            <p className="text-sm text-gray-600">Recognize the signs that tell you what to do, what to expect, and what to avoid.</p>
          </div>
          <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-bold text-lg mb-1">Road Rules</h3>
            <p className="text-sm text-red-800 mb-2">{roadRules.length} rules</p>
            <p className="text-sm text-gray-600">Understand right of way, intersections, speed limits, overtaking, parking, and safe driving.</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <div className="text-3xl mb-3">🛣</div>
            <h3 className="font-bold text-lg mb-1">Road Markings</h3>
            <p className="text-sm text-blue-800 mb-2">{roadMarkings.length} markings</p>
            <p className="text-sm text-gray-600">Learn what road lines, crossings, arrows, and lane markings mean — the language painted under your wheels.</p>
          </div>
        </div>
      </section>

      {/* TRAFFIC SIGNS SECTION */}
      <section id="signs" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Meet the signs.</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Tap a card to flip it and see what the sign means and what to do. Click again for the full lesson.</p>
          </div>
          
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {(['all', 'warning', 'regulatory', 'information'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setSignFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  signFilter === filter
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {filter === 'all' ? `All (${trafficSigns.length})` : `${filter.charAt(0).toUpperCase() + filter.slice(1)} (${trafficSigns.filter(s => s.category === filter).length})`}
              </button>
            ))}
          </div>

          {/* Signs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredSigns.map(sign => (
              <SignCard
                key={sign.id}
                sign={sign}
                onClick={() => setSelectedSign(sign)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ROAD RULES SECTION */}
      <section id="rules" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">The rules matter.</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Six rules do most of the heavy lifting for new drivers. Learn the <strong>why</strong> behind each one.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {roadRules.map((rule, i) => (
            <div key={rule.id} className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:border-gray-200 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">{rule.icon}</span>
                <div>
                  <span className="text-xs text-gray-400 font-medium">0{i + 1}</span>
                  <h3 className="font-bold text-lg text-gray-900">{rule.title}</h3>
                  <p className="text-xs text-gray-500 italic">{rule.titleRw}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{rule.summary}</p>
              <ul className="space-y-2 mb-4">
                {rule.details.slice(0, 4).map((detail, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
              <div className="bg-gray-900 text-white rounded-xl px-4 py-2 text-xs font-bold tracking-wide">
                {rule.keyPoint}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROAD MARKINGS SECTION */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Read the lines.</h2>
            <p className="text-gray-600 max-w-xl mx-auto">The road writes instructions under your wheels. {roadMarkings.length} markings every beginner should know by heart.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roadMarkings.map(marking => (
              <div key={marking.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="text-center mb-3">
                  <span className="text-2xl font-mono text-gray-400 tracking-widest">{marking.icon}</span>
                </div>
                <h3 className="font-bold text-sm text-gray-900 mb-1">{marking.name}</h3>
                <p className="text-xs text-gray-500 italic mb-2">{marking.nameRw}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{marking.rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSE MODULES */}
      <section id="learn" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full text-green-800 text-xs font-medium mb-4">
            The RoadWise Course
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">A full course, not a manual.</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Five illustrated modules with questions and a checkpoint after each one. Pass a checkpoint and it's saved.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseModule
            title="Traffic Signs"
            duration="6 min"
            topics={['Warning', 'Regulatory', 'Information']}
            icon="🚦"
            questions={getQuestionsForModule('signs')}
            color="#f59e0b"
          />
          <CourseModule
            title="Right of Way"
            duration="7 min"
            topics={['Intersections', 'Roundabouts', 'Crossings']}
            icon="➡"
            questions={getQuestionsForModule('rules')}
            color="#ef4444"
          />
          <CourseModule
            title="Speed & Distance"
            duration="6 min"
            topics={['Limits', 'Following gap', 'Overtaking']}
            icon="🏎"
            questions={getQuestionsForModule('speed')}
            color="#8b5cf6"
          />
          <CourseModule
            title="Night & Weather"
            duration="5 min"
            topics={['Headlights', 'Rain', 'Fog']}
            icon="🌙"
            questions={getQuestionsForModule('night')}
            color="#3b82f6"
          />
          <CourseModule
            title="Safe Habits"
            duration="6 min"
            topics={['Seatbelts', 'Distraction', 'Emergencies']}
            icon="🛡"
            questions={getQuestionsForModule('safety')}
            color="#10b981"
          />
        </div>
      </section>

      {/* SCENARIO */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Real moments, real decisions.</h2>
            <p className="text-gray-400">Read the scene like a driver, then make the call.</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                STOP
              </div>
              <div>
                <p className="text-sm text-gray-400">Scenario 01 — The STOP sign</p>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">What would you do?</h3>
            <p className="text-gray-300 mb-6">
              You're approaching an intersection with a STOP sign. No traffic is coming from either side. What do you do?
            </p>
            <div className="space-y-3">
              {[
                { label: 'A', text: 'Slow down and proceed carefully', correct: false },
                { label: 'B', text: 'Stop completely, check all directions, then proceed when safe', correct: true },
                { label: 'C', text: 'Continue since no traffic is coming', correct: false },
              ].map((option, i) => (
                <ScenarioOption key={i} {...option} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUIZ SECTION */}
      <section id="quiz" className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Think you know the road?</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Put your knowledge to the test. Every question comes with instant feedback.</p>
        </div>

        {!quizMode ? (
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <button
              onClick={() => startQuiz('quick')}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-left hover:border-green-300 hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-bold text-gray-900 mb-1">Quick Quiz</h3>
              <p className="text-sm text-gray-500">10 questions, mixed topics</p>
            </button>
            <button
              onClick={() => startQuiz('exam')}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-left hover:border-green-300 hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-2">📝</div>
              <h3 className="font-bold text-gray-900 mb-1">Course Exam</h3>
              <p className="text-sm text-gray-500">20 questions, all modules</p>
            </button>
          </div>
        ) : (
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">{quizMode === 'quick' ? 'Quick Quiz' : 'Course Exam'}</h3>
              <button
                onClick={() => { setQuizMode(null); setQuizQuestions2([]); }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Exit
              </button>
            </div>
            <Quiz questions={quizQuestions2} title={quizMode} />
          </div>
        )}
      </section>

      {/* PLANS */}
      <section id="plans" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Start free, go further when ready.</h2>
            <p className="text-gray-600">Plans are a draft. Prices will be set after testing with real learners.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-1">Free</h3>
              <p className="text-sm text-gray-500 mb-4">Learn the basics.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Signs library</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Core lessons</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Sample quizzes</li>
              </ul>
              <button className="w-full mt-6 py-2.5 rounded-xl font-semibold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                Current Plan
              </button>
            </div>
            <div className="bg-white rounded-2xl border-2 border-green-500 p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">Premium</h3>
              <p className="text-sm text-gray-500 mb-4">Get exam-ready.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Full timed mock exams</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Weak-topic coach</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Readiness score</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Pay by mobile money</li>
              </ul>
              <button className="w-full mt-6 py-2.5 rounded-xl font-semibold text-sm bg-green-600 text-white hover:bg-green-700 transition-colors">
                Coming Soon
              </button>
            </div>
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-1">Driving Schools</h3>
              <p className="text-sm text-gray-500 mb-4">Track every student.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Student progress dashboard</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> School-branded access</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Monthly plan</li>
              </ul>
              <button className="w-full mt-6 py-2.5 rounded-xl font-semibold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="join" className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Join the club</h2>
          <p className="text-green-100 mb-6 max-w-md mx-auto">
            Get a new sign explained in your inbox each week, plus early access to mock exams.
          </p>
          {subscribed ? (
            <div className="bg-white/20 rounded-xl p-4 max-w-sm mx-auto">
              <p className="font-medium">✓ You're in! Check your inbox.</p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                onClick={() => { if (email) setSubscribed(true); }}
                className="px-6 py-3 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-colors"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">Rw</div>
                <span className="font-bold">RoadWise</span>
              </div>
              <p className="text-sm text-gray-500">Learn road rules, drive safe.</p>
              <p className="text-xs text-gray-400 mt-2">Kinyarwanda · English · French (coming soon)</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-3">Explore</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#signs" className="hover:text-gray-700">Signs</a></li>
                <li><a href="#rules" className="hover:text-gray-700">Rules</a></li>
                <li><a href="#quiz" className="hover:text-gray-700">Practice</a></li>
                <li><a href="#plans" className="hover:text-gray-700">Plans</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-3">More</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#join" className="hover:text-gray-700">Newsletter</a></li>
                <li><a href="#plans" className="hover:text-gray-700">For driving schools</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-3">About</h4>
              <p className="text-sm text-gray-500">
                Sign meanings and questions are based on Rwanda's road code. Final content aligns with the official Rwanda National Police road code.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400">© 2024 RoadWise Rwanda. Prototype.</p>
            <p className="text-xs text-gray-400">Built for new drivers in Kigali and beyond.</p>
          </div>
        </div>
      </footer>

      {/* SIGN DETAIL MODAL */}
      {selectedSign && (
        <SignDetail sign={selectedSign} onClose={() => setSelectedSign(null)} />
      )}
    </div>
  );
}

// ============ SCENARIO OPTION COMPONENT ============
function ScenarioOption({ label, text, correct }: { label: string; text: string; correct: boolean }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      onClick={() => setRevealed(true)}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
        !revealed
          ? 'border-gray-600 hover:border-gray-400 hover:bg-gray-700'
          : correct
            ? 'border-green-500 bg-green-900/30'
            : 'border-gray-600 opacity-50'
      }`}
    >
      <span className="font-medium text-sm">
        {label}. {text}
      </span>
      {revealed && correct && <span className="ml-2 text-green-400 text-xs">✓ Correct — always come to a complete stop!</span>}
      {revealed && !correct && <span className="ml-2 text-red-400 text-xs">✗ A STOP sign always requires a full stop.</span>}
    </button>
  );
}
