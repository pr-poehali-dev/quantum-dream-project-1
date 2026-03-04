import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── DATA ───────────────────────────────────────────────────────────────────

const TESTS = [
  {
    id: "logic",
    title: "Логическое мышление",
    emoji: "🧠",
    questions: [
      {
        text: "Вам дают сложную задачу без инструкций. Вы...",
        options: ["Разбиваю на шаги и решаю методично", "Ищу похожие решения в интернете", "Прошу кого-то помочь", "Действую интуитивно"],
      },
      {
        text: "Вы видите паттерн: 2, 4, 8, 16... Что дальше?",
        options: ["32 — удвоение", "18 — прибавляю 2", "20 — прибавляю 4", "Не знаю"],
      },
      {
        text: "Насколько вам нравится работать с цифрами и формулами?",
        options: ["Очень нравится", "Скорее нравится", "Нейтрально", "Не нравится"],
      },
      {
        text: "Вы любите головоломки и логические задачи?",
        options: ["Обожаю, это моё хобби", "Да, когда есть время", "Иногда", "Нет, предпочитаю другое"],
      },
      {
        text: "Как вы принимаете решения?",
        options: ["Анализирую данные и факты", "Взвешиваю за и против", "Доверяю интуиции", "Советуюсь с другими"],
      },
    ],
  },
  {
    id: "humtech",
    title: "Гуманитарий или технарь",
    emoji: "⚖️",
    questions: [
      {
        text: "Что вам больше нравится читать?",
        options: ["Научные статьи и техническую литературу", "Художественные книги и поэзию", "Исторические факты и биографии", "Ничего из перечисленного"],
      },
      {
        text: "Какой предмет в школе был любимым?",
        options: ["Математика или физика", "Литература или история", "Биология или химия", "Физкультура или технология"],
      },
      {
        text: "Вы пишете текст — что важнее?",
        options: ["Точность и структура", "Красота и образность", "Смысл и идея", "Краткость"],
      },
      {
        text: "Как вы лучше запоминаете информацию?",
        options: ["Через схемы и графики", "Через истории и образы", "Через повторение вслух", "Через практику и действие"],
      },
      {
        text: "Что привлекает больше — создать программу или написать рассказ?",
        options: ["Программу", "Рассказ", "Оба варианта интересны", "Ни то ни другое"],
      },
    ],
  },
  {
    id: "social",
    title: "Коммуникабельность",
    emoji: "🤝",
    questions: [
      {
        text: "После общения с людьми вы чувствуете себя...",
        options: ["Наполненным энергией", "Нейтрально", "Немного уставшим", "Очень уставшим"],
      },
      {
        text: "В команде вы обычно...",
        options: ["Берёте на себя лидерство", "Активно участвуете", "Выполняете свою часть тихо", "Предпочитаете работать один"],
      },
      {
        text: "Насколько легко вам знакомиться с новыми людьми?",
        options: ["Очень легко, я открытый человек", "Достаточно легко", "С трудом, но справляюсь", "Это стресс для меня"],
      },
      {
        text: "Вы любите выступать перед аудиторией?",
        options: ["Да, мне нравится", "Нормально отношусь", "Волнуюсь, но делаю", "Избегаю этого"],
      },
      {
        text: "Работа с людьми или с данными — что ближе?",
        options: ["Работа с людьми", "Работа с данными", "Одинаково", "Зависит от настроения"],
      },
    ],
  },
  {
    id: "creative",
    title: "Креативность",
    emoji: "🎨",
    questions: [
      {
        text: "Вам нравится придумывать что-то новое с нуля?",
        options: ["Да, это моя стихия", "Да, когда есть вдохновение", "Иногда", "Предпочитаю работать по шаблону"],
      },
      {
        text: "Вы занимаетесь творчеством (рисование, музыка, видео)?",
        options: ["Регулярно, это хобби", "Иногда для удовольствия", "Очень редко", "Не занимаюсь"],
      },
      {
        text: "Если бы вы делали сайт, вы бы...",
        options: ["Сами нарисовали дизайн", "Выбрали готовый шаблон и настроили", "Поручили дизайнеру", "Взяли любой, главное чтобы работал"],
      },
      {
        text: "Вам важна эстетика в окружении (интерьер, одежда)?",
        options: ["Очень важна", "Важна, но не приоритет", "Нейтрально", "Совсем не важна"],
      },
      {
        text: "Придумать идею или реализовать её — что интереснее?",
        options: ["Придумать идею", "Реализовать", "Оба этапа одинаково", "Ни то ни другое"],
      },
    ],
  },
  {
    id: "workstyle",
    title: "Формат работы",
    emoji: "💼",
    questions: [
      {
        text: "Где вам комфортнее работать?",
        options: ["В офисе с командой", "Удалённо из дома", "Гибридно", "В поездках и на выезде"],
      },
      {
        text: "Вы предпочитаете работу с...",
        options: ["Людьми и коммуникацией", "Данными и аналитикой", "Технологиями и кодом", "Творческими задачами"],
      },
      {
        text: "Какой ритм работы вам ближе?",
        options: ["Стабильный, с чётким расписанием", "Разнообразный, без рутины", "Проектный, от задачи к задаче", "Свободный, сам планирую"],
      },
      {
        text: "Важна ли вам высокая зарплата как основной приоритет?",
        options: ["Да, это главное", "Важна, но не единственное", "Важнее интерес и смысл", "Всё равно, лишь бы нравилось"],
      },
      {
        text: "Вы хотите...",
        options: ["Помогать людям напрямую", "Создавать продукты и технологии", "Управлять и организовывать", "Исследовать и анализировать"],
      },
    ],
  },
];

const PROFESSIONS = [
  {
    id: "developer",
    title: "Разработчик",
    short: "Создание приложений, сайтов и цифровых продуктов",
    emoji: "💻",
    gradient: "gradient-card-blue",
    description: "Разработчик программного обеспечения проектирует, создаёт и поддерживает программы, веб-сайты и мобильные приложения. Это одна из самых востребованных профессий 21 века.",
    skills: ["Алгоритмическое мышление", "Знание языков программирования", "Работа с базами данных", "Командная работа по Agile/Scrum"],
    salary: "от 80 000 до 400 000 ₽/мес",
    prospects: "Высокий спрос, удалённая работа, международные компании",
    tags: ["logic", "humtech"],
    universities: [
      { name: "МФТИ", city: "Москва", program: "Прикладная математика и информатика", url: "https://mipt.ru/education/departments/fpmi/" },
      { name: "НИУ ВШЭ", city: "Москва", program: "Программная инженерия", url: "https://www.hse.ru/ba/se/" },
      { name: "СПбГУ", city: "Санкт-Петербург", program: "Программирование и информационные технологии", url: "https://spbu.ru/postupayushchim/programs/bachelor/programmirovanie-i-informacionnye-tekhnologii" },
      { name: "ИТМО", city: "Санкт-Петербург", program: "Информационные системы и технологии", url: "https://itmo.ru/ru/faculty/24/informatizaciya_i_programmirovanie.htm" },
    ],
  },
  {
    id: "designer",
    title: "Графический дизайнер",
    short: "Визуальные концепции, брендинг и интерфейсы",
    emoji: "🎨",
    gradient: "gradient-card-peach",
    description: "Графический дизайнер создаёт визуальные образы для брендов, продуктов и медиа. Работает с логотипами, упаковкой, рекламой, интерфейсами приложений и сайтов.",
    skills: ["Чувство эстетики и стиля", "Adobe Photoshop / Illustrator / Figma", "Типографика и композиция", "Понимание маркетинга"],
    salary: "от 50 000 до 250 000 ₽/мес",
    prospects: "Фриланс, агентства, IT-компании, стартапы",
    tags: ["creative", "workstyle"],
    universities: [
      { name: "Британская школа дизайна", city: "Москва", program: "Графический дизайн", url: "https://britishdesign.ru/courses/graphic_design/" },
      { name: "НИУ ВШЭ", city: "Москва", program: "Коммуникационный дизайн", url: "https://www.hse.ru/ba/design/" },
      { name: "СПбГУПТД", city: "Санкт-Петербург", program: "Дизайн", url: "https://sutd.ru/abiturientam/programmy-bakalavriata/dizayn/" },
      { name: "МГХПА им. Строганова", city: "Москва", program: "Дизайн среды", url: "https://stroganovka.ru/" },
    ],
  },
  {
    id: "marketer",
    title: "Маркетолог",
    short: "Продвижение продуктов, аналитика и стратегия",
    emoji: "📈",
    gradient: "gradient-card-green",
    description: "Маркетолог отвечает за продвижение товаров и услуг, изучение рынка и потребителей, разработку стратегий роста бизнеса. Работает на стыке творчества и аналитики.",
    skills: ["Анализ данных", "Понимание психологии потребителя", "Digital-маркетинг и SMM", "Написание текстов и сторителлинг"],
    salary: "от 60 000 до 300 000 ₽/мес",
    prospects: "Рост в digital, продуктовый маркетинг, международные бренды",
    tags: ["social", "creative"],
    universities: [
      { name: "НИУ ВШЭ", city: "Москва", program: "Маркетинг и рыночная аналитика", url: "https://www.hse.ru/ba/marketing/" },
      { name: "РЭУ им. Плеханова", city: "Москва", program: "Маркетинг", url: "https://www.rea.ru/ru/org/faculties/fmeo/Pages/marketing.aspx" },
      { name: "СПБГЭУ", city: "Санкт-Петербург", program: "Маркетинг", url: "https://unecon.ru/napravleniya-podgotovki/bakalavriat/marketing" },
      { name: "МГУ", city: "Москва", program: "Маркетинг (факультет экономики)", url: "https://www.econ.msu.ru/students/bachelor/market/" },
    ],
  },
  {
    id: "analyst",
    title: "Аналитик данных",
    short: "Исследование данных, прогнозы, бизнес-инсайты",
    emoji: "📊",
    gradient: "gradient-card-purple",
    description: "Data Analyst собирает, обрабатывает и анализирует большие массивы данных, строит дашборды и помогает бизнесу принимать обоснованные решения на основе цифр.",
    skills: ["SQL и базы данных", "Python / R для анализа", "Визуализация данных (Tableau, Power BI)", "Статистика и математика"],
    salary: "от 70 000 до 350 000 ₽/мес",
    prospects: "Высокий спрос, работа в любой индустрии, удалёнка",
    tags: ["logic", "humtech"],
    universities: [
      { name: "МФТИ", city: "Москва", program: "Науки о данных", url: "https://mipt.ru/education/departments/fpmi/" },
      { name: "НИУ ВШЭ", city: "Москва", program: "Прикладная математика и информатика", url: "https://www.hse.ru/ba/ami/" },
      { name: "НГТУ", city: "Новосибирск", program: "Информатика и вычислительная техника", url: "https://www.nstu.ru/study/bachelor/informatics/" },
      { name: "УрФУ", city: "Екатеринбург", program: "Прикладная математика", url: "https://urfu.ru/ru/applicants/programs/bachelor/applied-mathematics/" },
    ],
  },
  {
    id: "psychologist",
    title: "Психолог",
    short: "Помощь людям, консультирование, исследования",
    emoji: "🧩",
    gradient: "gradient-card-rose",
    description: "Психолог изучает поведение и психику человека, оказывает психологическую помощь, занимается диагностикой и консультированием в клиниках, школах, бизнесе и частной практике.",
    skills: ["Эмпатия и активное слушание", "Методы психодиагностики", "Знание психологических теорий", "Ведение документации"],
    salary: "от 40 000 до 200 000 ₽/мес",
    prospects: "Частная практика, корпоративный психолог, HR-специалист",
    tags: ["social", "workstyle"],
    universities: [
      { name: "МГУ им. Ломоносова", city: "Москва", program: "Психология", url: "https://www.psy.msu.ru/" },
      { name: "НИУ ВШЭ", city: "Москва", program: "Психология", url: "https://www.hse.ru/ba/psy/" },
      { name: "СПбГУ", city: "Санкт-Петербург", program: "Психология", url: "https://spbu.ru/postupayushchim/programs/bachelor/psihologiya" },
      { name: "РГПУ им. Герцена", city: "Санкт-Петербург", program: "Психология образования", url: "https://www.herzen.spb.ru/" },
    ],
  },
];

// ─── ALGORITHM ───────────────────────────────────────────────────────────────

type Answers = Record<string, number[]>;

function calcResults(answers: Answers): typeof PROFESSIONS {
  const scores: Record<string, number> = {};
  PROFESSIONS.forEach((p) => { scores[p.id] = 0; });

  Object.entries(answers).forEach(([testId, testAnswers]) => {
    testAnswers.forEach((answerIdx, qIdx) => {
      const value = answerIdx === 0 ? 3 : answerIdx === 1 ? 2 : answerIdx === 2 ? 1 : 0;
      PROFESSIONS.forEach((p) => {
        if (p.tags.includes(testId)) scores[p.id] += value;
      });
      if (testId === "workstyle" && qIdx === 1) {
        if (answerIdx === 0) { scores["psychologist"] += 3; scores["marketer"] += 2; }
        if (answerIdx === 1) { scores["analyst"] += 3; }
        if (answerIdx === 2) { scores["developer"] += 3; }
        if (answerIdx === 3) { scores["designer"] += 3; }
      }
      if (testId === "social" && answerIdx === 0) { scores["psychologist"] += 2; scores["marketer"] += 2; }
      if (testId === "logic" && answerIdx === 0) { scores["developer"] += 2; scores["analyst"] += 2; }
      if (testId === "creative" && answerIdx === 0) { scores["designer"] += 2; scores["marketer"] += 1; }
      if (testId === "humtech") {
        if (answerIdx === 0) { scores["developer"] += 2; scores["analyst"] += 2; }
        if (answerIdx === 1) { scores["psychologist"] += 2; scores["designer"] += 1; }
      }
    });
  });

  return [...PROFESSIONS].sort((a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0)).slice(0, 4);
}

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Screen = "hero" | "testing" | "results" | "profession";

// ─── FLOATING PROFESSION CARDS (hero illustration) ────────────────────────────

const profCards = [
  { label: "Разработчик", emoji: "💻", grad: "gradient-card-blue", anim: "animate-float-up" },
  { label: "Дизайнер", emoji: "🎨", grad: "gradient-card-peach", anim: "animate-float-down" },
  { label: "Маркетолог", emoji: "📈", grad: "gradient-card-green", anim: "animate-float-slow" },
  { label: "Аналитик", emoji: "📊", grad: "gradient-card-purple", anim: "animate-float-up" },
  { label: "Психолог", emoji: "🧩", grad: "gradient-card-rose", anim: "animate-float-down" },
];

// ─── HERO SCREEN ─────────────────────────────────────────────────────────────

function HeroScreen({ onStart }: { onStart: (name: string, city: string, target: string) => void }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [target, setTarget] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) { setError(true); return; }
    setError(false);
    onStart(name.trim(), city.trim(), target.trim());
  };

  const positions = [
    "top-4 left-20",
    "top-16 right-4",
    "top-1/2 left-4 -translate-y-1/2",
    "bottom-20 left-28",
    "bottom-4 right-16",
  ];

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      <header className="px-6 py-5 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <Icon name="Compass" size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg text-slate-800">Профориентация</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
          <Icon name="Clock" size={14} />
          <span>~15 минут</span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12 items-center w-full">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-soft text-xs font-medium text-indigo-600 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Бесплатно · Без регистрации
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black leading-tight text-slate-800 mb-5 tracking-tight">
            Тест на
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"> профориентацию:</span>
            {" "}какая профессия вам подходит?
          </h1>

          <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-xl">
            Пройдите серию тестов и получите персональные рекомендации по выбору профессии и вузов.
          </p>

          <div className="bg-white rounded-2xl shadow-card p-6 space-y-4 max-w-md">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Ваше имя *</label>
              <input
                value={name}
                onChange={(e) => { setName(e.target.value); setError(false); }}
                placeholder="Например: Алиса"
                className={`w-full px-4 py-3 rounded-xl border text-slate-800 placeholder:text-slate-400 outline-none transition-all ${
                  error ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-indigo-400 focus:bg-white"
                }`}
              />
              {error && <p className="text-red-500 text-xs mt-1">Пожалуйста, введите ваше имя</p>}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Город</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Москва"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-indigo-400 focus:bg-white text-slate-800 placeholder:text-slate-400 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Где планируете поступать</label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-indigo-400 focus:bg-white text-slate-800 outline-none transition-all"
              >
                <option value="">Выберите вариант</option>
                <option value="moscow">Москва</option>
                <option value="spb">Санкт-Петербург</option>
                <option value="regional">В своём регионе</option>
                <option value="online">Онлайн-образование</option>
                <option value="abroad">За рубежом</option>
              </select>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              Пройти тесты
              <Icon name="ArrowRight" size={18} />
            </button>

            <p className="text-xs text-slate-400 text-center">5 тестов · ~15 минут · Персональный результат</p>
          </div>
        </div>

        {/* Floating cards illustration */}
        <div className="hidden lg:flex items-center justify-center relative h-[500px]">
          {profCards.map((card, i) => (
            <div key={i} className={`absolute ${positions[i]} ${card.anim}`}>
              <div className={`${card.grad} rounded-2xl p-4 shadow-card flex items-center gap-3 min-w-[160px]`}>
                <span className="text-2xl">{card.emoji}</span>
                <span className="font-bold text-slate-700 text-sm">{card.label}</span>
              </div>
            </div>
          ))}
          <div className="w-32 h-32 rounded-full bg-white shadow-card flex items-center justify-center z-10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
              <Icon name="Compass" size={32} className="text-white" />
            </div>
          </div>
        </div>
      </main>

      <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
        <div className="grid grid-cols-3 gap-4 max-w-xs">
          {[{ num: "5", label: "тестов" }, { num: "5", label: "профессий" }, { num: "20+", label: "вузов" }].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-3 text-center shadow-soft">
              <div className="text-xl font-black text-indigo-600">{s.num}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TESTING SCREEN ───────────────────────────────────────────────────────────

function TestingScreen({ userName, onComplete }: { userName: string; onComplete: (answers: Answers) => void }) {
  const [testIdx, setTestIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [shakeBtn, setShakeBtn] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const currentTest = TESTS[testIdx];
  const currentQuestion = currentTest.questions[questionIdx];
  const totalQuestions = TESTS.reduce((s, t) => s + t.questions.length, 0);
  const doneQuestions = TESTS.slice(0, testIdx).reduce((s, t) => s + t.questions.length, 0) + questionIdx;
  const progress = Math.round((doneQuestions / totalQuestions) * 100);
  const isLastQuestion = testIdx === TESTS.length - 1 && questionIdx === currentTest.questions.length - 1;

  const handleNext = () => {
    if (selected === null) {
      setShakeBtn(true);
      setTimeout(() => setShakeBtn(false), 500);
      return;
    }
    const testAnswers = answers[currentTest.id] ?? [];
    const newTestAnswers = [...testAnswers];
    newTestAnswers[questionIdx] = selected;
    const newAnswers = { ...answers, [currentTest.id]: newTestAnswers };
    setAnswers(newAnswers);
    setSelected(null);
    setAnimKey((k) => k + 1);

    if (questionIdx < currentTest.questions.length - 1) {
      setQuestionIdx(questionIdx + 1);
    } else if (testIdx < TESTS.length - 1) {
      setTestIdx(testIdx + 1);
      setQuestionIdx(0);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      <header className="px-6 py-5 flex items-center gap-3 max-w-3xl mx-auto w-full">
        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
          <Icon name="Compass" size={18} className="text-white" />
        </div>
        <span className="font-bold text-slate-700">Профориентация</span>
        <div className="ml-auto text-sm text-slate-500">{userName}</div>
      </header>

      <div className="max-w-3xl mx-auto w-full px-6 mb-8">
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span>{currentTest.emoji} {currentTest.title}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-white rounded-full overflow-hidden shadow-soft">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex gap-1 mt-3">
          {TESTS.map((t, i) => (
            <div key={t.id} className={`flex-1 h-1 rounded-full transition-all ${i < testIdx ? "bg-indigo-500" : i === testIdx ? "bg-indigo-300" : "bg-slate-200"}`} />
          ))}
        </div>
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 flex flex-col">
        <div key={`${testIdx}-${questionIdx}-${animKey}`} className="animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-card p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{currentTest.emoji}</span>
              <div>
                <div className="text-xs font-medium text-indigo-500 uppercase tracking-wide">{currentTest.title}</div>
                <div className="text-xs text-slate-400">Вопрос {questionIdx + 1} из {currentTest.questions.length}</div>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-8 leading-snug">{currentQuestion.text}</h2>

            <div className="space-y-3">
              {currentQuestion.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium text-sm ${
                    selected === i
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-slate-100 bg-slate-50 text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/50"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${selected === i ? "border-indigo-500 bg-indigo-500" : "border-slate-300"}`}>
                      {selected === i && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                    {opt}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className={`w-full py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${shakeBtn ? "opacity-80" : ""} ${
              selected !== null
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-200 hover:scale-[1.01]"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {isLastQuestion ? <>Получить результаты <Icon name="Sparkles" size={18} /></> : <>Далее <Icon name="ArrowRight" size={18} /></>}
          </button>
        </div>
      </main>
      <div className="h-12" />
    </div>
  );
}

// ─── RESULTS SCREEN ───────────────────────────────────────────────────────────

function ResultsScreen({
  userName,
  results,
  onProfessionClick,
  onRestart,
}: {
  userName: string;
  results: typeof PROFESSIONS;
  onProfessionClick: (prof: (typeof PROFESSIONS)[0]) => void;
  onRestart: () => void;
}) {
  return (
    <div className="min-h-screen gradient-hero">
      <header className="px-6 py-5 flex items-center gap-3 max-w-5xl mx-auto">
        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
          <Icon name="Compass" size={18} className="text-white" />
        </div>
        <span className="font-bold text-slate-700">Профориентация</span>
        <button onClick={onRestart} className="ml-auto text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1 transition-colors">
          <Icon name="RotateCcw" size={14} />
          Пройти снова
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 mb-3">
            {userName}, вот профессии,<br className="hidden sm:block" /> которые вам подходят
          </h1>
          <p className="text-slate-500 text-lg">На основе ваших ответов мы подобрали подходящие направления</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {results.map((prof, i) => (
            <div
              key={prof.id}
              onClick={() => onProfessionClick(prof)}
              className={`animate-fade-in-up group cursor-pointer bg-white rounded-2xl shadow-card hover:shadow-xl hover:scale-[1.02] transition-all overflow-hidden`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`${prof.gradient} h-28 flex items-center justify-center`}>
                <span className="text-6xl">{prof.emoji}</span>
              </div>
              <div className="p-6">
                {i === 0 && (
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold mb-3">
                    <Icon name="Star" size={11} />
                    Лучший результат
                  </div>
                )}
                <h3 className="font-black text-xl text-slate-800 mb-2">{prof.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{prof.short}</p>
                <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold group-hover:gap-3 transition-all">
                  Узнать подробнее
                  <Icon name="ArrowRight" size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-card p-8 text-center">
          <h2 className="text-xl font-black text-slate-800 mb-2">Хотите узнать больше?</h2>
          <p className="text-slate-500 mb-6">Кликните на карточку — там описание, навыки и список вузов с прямыми ссылками</p>
          <button onClick={onRestart} className="px-6 py-3 border-2 border-indigo-300 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all">
            Пройти тест заново
          </button>
        </div>
      </main>
    </div>
  );
}

// ─── PROFESSION SCREEN ────────────────────────────────────────────────────────

function ProfessionScreen({ profession, onBack }: { profession: (typeof PROFESSIONS)[0]; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-white">
      <div className={`${profession.gradient} pt-6 pb-16 px-6`}>
        <div className="max-w-4xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mb-8 font-medium">
            <Icon name="ArrowLeft" size={18} />
            Назад к результатам
          </button>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-card flex items-center justify-center text-5xl flex-shrink-0">
              {profession.emoji}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-800 mb-2">{profession.title}</h1>
              <p className="text-slate-600 text-lg">{profession.short}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 -mt-8 pb-16">
        <div className="bg-white rounded-2xl shadow-card p-8 mb-6 animate-fade-in-up">
          <h2 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
            <Icon name="BookOpen" size={20} className="text-indigo-500" />
            Чем занимается специалист
          </h2>
          <p className="text-slate-600 leading-relaxed">{profession.description}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-card p-8 animate-fade-in-up">
            <h2 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
              <Icon name="Zap" size={20} className="text-indigo-500" />
              Ключевые навыки
            </h2>
            <ul className="space-y-3">
              {profession.skills.map((skill, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={12} className="text-indigo-600" />
                  </span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl p-6 text-white shadow-card animate-fade-in-up">
              <div className="text-sm font-medium text-white/70 mb-1 flex items-center gap-1">
                <Icon name="TrendingUp" size={14} />
                Средняя зарплата
              </div>
              <div className="text-xl font-black">{profession.salary}</div>
            </div>
            <div className="bg-white rounded-2xl shadow-card p-6 animate-fade-in-up flex-1">
              <div className="text-sm font-semibold text-slate-500 mb-2 flex items-center gap-1">
                <Icon name="Rocket" size={14} className="text-indigo-500" />
                Перспективы
              </div>
              <p className="text-slate-700 font-medium">{profession.prospects}</p>
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <Icon name="GraduationCap" size={24} className="text-indigo-500" />
            Где получить образование
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {profession.universities.map((uni, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-soft border border-slate-100 p-6 hover:shadow-card hover:border-indigo-200 transition-all">
                <div className="font-black text-slate-800 text-lg mb-1">{uni.name}</div>
                <div className="flex items-center gap-1 text-slate-400 text-sm mb-2">
                  <Icon name="MapPin" size={12} />
                  {uni.city}
                </div>
                <div className="text-slate-600 text-sm mb-4 leading-snug">{uni.program}</div>
                <a
                  href={uni.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-semibold text-sm hover:bg-indigo-100 transition-colors"
                >
                  Перейти на сайт
                  <Icon name="ExternalLink" size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

const Index = () => {
  const [screen, setScreen] = useState<Screen>("hero");
  const [userName, setUserName] = useState("");
  const [results, setResults] = useState<typeof PROFESSIONS>([]);
  const [selectedProfession, setSelectedProfession] = useState<(typeof PROFESSIONS)[0] | null>(null);

  const handleStart = (name: string, city: string, target: string) => {
    setUserName(name);
    localStorage.setItem("profi_user", JSON.stringify({ name, city, target }));
    setScreen("testing");
  };

  const handleTestsComplete = (answers: Answers) => {
    const res = calcResults(answers);
    setResults(res);
    localStorage.setItem("profi_results", JSON.stringify(res.map((r) => r.id)));
    setScreen("results");
    window.scrollTo(0, 0);
  };

  const handleProfessionClick = (prof: (typeof PROFESSIONS)[0]) => {
    setSelectedProfession(prof);
    setScreen("profession");
    window.scrollTo(0, 0);
  };

  const handleRestart = () => {
    setScreen("hero");
    setResults([]);
    setSelectedProfession(null);
    window.scrollTo(0, 0);
  };

  if (screen === "hero") return <HeroScreen onStart={handleStart} />;
  if (screen === "testing") return <TestingScreen userName={userName} onComplete={handleTestsComplete} />;
  if (screen === "results") return <ResultsScreen userName={userName} results={results} onProfessionClick={handleProfessionClick} onRestart={handleRestart} />;
  if (screen === "profession" && selectedProfession) return <ProfessionScreen profession={selectedProfession} onBack={() => { setScreen("results"); window.scrollTo(0, 0); }} />;

  return null;
};

export default Index;
