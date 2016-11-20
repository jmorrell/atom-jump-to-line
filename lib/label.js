'use babel';
// @flow

import type {EditorLocation, Label} from './types';

function renderLabel(key: string): HTMLElement {
  const el = document.createElement('div');
  el.className = "jump-to-line-label";
  el.textContent = key;
  return el;
}

function createLabel(
  location: EditorLocation,
  key: string,
): Label {
  const view = renderLabel(key);
  const marker = location.editor.markBufferPosition(location.position);
  const decoration = location.editor.decorateMarker(marker, {
    type: 'overlay',
    position: 'tail',
    item: view,
  });

  return {decoration, location, key, view};
}

export default createLabel;
