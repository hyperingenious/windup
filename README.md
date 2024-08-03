# Introduction

react-workspace-simulator is reasonably customizable library for simulating workspace like functionality in Web, where it mimics it's some core functions like having multiple workspaces with multiple applications.

## Installation

For now on npm

```jsx
npm install react-workspace-simulator
```

## Step 1

First you got to import the component called `<WorkspaceSimulator/>` the component will occupy the entire space of the it's parent container, and that's it, you'll have fully running Workspace simulator.

## Overwrite Default styling

The `<WorkspaceSimulator/>` component accepts a prop called `custom_styles=` which requires a object that should contains all over to Write styles.
Format:

```js
{
    waybar_container:{}
    waybar_application_text:{},
    waybar_application_logo:{},
    waybar_desktop_switch_container:{},
    waybar_desktop_switch_sub_containers:{}
    waybar_desktop_switch_sub_container_text:{}

    workspaces_container:{}
}
```

## `useWorkSpaceMethods()`

`useWorkSpaceMethods()` hook returns an object containing `state` of workspaces and `methods` which are called to persuade the nature of workspace.

### state

1. `activeWorkspaceIndex`: It will return 3 if the third workspace is active among all.
 
2. `showWaybar`: Returns waybar's state, default's `true`.
 
3. `workspaceWallpaper`: Returns the link to the wallpaper.
 
4. `workspaces`: Returns entire data for current workspaces.
 
5. `workspaceMovement`: Default is set to `X` horizontal.

### methods

1. `toggleWaybar`: toggle `showWaybar` state.

2. `toggleWorkspaceMovement`: toggles `X` and `Y`, default is `X`.

3. `changeActiveDesktop`: Switch to other workspaces with passing `workspace_index`

4. `changeWorkspaceBackground`: Takes only url as parameter

5. `createNewDesktop`: creates new empty workspace

6. `createAppInCurrentDesktop`: Will Create a new Application in the current workspace, takes an object as argument.

```js
{
    component, // pass component to-be rendered as application
    application_name, // app name to display
    application_icon // pass an url to a icon 1:1 is preferred 
}
```

7. `killAppInDesktop`: selfExplaining

8. `killCurrentDesktop`: selfExplaining
