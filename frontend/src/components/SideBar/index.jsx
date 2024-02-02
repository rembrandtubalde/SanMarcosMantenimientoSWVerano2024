import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

import * as Sidebar from './Sidebar.styled';
import { SubTitle } from '../../styled-components/Text';

import Profile from '../Profile';
import { BarItem } from './BarItem';
import { ToggleButton } from '../ToggleButton';

import useToggle from '../../hooks/useToggle';

import textLogo from '../../assets/logo/text-logo.png';

export const SideBar = ({ children }) => {
  const { newState, handleToggle } = useToggle(false);
  const { auth: { user } } = useSelector(state => state);

  const imageVariant = {
    closed: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: 'easeInOut',
        delay: 0.1,
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'easeInOut',
        delay: 0.1,
      }
    }
  };

  const darkModeVariant = {
    closed: {
      y: '200%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 0.3,
      }
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 0.3,
      }
    }
  };

  return (
    <div className="sidebar">
      <Sidebar.Wrapper
        animate={{ width: newState ? 400 : 113 }}
        transition={{ ease: 'easeInOut', duration: 0.2 }}
      >
        <Sidebar.Container>
          <div>
            <Sidebar.Logo>
              {newState && (
                <motion.img
                  initial="closed"
                  animate="open"
                  variants={imageVariant}
                  src={textLogo}
                  referrerPolicy="no-referrer"
                />
              )}
              <Sidebar.ToggleButton active={newState} onClick={handleToggle}>
                {newState
                  ? <i className="fa-solid fa-angles-left"></i>
                  : <i className="fa-solid fa-angles-right"></i>
                }
              </Sidebar.ToggleButton>
            </Sidebar.Logo>
            <BarItem
              route='/inicio/'
              icon='fa-solid fa-house'
              isOpen={newState}
              delay={0.3}
              label='Inicio'
            />
            <BarItem
              route='buscar'
              icon='fa-solid fa-magnifying-glass'
              isOpen={newState}
              delay={0.4}
              label='Buscar'
            />
            <BarItem
              route='mis-planes'
              icon='fa-regular fa-calendar'
              isOpen={newState}
              delay={0.5}
              label='Mis Planes'
            />
            <BarItem
              route='favoritos'
              icon='fa-regular fa-heart'
              isOpen={newState}
              delay={0.6}
              label='Favoritos'
            />
            <BarItem
              route='mi-perfil'
              icon='fa-regular fa-user'
              isOpen={newState}
              delay={0.7}
              label='Mi perfil'
            />

            <Sidebar.Divider />

            <Sidebar.ThemeButton>
              {newState && (
                <motion.div
                  initial="closed"
                  animate="open"
                  variants={darkModeVariant}
                >
                  <SubTitle
                    fontSize='16px'
                    opacity='0.7'
                  >
                    Modo Oscuro
                  </SubTitle>
                </motion.div>
              )}
              <ToggleButton />
            </Sidebar.ThemeButton>
          </div>
          <Profile
            size='small'
            image={user.avatar}
            name={user.name}
            email={user.email}
            isOpen={newState}
          />
        </Sidebar.Container>
      </Sidebar.Wrapper>
      <main>{children}</main>
    </div>
  );
};

SideBar.propTypes = {
  children: PropTypes.node,
};
