import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import app, { auth } from '../services/firebase';

export default function RoleProtectedRoute({ requiredRole, children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setRole(null);
        setChecking(false);
        return;
      }

      setUser(currentUser);

      try {
        const db = getDatabase(app);
        const roleRef = ref(db, `users/${currentUser.uid}/role`);
        const snapshot = await get(roleRef);
        setRole(snapshot.val() ?? null);
      } catch {
        setRole(null);
      } finally {
        setChecking(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-700 text-lg">
        Checking your access…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

