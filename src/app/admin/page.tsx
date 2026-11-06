import { Admin } from '../../views/Admin';

export const metadata = {
  title: 'Panel Administrativo | Tierra Sagrada',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <Admin />;
}
