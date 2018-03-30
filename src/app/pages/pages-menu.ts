import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  /*{
    title: 'U Features',
    icon: 'nb-keypad',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Buttons',
        link: '/pages/ui-features/buttons',
      },
      {
        title: 'Grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Modals',
        link: '/pages/ui-features/modals',
      },
      {
        title: 'Popovers',
        link: '/pages/ui-features/popovers',
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields',
      },
      {
        title: 'Tabs',
        link: '/pages/ui-features/tabs',
      },
    ],
  },*/
  {
    title: 'Appointment',
    icon: 'nb-compose',
    link: '/pages/appointment/inputs'
    /*children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
    ],*/
  },
  {
    title: 'Query',
    icon: 'nb-email',
    link: '/pages/components/tree'
    /*children: [
      {
        title: 'Tree',
        link: '/pages/components/tree',
      }, {
        title: 'Notifications',
        link: '/pages/components/notifications',
      },
    ],*/
  },
  {
    title: 'Prescription',
    icon: 'nb-list',
    link: '/pages/editors/tinymce'
   /* children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
      },
      {
        title: 'Search Maps',
        link: '/pages/maps/searchmap',
      },
    ],*/
  },
  {
    title: 'Records',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Appointment History',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Statistics',
        link: '/pages/charts/chartjs',
      },
      /*{
        title: 'D3',
        link: '/pages/charts/d3',
      },*/
    ],
  },
  /*{
    title: 'Editors',
    icon: 'nb-title',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },*/
  {
    title: 'Gallery',
    icon: 'nb-tables',
    children: [
      {
        title: 'Dental Camps',
        link: '/pages/ui-features/buttons',
      },
      {
        title: 'Dental Article',
        link: '/pages/ui-features/grid',
      }
    ],
  },
  {
    title: 'Contact Us',
    icon: 'nb-phone',
    link: '/pages/ui-features/popovers',
  },
  {
    title: 'Our Dentist',
    icon: 'socicon-teamspeak',
    link: '/pages/ui-features/tabs',
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/login/patient',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
