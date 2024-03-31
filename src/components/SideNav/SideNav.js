import { Navigation } from "react-minimal-side-navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCalendarDays,
  faChartPie,
  faFile,
  faListCheck,
  faLocationDot,
  faMessage,
  faSquareParking,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./sideNav.css";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { useLocation, useNavigate } from "react-router-dom";
import oneTech from "../../assets/onetechb.png";

export const SideNav = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <React.Fragment className="sidenav">
      {/* Sidebar */}

      <div className="SideNav">
        <div className="image-pos">
          <img className="sideNav-image" src={oneTech} alt="oneTech" />
        </div>
        <div>
          {user.role === "CONSULTANT" ? (
            <Navigation
              activeItemId={location.pathname}
              onSelect={({ itemId }) => {
                navigate(itemId);
              }}
              items={[
                {
                  title: "Mission",
                  itemId: "/dash",

                  elemBefore: () => <FontAwesomeIcon icon={faListCheck} />,
                },
                {
                  title: "schedule",
                  itemId: "/schedule",
                  elemBefore: () => <FontAwesomeIcon icon={faCalendarDays} />,
                },
                {
                  title: "Contact",
                  itemId: "/contact",
                  elemBefore: () => <FontAwesomeIcon icon={faMessage} />,
                },
                {
                  title: "Profile",
                  itemId: "/profile",
                  elemBefore: () => <FontAwesomeIcon icon={faUser} />,
                },
              ]}
            />
          ) : user.role === "PROJECT_MANAGER" ? (
            <Navigation
              activeItemId={location.pathname}
              onSelect={({ itemId }) => {
                navigate(itemId);
              }}
              items={[
                {
                  title: "Projects",
                  itemId: "/dash",

                  elemBefore: () => <FontAwesomeIcon icon={faChartPie} />,
                },
                {
                  title: "Missions",
                  itemId: "/missions",
                  elemBefore: () => <FontAwesomeIcon icon={faCalendarDays} />,
                },
                {
                  title: "Consultants",
                  itemId: "/consultants",
                  elemBefore: () => <FontAwesomeIcon icon={faUsers} />,
                },
                {
                  title: "Contact",
                  itemId: "/contact",
                  elemBefore: () => <FontAwesomeIcon icon={faMessage} />,
                },
                {
                  title: "Profile",
                  itemId: "/profile",
                  elemBefore: () => <FontAwesomeIcon icon={faUser} />,
                },
              ]}
            />
          ) : (
            <Navigation
              activeItemId={location.pathname}
              onSelect={({ itemId }) => {
                navigate(itemId);
              }}
              items={[
                {
                  title: "Parking",
                  itemId: "/dash",

                  elemBefore: () => <FontAwesomeIcon icon={faSquareParking} />,
                },
                {
                  title: "Assignment",
                  itemId: "/assignment",
                  elemBefore: () => <FontAwesomeIcon icon={faFile} />,
                },
                {
                  title: "Tracking",
                  itemId: "/tracking",
                  elemBefore: () => <FontAwesomeIcon icon={faLocationDot} />,
                },
                {
                  title: "Profile",
                  itemId: "/profile",
                  elemBefore: () => <FontAwesomeIcon icon={faUser} />,
                },
              ]}
            />
          )}
        </div>

        <div className="bottom-sideNav">
          <Navigation
            activeItemId={location.pathname}
            items={[
              {
                title: "Logout",
                itemId: "/login",
                elemBefore: () => (
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                ),
              },
            ]}
            onSelect={({ itemId }) => {
              navigate(itemId);
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default SideNav;
