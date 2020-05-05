import {
    Dashboard,
    Login,
    NotFound,
    ArticleList,
    ArticleEdit,
    Settings,
    Notifications,
    NoAuth,
    Profile
} from '../views'

export const mainRoutes = [{
    pathname: '/login',
    component: Login
},{
    pathname: '/404',
    component: NotFound
}]

export const adminRoutes = [{
    pathname: '/admin/dashboard',
    component: Dashboard,
    title: '仪表盘',
    icon: 'dashboard',
    isNav: true,
    roles: ['001', '002', '003']
},{
    pathname: '/admin/article',
    component: ArticleList,
    title: '文章管理',
    icon: 'unordered-list',
    isNav: true,
    exact: true,
    roles: ['001', '002']
},{
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    roles: ['001', '002', '003']
},{
    pathname: '/admin/settings',
    component: Settings,
    icon: 'setting',
    title: '设置',
    isNav: true,
    roles: ['001', '002', '003']
},{
    pathname: '/admin/notifications',
    component: Notifications,
    title: '通知中心',
    roles: ['001', '002', '003']
},{
    pathname: '/admin/noauth',
    component: NoAuth,
    title: '权限管理',
    roles: ['001', '002', '003']
},{
    pathname: '/admin/profile',
    component: Profile,
    title: '个人设置',
    roles: ['001', '002', '003']
}]
