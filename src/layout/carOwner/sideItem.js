import { Icon } from '@iconify/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useResponsive } from '../../hooks/useResponsive';
// import { handleSideBar } from '../../store/slice/auth';
// import { clearChatUserDataAfterRedirect } from 'store/slice/carOwner/message';
// import { useResponsive } from 'themes/useResponsive';

export default function SideItem(props) {
  const { path, icon, title, active } = props;
  const dispatch = useDispatch();
  const { screenType } = useResponsive();
  return (
    <Link
      to={path}
      style={{ textDecoration: 'none' }}
      onClick={() => {
        // dispatch(handleSideBar(false));
        // dispatch(clearChatUserDataAfterRedirect());
      }}>
      <div
        className={`d-flex my-sm-2 my-lg-2 my-xl-3 py-1 px-4 ${screenType === 'MOBILE' ? 'mt-2' : ''} `}
        style={{
          backgroundImage: active ? ' linear-gradient(to right, #f1ae01, #ffbb51)' : '',
          borderRadius: 15,
          width: '100%'
        }}>
        <div
          style={{
            borderRadius: 15,
            height: 50,
            width: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: active ? '#fac86a' : 'transparent'
          }}>
          <Icon icon={icon} height={30} color={active ? 'white' : '#A1A8B6'} />
        </div>
        <div
          style={{
            color: active ? 'white' : '#A1A8B6',
            fontSize: '1.05rem',
            paddingLeft: '2rem',
            paddingTop: '0.25rem',
            fontFamily: 'Circular Std Medium',
            display: 'flex',
            alignItems: 'center'
          }}>
          {title}
        </div>
      </div>
    </Link>
  );
}
