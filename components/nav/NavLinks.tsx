import React, { useContext } from "react";
import useTranslation from "../../hooks/useTranslation";
import ActiveLink from "./../ActiveLink";
import { AppContext } from "../../Context/AppContextProvider";

export const NavLinks = (props: any) => {
  const { user, setUser } = useContext(AppContext);

  const { t, locale } = useTranslation();

  return (
    <>
      <style jsx>{`
        .nav-link {
          text-decoration: none;
          font-size: 18px;
          padding-bottom: 5px;
          font-weight: 500;
        }
        .active {
          border-bottom: 3px solid #3c40c6;
          color: #3c40c6;
        }
        .nav-link:hover,
        .nav-link:active {
          border-bottom: 3px solid #3c40c6;
          color: #3c40c6;
        }
      `}</style>
      <ActiveLink activeClassName="active" href={`/${locale}/`}>
        <a className="nav-link mx-2">{t("navHome")}</a>
      </ActiveLink>
      <ActiveLink activeClassName="active" href={`/${locale}/about`}>
        <a className="nav-link mx-2">{t("navAbout")}</a>
      </ActiveLink>

      {!user?.id ? (
        <a className="nav-link mx-2" onClick={() => props.setLoginModal(true)}>
          {t("navSign")}
        </a>
      ) : (
        <>
          <a
            className="nav-link mx-2"
            onClick={async () => {
              const response = await fetch("/api/sessions", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
              });
              if (response.status === 204) setUser(undefined);
            }}
          >
            {t("navSignOut")}
          </a>
          <ActiveLink
            activeClassName="active"
            href={`/${locale}/profile/wishlist`}
          >
            <a className="nav-link mx-2">
              <i className="far fa-heart" aria-hidden="true"></i>
            </a>
          </ActiveLink>
        </>
      )}
    </>
  );
};
