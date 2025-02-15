import { createContext } from "react";
import { Editor } from "tldraw";

type TLDrawEditorContextType = {
  editor: Editor | null;
  step: number;
};

export const TLDrawEditorContext = createContext({} as TLDrawEditorContextType);
