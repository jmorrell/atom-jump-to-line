'use babel';
// @flow

import {TextEditor} from 'atom';

function getVisibleEditors(): Array<atom$TextEditor> {
  return atom.workspace.getPanes()
    .map(pane => pane.getActiveItem())
    .filter(activeItem => activeItem instanceof TextEditor)
    .filter(Boolean);
}

export default getVisibleEditors;
