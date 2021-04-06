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

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
`;

const HeaderRight = styled.div`
  display: flex;
`;

const LinkHeader = styled.p`
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  margin: 10px;
`;

function Header({ signOut, themeToggler, theme }: Props): JSX.Element {
  const [installPromptEvent, setInstallPromptEvent] = useState<any>();

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

  return (
    <UserStatusContext.Consumer>
      {(user) => (
        <HeaderContainer>
          <HeaderLeft>
            <Link to="/">
              <LinkStyled content="Home" />
            </Link>
            <LinkHeader onClick={themeToggler}>
              {theme === "light" ? "Dark mode" : "Light mode"}
            </LinkHeader>
          </HeaderLeft>

          <HeaderRight>
            {/* <Link to="/list">
              <LinkStyled>List</LinkStyled>
            </Link>

            <Link to="/profiles">
              <LinkStyled>Profiles</LinkStyled>
            </Link> */}

            {installPromptEvent && (
              <LinkHeader onClick={handleInstallPwa}>Install</LinkHeader>
            )}

            {console.log(user)}
            {user === "no user authenticated" ? (
              <Link to="/auth">
                <LinkStyled content="Sign in" />
              </Link>
            ) : (
              <LinkHeader onClick={signOut}>Sign out</LinkHeader>
            )}
          </HeaderRight>
        </HeaderContainer>
      )}
    </UserStatusContext.Consumer>
  );
}

export default Header;
