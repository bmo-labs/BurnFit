import { TabRoute } from './tabRoutes';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import LibraryScreen from '../screens/LibraryScreen';
import MyPageScreen from '../screens/MyPageScreen';
import type { ComponentType } from 'react';

type TabItem = {
    name: keyof typeof TabRoute;
    title: string;
    icon: string;
    selectedIcon?: string;
    component: ComponentType<any>;
};

export const TAB_ITEM_CONFIGS: readonly TabItem[] = [
    {
        name: TabRoute.Home,
        title: 'HOME',
        icon: 'home-outline',
        selectedIcon: 'home',
        component: HomeScreen,
    },
    {
        name: TabRoute.Calendar,
        title: 'CALENDAR',
        icon: 'calendar-outline',
        selectedIcon: 'calendar',
        component: CalendarScreen,
    },
    {
        name: TabRoute.Library,
        title: 'LIBRARY',
        icon: 'barbell',
        component: LibraryScreen,
    },
    {
        name: TabRoute.MyPage,
        title: 'MY PAGE',
        icon: 'person-outline',
        selectedIcon: 'person',
        component: MyPageScreen,
    },
] as const;