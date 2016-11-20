'use babel';
// @flow

import {CompositeDisposable, Range} from 'atom';
import {findIndex, flatten, groupBy, sortedIndex, zip} from 'underscore-plus';
import {getCurrentCursorPosition, setCursorPosition} from './cursor-position';
import CaptureKeystrokeInput from './capture-keystroke';
import createLabel from './label';
import generateLabels from './generate-labels';
import getStartPositionsForVisibleLines from './get-positions-for-visible-lines';

import type {EditorLocation, Label, LabelSet} from './types';

const subscriptions = new CompositeDisposable();
const input = new CaptureKeystrokeInput();

function start(): void {
  const locations = getStartPositionsForVisibleLines();
  const cursor = getCurrentCursorPosition();
  const labels = Array.from(locations).map(
    location => createLabel(location, '')
  );

  chooseLabel({labels, cursor});
}

function chooseLabel(labelSet: LabelSet): void {
  updateLabelKeys(labelSet);

  input.captureKeystroke(key => {
    if (!key) {
      clear(labelSet.labels);
      setCursorPosition(labelSet.cursor);
      return;
    }

    selectLabel(key, labelSet);
  });
}

function updateLabelKeys(labelSet: LabelSet): void {
  const {cursor, labels} = labelSet;
  let index = 0;

  if (cursor) {
    index = labels.findIndex(({location}) => {
      const {editor, position} = location;
      return (editor === cursor.editor) && (position.row > cursor.position.row);
    });
  }

  const keys = generateLabels(labels.length, index).slice(0, labels.length);

  for (let [label, key] of zip(labels, keys)) {
    label.view.textContent = key;
    label.key = key;
  }
}

function selectLabel(key: string, {labels, cursor}: LabelSet): void {
  const {matched, unmatched} = groupBy(labels, label => (
    label.key === key ? 'matched' : 'unmatched'
  ));

  clear(unmatched);

  if (matched.length === 0) {
    // no labels were matched
    setCursorPosition(cursor);
  } else if (matched.length === 1) {
    // only one lable was matched, so we can jump to it
    setCursorPosition(matched[0].location);
    clear(matched);
  } else {
    // multiple labels were matched, so we have to repeat
    // the selection process
    chooseLabel({labels: matched, cursor});
  }
}

function clear(labels: Array<Label>): void {
  for (let label of labels) {
    label.decoration.destroy();
  }
}

const JumpToLine = {
  activate() {
    subscriptions.add(atom.commands.add('atom-text-editor', {
      'jump-to-line:start': start,
    }));
  },

  deactivate() {
    subscriptions.dispose();
    input.destroy();
  },
};

export default JumpToLine;
