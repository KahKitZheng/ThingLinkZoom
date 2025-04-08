import { createContext } from "react";
import { Editor } from "tldraw";

type TLDrawEditorContextType = {
  editor: Editor | null;
  step: number;
  isIdle: boolean;
  setCurrentTool: React.Dispatch<React.SetStateAction<string>>;
  activePopupId: string | undefined;
  setActivePopupId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const TLDrawEditorContext = createContext({} as TLDrawEditorContextType);
