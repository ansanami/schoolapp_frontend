import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';




const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const EventsPage = Loadable(lazy(() => import('pages/extra-pages/events-page'))); // Yeni etkinlikler sayfası
const BuyTicketPage = Loadable(lazy(() => import('pages/extra-pages/buy-ticket-page'))); // Yeni bilet satın alma sayfası
const TicketsPage = Loadable(lazy(() => import('pages/extra-pages/tickets'))); // Yeni biletlerim sayfası
const AppointmentPage = Loadable(lazy(() => import('pages/extra-pages/appointment-page'))); // Yeni randevu alma sayfası

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'events',
      element: <EventsPage /> // Yeni etkinlikler sayfası rotası
    },
    {
      path: 'buy-ticket',
      element: <BuyTicketPage /> // Yeni bilet satın alma sayfası rotası
    },
    {
      path: 'tickets',
      element: <TicketsPage /> // Yeni biletlerim sayfası rotası
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'appointment',
      element: <AppointmentPage />
    },
    {
      path: 'typography',
      element: <Typography />
    }
  ]
};

export default MainRoutes;
