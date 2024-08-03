import { useState } from "react";

function useWorkSpaceMethods() {
  const [showWaybar, setShowWaybar] = useState(true);
  const [workspaceMovement, setWorkSpaceMovement] = useState("X");
  const [activeWorkspaceIndex, setActiveWorkspaceIndex] = useState(1);
  const [workspaceWallpaper, setWorkSpaceWallPaper] = useState(
    "https://images.pexels.com/photos/1215709/pexels-photo-1215709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  );
  const [workspaces, setWorkspaces] = useState([
    {
      workspace_index: 1,
      application: {
        application_opened: true,
        component: <h1 className="text-white">YourApplicationHere</h1>,
        application_name: "Vishnu Gupta",
        application_icon:
          "https://static-00.iconduck.com/assets.00/openai-icon-2021x2048-4rpe5x7n.png",
      },
    },
  ]);
  const lastWorkspaceIndex = workspaces[workspaces.length - 1].workspace_index;

  function toggleWaybar() {
    setShowWaybar((way) => !way);
  }

  function toggleWorkspaceMovement() {
    setWorkSpaceMovement((direction) => (direction === "X" ? "Y" : "X"));
  }

  function changeActiveDesktop(desktopIndex) {
    if (workspaces.some((el) => el.workspace_index === desktopIndex)) {
      setActiveWorkspaceIndex(desktopIndex);
    }
    return null;
  }

  function changeWorkspaceBackground(url) {
    if (typeof url !== "string") return;
    if (url.length < 10) return;
    setWorkSpaceWallPaper(url);
  }

  //Pass object like this
  function createNewDesktop() {
    const newWorkspaceIndex = lastWorkspaceIndex + 1;

    setWorkSpaceWallPaper((ws) => [
      ...ws,
      {
        workspaces_index: newWorkspaceIndex,
        application: {
          application_opened: false,
          component: null,
          application_name: null,
          application_icon: null,
        },
      },
    ]);
    setActiveWorkspaceIndex(newWorkspaceIndex);
  }

  function createAppInCurrentDesktop({
    component,
    application_name,
    application_icon,
  }) {
    if (!component || !application_name || !application_icon) return null;

    setWorkspaces((prevWS) =>
      prevWS.map((ws) =>
        ws.workspace_index === activeWorkspaceIndex
          ? {
              ...ws,
              application: {
                application_opened: true,
                component,
                application_name,
                application_icon,
              },
            }
          : ws
      )
    );

    const ws =
      workspaces[
        workspaces.findIndex(
          (el) => el.workspace_index === activeWorkspaceIndex
        )
      ];
  }

  function killAppInDesktop() {
    setWorkspaces((prevWS) =>
      prevWS.map((ws) =>
        ws.workspace_index === activeWorkspaceIndex
          ? {
              ...ws,
              application: {
                application_opened: false,
                component: null,
                application_name: null,
                application_icon: null,
              },
            }
          : ws
      )
    );
  }

  function killCurrentDesktop() {
    if (lastWorkspaceIndex === 1) return null;

    setWorkspaces((prevWS) =>
      prevWS.filter((el) => el.workspace_index !== activeWorkspaceIndex)
    );
    return;
  }

  return {
    state: {
      activeWorkspaceIndex,
      showWaybar,
      workspaceWallpaper,
      workspaces,
      workspaceMovement,
    },
    methods: {
      toggleWaybar,
      toggleWorkspaceMovement,
      changeActiveDesktop,
      changeWorkspaceBackground,
      createNewDesktop,
      createAppInCurrentDesktop,
      killAppInDesktop,
      killCurrentDesktop,
    },
  };
}
export default useWorkSpaceMethods;
/**
 * {
    waybar_container:{}
    waybar_application_text:{},
    waybar_application_logo:{},
    waybar_desktop_switch_container:{},
    waybar_desktop_switch_sub_containers:{}
    waybar_desktop_switch_sub_container_text:{}

    workspaces_container:{}
}
    */
