import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabParamList } from './tabRoutes';
import { TAB_ITEM_CONFIGS } from './tabItemConfigs';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#26282aff',
                tabBarInactiveTintColor: '#bfbfbfff',
            }}>
            {TAB_ITEM_CONFIGS.map((item) => (
                <Tab.Screen
                    key={item.name}
                    name={item.name as keyof TabParamList}
                    component={item.component}
                    options={{
                        tabBarLabel: item.title,
                        tabBarIcon: ({ color, size, focused }) => (
                            <Icon
                                name={(focused ? item.selectedIcon : item.icon) ?? item.icon}
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
}