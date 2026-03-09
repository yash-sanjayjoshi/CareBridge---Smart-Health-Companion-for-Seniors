import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import app, { auth } from '../services/firebase';

const db = getDatabase(app);

export default function AppLayout({ navItems, children }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const nameRef = ref(db, `users/${user.uid}/name`);
    get(nameRef).then((snap) => {
      setUserName(snap.val() || user.email || 'User');
    }).catch(() => {
      setUserName(user.email || 'User');
    });
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-56 min-h-screen bg-white border-r border-slate-200 shadow-sm flex flex-col">
        <Link to={navItems[0]?.to || '/'} className="p-5 border-b border-slate-200">
          <h1 className="text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold">CareBridge</h1>
          <p className="text-sm text-slate-500">Health Companion</p>
        </Link>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition ${
                  isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 shadow-sm px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800 truncate">
            {userName ? `Hello, ${userName}` : <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold">CareBridge</span>}
          </h2>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-medium hover:bg-slate-300 transition text-sm"
          >
            Logout
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
