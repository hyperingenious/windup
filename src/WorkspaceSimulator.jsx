import React from "react";
import useWorkSpaceMethods from "./useWorkSpaceMethods";

function WorkspaceSimulator({ custom_styles }) {
  const {
    state: { activeWorkspaceIndex, workspaceWallpaper, workspaces, showWaybar, workspaceMovement },
    methods: { changeActiveDesktop },
  } = useWorkSpaceMethods();

  const activeWorkspace = workspaces.find(
    (ws) => ws.workspace_index === activeWorkspaceIndex
  );

  return (
    <div
      className="w-full h-screen fixed top-0 bg-black"
      style={{
        backgroundImage: `url(${workspaceWallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative w-full h-full">
        {/* Waybar */}
        {showWaybar && (
          <div
            className="w-full bottom-1 flex justify-center items-center p-1 z-10 absolute"
            style={custom_styles?.waybar_container}
          >
            <div className="h-7 flex justify-between w-1/2 rounded-full">
              {activeWorkspace.application.application_opened ? (
                <div className="flex items-center gap-1 px-2 rounded-full bg-slate-500 text-white">
                  <img
                    src={activeWorkspace.application.application_icon}
                    className="w-4 h-4 rounded-full"
                    style={custom_styles?.waybar_application_logo}
                    alt={activeWorkspace.application.application_name}
                  />
                  <h1
                    className="text-sm font-thin"
                    style={custom_styles?.waybar_application_text}
                  >
                    {activeWorkspace.application.application_name}
                  </h1>
                </div>
              ) : null}

              <div
                className="flex items-center justify-between rounded-full gap-1 p-1 bg-slate-500 "
                style={custom_styles?.waybar_desktop_switch_container}
              >
                {Array.from({ length: workspaces.length }, (_, i) => i + 1).map(
                  (el) => (
                    <div key={el}
                      onClick={() => changeActiveDesktop(el)}
                      style={{
                        ...custom_styles?.waybar_desktop_switch_sub_containers,
                        background: `${
                          el === activeWorkspaceIndex
                            ? "white"
                            : "rgba(255, 255, 255, 0.31)"
                        }`,
                      }}
                      className="w-6 h-6 cursor-pointer rounded-full text-xs flex items-center justify-center"
                    >
                      <span
                        style={
                          custom_styles?.waybar_desktop_switch_sub_container_text
                        }
                      >
                        {" "}
                        {el}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
        <div className="absolute inset-0">
          {workspaces.map((ws,i) => (
            <div key={i}
              className="absolute inset-0 w-screen h-screen rounded-md  border"
              style={{
                background: '#000000c7',
                ...custom_styles?.workspaces_container,
                transform: `translate${workspaceMovement}(${
                  (ws.workspace_index - activeWorkspaceIndex) * 100
                }%)`,
                transition: "0.3s ease-in-out",
              }}
            >
              {ws.application.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkspaceSimulator;