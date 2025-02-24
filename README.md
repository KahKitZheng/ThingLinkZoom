### Todo

**IAT**

- [] Add blink animation to see where the interactive spots are
- [x] Hovering over a spot feels a bit off. It doesn't responds immediately.
  - Fixed by updating the package
- [] The position of a spot needs to be relative of the image/container. Not the window.
- [x] Make sure that the preview are inside the container.
- [x] Make sure that the preview are rendered in full-screen.

**TLDraw**

- [ ] Layers are incorrect. TLDraw UI is on top of popup shaders.
- [x] Fix camera issues. Editor boundary should be the same as the IAT.
  - Should the navigation arrows be always visible? Even zoomed in?
- [x] Figure out how the translation table works
- [x] Customize the toolbar
- [x] Change default language to `nl`
- [ ] Create a custom tool
- [ ] Find a way to toggle the between interacting with the assignments and digibord tools
- [ ] Toggle digbibord UI on/off
- [ ] Keep selected tool when navigation between assignments
- [ ] Find out why custom tools isn't part of `onUIEvent`

### Notes

- You need to stop the event.propagation inside the custom shapes if you want it interactable. Otherwise it will also reach the editor shapes
- ~Zoom to element doesn't work consistently when React strictmode was enabled.~
