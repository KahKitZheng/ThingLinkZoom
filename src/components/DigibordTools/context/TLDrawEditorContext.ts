import { createContext } from "react";
import { Editor } from "tldraw";

export const TLDrawEditorContext = createContext({} as { editor: Editor });
