import React, { useState, useEffect, useRef } from 'react';
import Login from './Login';
import SignUp from './SignUp';
export default function AuthModal(props: any) {
  const [newUserState, setNewUserState] = useState(true);
  //   handle the backdrop with useRed
  const node = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
  const handleClick = (e) => {
    if (node?.current?.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    props.setLoginModal(false);
  };
  return (
    <>
      <style jsx>
        {`
          .overlay {
            position: fixed;
            display: block;
            overflow: auto;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
            cursor: pointer;
          }

          .modal {
            margin: 15% auto;
            background-color: #f4f4f4;
            border-radius: 0.25rem;
            width: 50vw;
            padding: 0;
            position: relative;
          }
          .modal-body {
            padding: 2rem;
          }
          .log-btn {
            background-color: #fff;
            border: 1px solid #eee;
            box-shadow: 0px 2px 2px #ccc;
            color: #ccc;
            width: 100%;
            padding: 5px;
            margin: 0;
          }
          .log-btn:active,
          .log-btn.active {
            background-color: #192a56;
            color: #fff;
          }
        `}
      </style>
      <div className="overlay">
        <div className="modal" ref={node}>
          <div className="modal-buttons flex justify-items-stretch w-full">
            <button
              className={'log-btn ' + (newUserState ? null : 'active')}
              onClick={() => setNewUserState(false)}
            >
              Sign In
            </button>
            <button
              className={'log-btn ' + (newUserState ? 'active' : null)}
              onClick={() => setNewUserState(true)}
            >
              Register
            </button>
          </div>
          <div className="modal-header">
            <h3 className="pt-3 pb-5 text-center font-bold text-2xl text-blue-900">
              Sign Up to Store your Favorites
            </h3>
          </div>
          <div className="modal-body">
            {newUserState ? (
              <SignUp
                setLoginModal={props.setLoginModal}
                setAuthenticated={props.setAuthenticated}
              />
            ) : (
              <Login
                setLoginModal={props.setLoginModal}
                setAuthenticated={props.setAuthenticated}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
