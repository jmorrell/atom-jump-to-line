'use babel';
// @flow

export type EditorLocation = {
  editor: atom$TextEditor,
  position: atom$Point,
};

export type Label = {
  decoration: atom$Decoration,
  location: EditorLocation,
  key: string,
  view: HTMLElement,
};

// it may seem odd to group the set of labels with the cursor
// position but you end up needing it most of the time
export type LabelSet = {
  labels: Array<Label>,
  cursor: ?EditorLocation,
};
