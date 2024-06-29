// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: '',
      type: 'item',
      url: '/sample-page',
      icon: icons.ChromeOutlined
    },
    {
      id: 'tickets',
      title: 'Biletlerim',
      type: 'item',
      url: '/tickets',
      icon: icons.ChromeOutlined
    },
    {
      id: 'tickets',
      title: 'Okul Etkinlikleri',
      type: 'item',
      url: '/events',
      icon: icons.ChromeOutlined
    },
    {
      id: 'Okul Duyuruları',
      title: 'Okul Duyuruları',
      type: 'item',
      url: '/typography',
      icon: icons.ChromeOutlined
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: '',
      icon: icons.QuestionOutlined,
      external: true,
      target: true
    }
  ]
};

export default support;
