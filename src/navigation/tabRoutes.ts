export enum TabRoute {
    Home = 'Home',
    Calendar = 'Calendar',
    Library = 'Library',
    MyPage = 'MyPage',
}

export type TabParamList = {
    [TabRoute.Home]: undefined;
    [TabRoute.Calendar]: undefined;
    [TabRoute.Library]: undefined;
    [TabRoute.MyPage]: undefined;
}