import { createContext } from "react";
import { Editor } from "tldraw";

type TLDrawEditorContextType = {
  editor: Editor | null;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const TLDrawEditorContext = createContext({} as TLDrawEditorContextType);
