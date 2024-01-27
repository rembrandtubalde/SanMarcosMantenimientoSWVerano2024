import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { logout } from '../../redux/state/authSlice';
import * as ProfileStyled from './Profile.styled';

const Profile = (props) => {
  const { image, name, email, isOpen, lastName } = props;
  const dispatch = useDispatch();

  const userInfoVariant = {
    closed: {
      opacity: 0,
      y: '-100%',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.1,
        staggerDirection: 'backward',
        staggerDelay: 0.1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.1,
        staggerDirection: 'backward',
        staggerDelay: 0.1,
      },
    }
  };

  const buttonVariant = {
    closed: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 0.5,
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 0.5,
      }
    }
  };

  return (
    <ProfileStyled.Wrapper>
      <ProfileStyled.Container>
        <ProfileStyled.Image>
          <img src={image} alt="profile" />
        </ProfileStyled.Image>
        {isOpen && (
          <>
            <ProfileStyled.Info
              initial="closed"
              animate="open"
              variants={userInfoVariant}
              className="profile__info"
            >
              <div className="profile__name">{name}</div>
              <div className="profile__lastName">{lastName}</div>
              <div className="profile__email">{email}</div>
            </ProfileStyled.Info>
            <ProfileStyled.Button
              initial="closed"
              animate="open"
              variants={buttonVariant}
              onClick={() => dispatch(logout())}
              className="profile__button"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </ProfileStyled.Button>
          </>
        )}
      </ProfileStyled.Container>
    </ProfileStyled.Wrapper>
  );
};

export default Profile;

Profile.propTypes = {
  name: PropTypes.string,
  lastName: PropTypes.string,
  size: PropTypes.string,
  image: PropTypes.string,
  email: PropTypes.string,
  isOpen: PropTypes.bool,
};


