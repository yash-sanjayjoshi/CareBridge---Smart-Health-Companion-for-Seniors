import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header */}
      <header className="bg-indigo-700 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            CareBridge
            <span className="block text-sm md:text-base font-normal text-indigo-100">
              Smart Health Companion for Seniors
            </span>
          </h1>
          <nav className="flex flex-wrap gap-3">
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold text-lg hover:bg-indigo-50 transition shadow"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-indigo-600 border-2 border-white text-white font-semibold text-lg hover:bg-indigo-500 transition"
            >
              Register
            </Link>
            <Link
              to="/caregiver-login"
              className="px-6 py-3 rounded-xl bg-indigo-500 border-2 border-white text-white font-semibold text-lg hover:bg-indigo-400 transition"
            >
              Caregiver Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            Your health and safety, made simple
          </h2>
          <p className="text-xl text-slate-700 leading-relaxed">
            CareBridge — Smart Health Companion for Seniors helps you manage medications, appointments, health logs, and send emergency alerts to your caregivers—all in one place, with large text and easy-to-use buttons.
          </p>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/medications"
            className="block p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-sm hover:border-indigo-400 hover:shadow-md transition text-center"
          >
            <div className="text-4xl mb-3" aria-hidden>
              💊
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Medication Reminder</h3>
            <p className="text-slate-600 text-base">Track and get reminders for your medicines.</p>
          </Link>

          <Link
            to="/appointments"
            className="block p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-sm hover:border-indigo-400 hover:shadow-md transition text-center"
          >
            <div className="text-4xl mb-3" aria-hidden>
              📅
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Doctor Appointments</h3>
            <p className="text-slate-600 text-base">Manage and view upcoming doctor visits.</p>
          </Link>

          <Link
            to="/sos"
            className="block p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-sm hover:border-red-400 hover:shadow-md transition text-center"
          >
            <div className="text-4xl mb-3" aria-hidden>
              🆘
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Emergency SOS</h3>
            <p className="text-slate-600 text-base">Send quick alerts to your caregivers.</p>
          </Link>

          <Link
            to="/health-logs"
            className="block p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-sm hover:border-indigo-400 hover:shadow-md transition text-center"
          >
            <div className="text-4xl mb-3" aria-hidden>
              📋
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Health Logs</h3>
            <p className="text-slate-600 text-base">Record blood pressure, sugar, and more.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}