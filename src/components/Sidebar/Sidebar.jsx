import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faChartLine,
    faChartColumn,
    faWallet,
    faChartPie,
    faEnvelope,
    faSliders,
    faPhoneVolume,
    faAngleLeft,
    faAngleRight,
    faSun,
    faMoon
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';

const routes = [
    { title: 'Home', icon: faHouse, path: '/' },
    { title: 'Sales', icon: faChartLine, path: '/sales' },
    { title: 'Costs', icon: faChartColumn, path: '/costs' },
    { title: 'Payments', icon: faWallet, path: '/payments' },
    { title: 'Finances', icon: faChartPie, path: '/finances' },
    { title: 'Messages', icon: faEnvelope, path: '/messages' },
];

const bottomRoutes = [
    { title: 'Settings', icon: faSliders, path: '/settings' },
    { title: 'Support', icon: faPhoneVolume, path: '/support' },
];

const themeTokens = {
    light: {
        background: 'var(--color-sidebar-background-light-default)',
        hover: 'var(--color-sidebar-background-light-hover)',
        active: 'var(--color-sidebar-background-light-active)',
        text: 'var(--color-text-light-default)',
        textHover: 'var(--color-text-light-hover)',
        textActive: 'var(--color-text-light-active)',
        logo: 'var(--color-text-logo-light-default)',
    },
    dark: {
        background: 'var(--color-sidebar-background-dark-default)',
        hover: 'var(--color-sidebar-background-dark-hover)',
        active: 'var(--color-sidebar-background-dark-active)',
        text: 'var(--color-text-dark-default)',
        textHover: 'var(--color-text-dark-hover)',
        textActive: 'var(--color-text-dark-active)',
        logo: 'var(--color-text-logo-dark-default)',
    },
};

const SidebarWrapper = styled.div`
    display: flex;
`;

const SidebarContainer = styled.div`
    width: ${props => (props.opened ? '250px' : '70px')};
    transition: width 0.3s ease;
    background: ${props => themeTokens[props.color].background};
    height: 100vh;
    display: flex;
    flex-direction: column;
    color: ${props => themeTokens[props.color].text};
    position: relative;
    border-radius: 20px;
`;

const LogoSection = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem 1rem 0.5rem;

    img {
        width: 36px;
        height: 36px;
    }
    span {
        color: ${props => themeTokens[props.color].logo};
        font-weight: bold;
        margin-left: 10px;
        display: ${props => (props.opened ? 'inline' : 'none')};
    }
`;

const ToggleButton = styled.div`
    position: absolute;
    top: 1rem;
    right: -14px;
    background-color: ${props => themeTokens[props.color].background};
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 0 4px rgba(0,0,0,0.2);
    z-index: 10;
`;

const NavSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 1rem;
`;

const NavTop = styled(NavSection)`
    flex-grow: 1;
    margin-top: 0.25rem;
`;

const NavBottom = styled(NavSection)`
    margin-bottom: 1rem;
`;

const NavItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    background: ${props => props.active ? themeTokens[props.color].active : 'transparent'};
    color: ${props => props.active ? themeTokens[props.color].textActive : themeTokens[props.color].text};
    position: relative;

    &:hover {
        background: ${props => themeTokens[props.color].hover};
        color: ${props => themeTokens[props.color].textHover};
    }

    span {
        margin-left: 10px;
        display: ${props => (props.opened ? 'inline' : 'none')};
    }

    &:hover::after {
        content: ${props => (!props.opened ? `'${props.title}'` : 'none')};
        position: absolute;
        left: 100%;
        white-space: nowrap;
        background: ${props => themeTokens[props.color].hover};
        color: ${props => themeTokens[props.color].textHover};
        padding: 5px 10px;
        margin-left: 10px;
        border-radius: 6px;
        font-size: 14px;
        box-shadow: 0 0 5px rgba(0,0,0,0.15);
    }
`;

const ThemeSwitchButton = styled.div`
    margin-top: 0.5rem;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 6px;
    background-color: ${props => themeTokens[props.color].hover};
    color: ${props => themeTokens[props.color].textHover};
    display: flex;
    align-items: center;
    justify-content: ${props => (props.opened ? 'flex-start' : 'center')};

    svg {
        margin-right: ${props => (props.opened ? '10px' : '0')};
    }
    span {
        display: ${props => (props.opened ? 'inline' : 'none')};
    }
`;

const Sidebar = ({ color: initialColor }) => {
    const [isOpened, setIsOpened] = useState(true);
    const [activePath, setActivePath] = useState('/');
    const [color, setColor] = useState(initialColor);

    const toggleSidebar = () => setIsOpened(v => !v);
    const toggleTheme = () => setColor(color === 'light' ? 'dark' : 'light');
    const goToRoute = (path) => setActivePath(path);

    return (
        <SidebarWrapper>
            <SidebarContainer color={color} opened={isOpened}>
                <LogoSection opened={isOpened} color={color}>
                    <img src={logo} alt="Logo" />
                    <span>TensorFlow</span>
                </LogoSection>

                <ToggleButton onClick={toggleSidebar} color={color}>
                    <FontAwesomeIcon icon={isOpened ? faAngleLeft : faAngleRight} />
                </ToggleButton>

                <NavTop>
                    {routes.map(route => (
                        <NavItem
                            key={route.title}
                            onClick={() => goToRoute(route.path)}
                            active={activePath === route.path}
                            color={color}
                            opened={isOpened}
                            title={route.title}
                        >
                            <FontAwesomeIcon icon={route.icon} />
                            <span>{route.title}</span>
                        </NavItem>
                    ))}
                </NavTop>

                <NavBottom>
                    {bottomRoutes.map(route => (
                        <NavItem
                            key={route.title}
                            onClick={() => goToRoute(route.path)}
                            active={activePath === route.path}
                            color={color}
                            opened={isOpened}
                            title={route.title}
                        >
                            <FontAwesomeIcon icon={route.icon} />
                            <span>{route.title}</span>
                        </NavItem>
                    ))}
                    <ThemeSwitchButton color={color} opened={isOpened} onClick={toggleTheme}>
                        <FontAwesomeIcon icon={color === 'light' ? faMoon : faSun} />
                        <span>{color === 'light' ? 'Dark Theme' : 'Light Theme'}</span>
                    </ThemeSwitchButton>
                </NavBottom>
            </SidebarContainer>
        </SidebarWrapper>
    );
};

Sidebar.propTypes = {
    color: PropTypes.oneOf(['light', 'dark']).isRequired,
};

export default Sidebar;
