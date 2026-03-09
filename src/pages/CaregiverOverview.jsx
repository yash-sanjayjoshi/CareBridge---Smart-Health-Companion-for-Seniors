import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import app from '../services/firebase';
import AppLayout from '../components/AppLayout';
import { caregiverNavItems } from '../config/nav';

const db = getDatabase(app);

const cardClass = 'bg-white rounded-xl shadow-sm border border-slate-200 p-5';

export default function CaregiverOverview() {
  const [totalElders, setTotalElders] = useState(0);
  const [activeSOS, setActiveSOS] = useState(0);
  const [recentHealthCount, setRecentHealthCount] = useState(0);

  useEffect(() => {
    const eldersSet = new Set();
    const updateTotals = () => {
      setTotalElders(eldersSet.size);
    };

    const sosUnsub = onValue(ref(db, '/sosAlerts'), (snapshot) => {
      const root = snapshot.val() || {};
      let unhandled = 0;
      Object.entries(root).forEach(([userId, userAlerts]) => {
        eldersSet.add(userId);
        Object.values(userAlerts || {}).forEach((a) => {
          if (!a.handled) unhandled++;
        });
      });
      setActiveSOS(unhandled);
      updateTotals();
    });

    const healthUnsub = onValue(ref(db, '/healthLogs'), (snapshot) => {
      const root = snapshot.val() || {};
      let count = 0;
      const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
      Object.entries(root).forEach(([userId, userLogs]) => {
        eldersSet.add(userId);
        Object.values(userLogs || {}).forEach((l) => {
          if (l.createdAt && l.createdAt >= dayAgo) count++;
        });
      });
      setRecentHealthCount(count);
      updateTotals();
    });

    const medsUnsub = onValue(ref(db, '/medications'), (snapshot) => {
      const root = snapshot.val() || {};
      Object.keys(root).forEach((userId) => eldersSet.add(userId));
      updateTotals();
    });

    return () => {
      sosUnsub();
      healthUnsub();
      medsUnsub();
    };
  }, []);

  return (
    <AppLayout navItems={caregiverNavItems}>
      <h2 className="text-xl font-bold text-slate-900 mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className={cardClass}>
          <h3 className="text-base font-semibold text-slate-900 mb-2">Total Elders</h3>
          <p className="text-2xl font-semibold text-indigo-600">{totalElders}</p>
          <p className="text-sm text-slate-600 mt-1">Elders with activity</p>
        </div>
        <div className={cardClass}>
          <h3 className="text-base font-semibold text-slate-900 mb-2">Active SOS Alerts</h3>
          <p className="text-2xl font-semibold text-red-600">{activeSOS}</p>
          <p className="text-sm text-slate-600 mt-1">Need attention</p>
        </div>
        <div className={cardClass}>
          <h3 className="text-base font-semibold text-slate-900 mb-2">Recent Health Updates</h3>
          <p className="text-2xl font-semibold text-green-600">{recentHealthCount}</p>
          <p className="text-sm text-slate-600 mt-1">Last 24 hours</p>
        </div>
      </div>
    </AppLayout>
  );
}
