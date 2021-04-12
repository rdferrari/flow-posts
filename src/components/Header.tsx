import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserStatusContext } from "../App";
import styled from "styled-components";
import LinkStyled from "./LinkStyled";

interface Props {
  signOut(): void;
  themeToggler(): void;
  theme: string;
}

const HeaderBarContainer = styled.div`
  background-color: #272727;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const HeaderLeft = styled.div`
  display: flex;
  margin: 5px 10px;
`;

const HeaderRight = styled.div`
  display: flex;
  margin: 5px 10px;
`;

const MenuContainer = styled.div`
  background-color: #272727;
  color: #ebebeb;
  height: 100vh;
  left: 0;
  position: fixed;
  text-align: right;
  top: 0;
  width: 100%;
  z-index: 99;
`;

const TextContainer = styled.div`
  margin: 100px 20px;
`;

const LinkHeader = styled.p`
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  margin: 10px;
`;

function Header({ signOut, themeToggler, theme }: Props): JSX.Element {
  const [installPromptEvent, setInstallPromptEvent] = useState<any>();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const beforeInstallPromptHandler = (event: any) => {
      event.preventDefault();
      setInstallPromptEvent(event);
    };
    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler
      );
  }, []);

  const handleInstallPwa = () => {
    installPromptEvent.prompt();

    installPromptEvent.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
    });
  };

  const Menu = ({ user }: any) => {
    return (
      <MenuContainer>
        <TextContainer>
          <p>Showmenu</p>
          <Link to="/">
            <p onClick={() => setShowMenu(!showMenu)}>Home</p>
          </Link>
          <Link to="/posts">
            <p onClick={() => setShowMenu(!showMenu)}>Posts</p>
          </Link>
          {user === "no user authenticated" ? (
            <Link to="/auth">
              <p onClick={() => setShowMenu(!showMenu)}>Sign in</p>
            </Link>
          ) : (
            <p onClick={signOut}>Sign out</p>
          )}
          {installPromptEvent && <p onClick={handleInstallPwa}>Install</p>}
        </TextContainer>
      </MenuContainer>
    );
  };

  return (
    <UserStatusContext.Consumer>
      {(user) => (
        <>
          <HeaderBarContainer>
            <HeaderLeft>
              <Link to="/">
                <img alt="Flowception logo" src="/svg/logo.svg" />
              </Link>
            </HeaderLeft>

            <HeaderRight>
              {showMenu ? (
                <img
                  onClick={() => setShowMenu(!showMenu)}
                  alt="Menu hamburger"
                  src="/svg/close.svg"
                />
              ) : (
                <img
                  onClick={() => setShowMenu(!showMenu)}
                  alt="Menu hamburger"
                  src="/svg/menu.svg"
                />
              )}
            </HeaderRight>
          </HeaderBarContainer>
          {showMenu && <Menu user={user} />}
        </>
      )}
    </UserStatusContext.Consumer>
  );
}

export default Header;
