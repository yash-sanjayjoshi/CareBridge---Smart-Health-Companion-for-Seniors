import {
  LayoutDashboard,
  Pill,
  Calendar,
  FileText,
  AlertCircle,
} from 'lucide-react';

export const elderNavItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/medications', label: 'Medications', icon: Pill },
  { to: '/appointments', label: 'Appointments', icon: Calendar },
  { to: '/health-logs', label: 'Health Logs', icon: FileText },
  { to: '/sos', label: 'SOS', icon: AlertCircle },
];

export const caregiverNavItems = [
  { to: '/caregiver-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/caregiver-sos', label: 'SOS Alerts', icon: AlertCircle },
  { to: '/caregiver-medications', label: 'Elder Medications', icon: Pill },
  { to: '/caregiver-health-logs', label: 'Health Logs', icon: FileText },
];
