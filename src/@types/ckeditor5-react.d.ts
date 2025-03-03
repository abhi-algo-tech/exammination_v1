declare module '@ckeditor/ckeditor5-react' {
  import { Component } from 'react';

  interface CKEditorProps {
    editor: any;
    data?: string;
    config?: Record<string, any>;
    disabled?: boolean;
    onReady?: (editor: any) => void;
    onChange?: (event: any, editor: any) => void;
    onBlur?: (event: any, editor: any) => void;
    onFocus?: (event: any, editor: any) => void;
  }

  export class CKEditor extends Component<CKEditorProps> {}
}
