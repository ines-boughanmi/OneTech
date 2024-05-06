import { Navigation } from "react-minimal-side-navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCalendarDays,
  faChartColumn,
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
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import { ToastContainer, toast } from "react-toastify";

export const SideNav = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const notify = () => {
    toast.success("Logged Out", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <React.Fragment>
      {/* Sidebar */}

      <div className="SideNav">
        <div className="image-pos">
          <img className="sideNav-image" src={oneTech} alt="oneTech" />
        </div>
        <div className="sidenav-options">
          {user.role === "CONSULTANT" ? (
            <Navigation
              activeItemId={location.pathname}
              onSelect={({ itemId }) => {
                navigate(itemId,{state : { user : user}});
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
                navigate(itemId,{state : { user : user}});
              }}
              items={[
                {
                  title: "Projects",
                  itemId: "/dash",

                  elemBefore: () => <FontAwesomeIcon icon={faChartPie} />,
                },
                {
                  title: "Consultants",
                  itemId: "/consultants",
                  elemBefore: () => <FontAwesomeIcon icon={faUsers} />,
                },
                {
                  title: "Analytics",
                  itemId: "/analytics",
                  elemBefore: () => <FontAwesomeIcon icon={faChartColumn} />,
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
                  title: "Assignments",
                  itemId: "/assignment",
                  elemBefore: () => <FontAwesomeIcon icon={faFile} />,
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
                itemId: "/",
                elemBefore: () => (
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                ),
              },
            ]}
            onSelect={({ itemId }) => {
              notify();
              setTimeout(() => {
                navigate(itemId);
              }, 750);

              localStorage.removeItem("token");
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default SideNav;
