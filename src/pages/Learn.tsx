import { useState } from 'react';
import { 
  BookOpen, TrendingUp, BarChart3, Shield, PiggyBank, 
  GraduationCap, Sparkles, Clock, DollarSign, Home, 
  Building2, ChevronRight, Star, Target, Zap, Award,
  ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Play,
  Landmark, Wallet, Briefcase, LineChart, Banknote, 
  Users, Globe, FileText, CreditCard, Calculator
} from 'lucide-react';

export default function Learn() {
  const [selectedTopic, setSelectedTopic] = useState('קרן השתלמות');

  const topics = [
    { id: 'histalmut', label: 'קרן השתלמות', icon: Landmark, description: 'חיסכון לטווח בינוני עם הטבות מס' },
    { id: 'gemel', label: 'קופת גמל', icon: Wallet, description: 'חיסכון פנסיוני וגמל להשקעה' },
    { id: 'trading', label: 'חשבון מסחר', icon: Briefcase, description: 'איך פותחים חשבון ומתחילים לסחור' },
    { id: 'track', label: 'מסלולי השקעה', icon: LineChart, description: 'מסלולים שונים להשקעה - סולידי, מאוזן, אגרסיבי' },
    { id: 'stocks', label: 'מניות', icon: TrendingUp, description: 'מה זה מניה, איך קונים ומוכרים' },
    { id: 'bonds', label: 'אג"ח', icon: Banknote, description: 'אגרות חוב ממשלתיות וקונצרניות' },
    { id: 'etf', label: 'תעודות סל', icon: BarChart3, description: 'השקעה פסיבית במדדים' },
    { id: 'pension', label: 'פנסיה', icon: Shield, description: 'תכנון פנסיוני והפרשות' },
    { id: 'tax', label: 'מיסוי', icon: PiggyBank, description: 'מס רווחי הון, דיבידנדים והטבות' },
    { id: 'mutual', label: 'קרנות נאמנות', icon: Users, description: 'השקעה מנוהלת על ידי מנהל השקעות' },
    { id: 'education', label: 'השכלה פיננסית', icon: GraduationCap, description: 'מושגים בסיסיים בעולם ההשקעות' },
    { id: 'risk', label: 'ניהול סיכונים', icon: Target, description: 'איך להגן על התיק שלך' },
  ];

  // Content for each topic
  const getContent = (topic: string) => {
    const contents: Record<string, { title: string; content: string[] }> = {
      'קרן השתלמות': {
        title: 'קרן השתלמות - המדריך השלם',
        content: [
          'קרן השתלמות היא מסגרת חיסכון לטווח בינוני (6 שנים ומעלה) שנועדה לעודד השתלמות מקצועית של עובדים.',
          'היתרון המרכזי של קרן השתלמות הוא הפטור ממס רווחי הון על הרווחים, בתנאי שמשיכת הכספים מתבצעת למטרות השתלמות או לאחר 6 שנים.',
          'ההפרשות לקרן השתלמות מחולקות בין העובד למעסיק, כאשר המעסיק מפריש עד 7.5% מהשכר והעובד מפריש 2.5%.',
          'הכספים מושקעים בשוק ההון במגוון מסלולי השקעה - סולידי, מאוזן או אגרסיבי.',
          'קרן השתלמות היא אחד הכלים המשתלמים ביותר לחיסכון בישראל בזכות הפטור ממס.'
        ]
      },
      'קופת גמל': {
        title: 'קופת גמל - כל מה שצריך לדעת',
        content: [
          'קופת גמל היא מסגרת חיסכון לטווח ארוך, שמאפשרת לחסוך בכסף תוך קבלת הטבות מס משמעותיות.',
          'קיימים שני סוגי קופות גמל: קופת גמל להשקעה (חיסכון כללי) וקופת גמל לקצבה (פנסיונית).',
          'קופת גמל להשקעה מאפשרת משיכת כספים בכל עת (בכפוף למיסוי), בעוד שקופת גמל לקצבה מיועדת לגיל פרישה.',
          'היתרון המרכזי הוא דחיית מס על הרווחים - אתם משלמים מס רק כשמושכים את הכסף.',
          'ניתן לבחור בין מגוון מסלולי השקעה המתאימים לרמת הסיכון שלכם.'
        ]
      },
      'חשבון מסחר': {
        title: 'איך פותחים חשבון מסחר ומתחילים לסחור',
        content: [
          'חשבון מסחר הוא החשבון שמאפשר לכם לקנות ולמכור ניירות ערך - מניות, אג"ח, תעודות סל ועוד.',
          'כדי לפתוח חשבון מסחר צריך לבחור בית השקעות או בנק שמציע שירותי מסחר.',
          'יש לבחור בין חשבון מסחר רגיל לבין חשבון מסחר בעו"ש (משולב עם חשבון עו"ש רגיל).',
          'חשוב לבדוק את עמלות המסחר - כמה גובים על כל עסקת קנייה או מכירה.',
          'אחרי פתיחת החשבון, צריך להעביר כספים לחשבון כדי להתחיל לסחור.'
        ]
      },
      'מסלולי השקעה': {
        title: 'מסלולי השקעה - איך בוחרים?',
        content: [
          'מסלולי השקעה הם האופן שבו הכסף שלכם מושקע בשוק ההון.',
          'מסלול סולידי - מתאים למי שמעוניין ביציבות ולא רוצה לקחת סיכונים. מושקע בעיקר באג"ח ממשלתיות.',
          'מסלול מאוזן - מתאים למי שמעוניין באיזון בין סיכון לתשואה. מושקע במניות ואג"ח.',
          'מסלול אגרסיבי - מתאים למי שמוכן לקחת סיכון גבוה בתמורה לפוטנציאל תשואה גבוה. מושקע בעיקר במניות.',
          'בחירת המסלול תלויה בגיל, מטרות החיסכון ומידת הסיכון שאתם מוכנים לקחת.'
        ]
      }
    };

    // Default content if topic not found
    return contents[topic] || {
      title: topic,
      content: [`תוכן על ${topic} יופיע כאן בקרוב...`]
    };
  };

  const currentContent = getContent(selectedTopic);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
{/* Header with Banner */}
<div className="relative mb-10 rounded-3xl overflow-hidden shadow-lg">
  <img 
    src="/learn.jpeg" 
    alt="המדריך למשקיע המתחיל" 
    className="w-full h-64 md:h-80 lg:h-96 object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent"></div>
  
  <div className="absolute top-2 md:top-4 lg:top-6 right-0 p-6 md:p-10 lg:p-14">
    <div className="max-w-xl text-right">
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-2 drop-shadow-lg">
        המדריך למשקיע המתחיל
      </h1>
      <p className="text-white/90 text-base md:text-lg lg:text-xl max-w-xl drop-shadow-lg mr-auto">
        כל מה שצריך לדעת כדי להתחיל להשקיע בצורה חכמה
      </p>
    </div>
  </div>
</div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar - Topics */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-4 sticky top-24">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">
                נושאים
              </h3>
              <div className="space-y-1">
                {topics.map((topic) => {
                  const Icon = topic.icon;
                  const isActive = selectedTopic === topic.label;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.label)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 text-right ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-200 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      title={topic.description}
                    >
                      <Icon size={16} className={isActive ? 'text-emerald-600' : 'text-gray-400'} />
                      <span className="flex-1">{topic.label}</span>
                      {isActive && <ChevronRight size={14} className="text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <BookOpen size={20} className="text-emerald-600" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900">
                  {currentContent.title}
                </h2>
              </div>
              
              <div className="space-y-4">
                {currentContent.content.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tips Box */}
              <div className="mt-8 p-5 bg-emerald-50 rounded-2xl border-2 border-emerald-100">
                <div className="flex items-start gap-3">
                  <Sparkles size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-emerald-700 mb-1">💡 טיפ חשוב</h4>
                    <p className="text-sm text-emerald-700/80">
                      ידע הוא הכוח החשוב ביותר בעולם ההשקעות. התחילו עם היסודות, בנו בסיס מוצק, ורק אז התקדמו לאסטרטגיות מתקדמות יותר.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}