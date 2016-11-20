'use babel';
// @flow

import {Range, Point} from 'atom';
import getVisibleEditors from './get-visible-editors';

import type {EditorLocation} from './types';

function getStartPositionForVisibleLines(
  editor: atom$TextEditor
): Array<atom$Point> {
  const range = editor.getVisibleRowRange();
  if (!range) {
    return [];
  }
  const [startRow, endRow] = range;

  const points = [];
  for(let row = startRow; row < endRow; row++) {
    const text = editor.lineTextForBufferRow(row);
    const col = text.search(/\S/);
    if (text.length) {
      points.push(new Point(row, col));
    }
  }

  return points;
}

function getStartPositionsForVisibleLines(): Set<EditorLocation> {
  const positions = new Set();
  for (let editor of getVisibleEditors()) {
    for (let position of getStartPositionForVisibleLines(editor)) {
      positions.add({editor, position});
    }
  }
  return positions;
}

export default getStartPositionsForVisibleLines;
