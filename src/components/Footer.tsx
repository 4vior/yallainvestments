export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-white">
              יאללה <span className="text-gain">השקעות</span>
            </span>
            <p className="text-sm text-slate-500 mt-1">ניהול השקעות חכם למשקיע הישראלי</p>
          </div>
          <p className="text-sm text-slate-600">
            המידע באתר הוא למטרות הדגמה בלבד ואינו מהווה ייעוץ השקעות
          </p>
        </div>
      </div>
    </footer>
  );
}
