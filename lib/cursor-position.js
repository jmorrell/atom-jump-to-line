'use babel';
// @flow

import {last} from 'underscore-plus';

import type {EditorLocation} from './types';

function getCurrentCursorPosition(): ?EditorLocation {
  const editor = atom.workspace.getActiveTextEditor();
  if (!editor) {
    return null;
  }
  return {
    editor,
    position: editor.getCursorBufferPosition(),
  };
}

function setCursorPosition(location: ?EditorLocation) {
  if (!location) {
    return;
  }
  const {editor, position} = location;
  const pane = atom.workspace.paneForItem(editor);
  if (pane) {
    pane.activate();
  }

  const selections = editor.getSelections();
  if (selections.length === 1 && !last(selections).isEmpty()) {
    editor.selectToBufferPosition(position);
  } else {
    editor.setCursorBufferPosition(position);
  }
}

export {
  getCurrentCursorPosition,
  setCursorPosition,
};
