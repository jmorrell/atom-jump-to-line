'use babel';
// @flow

import {CompositeDisposable} from 'atom';
import getVisibleEditors from './get-visible-editors';

class CaptureKeystrokeInput {
  input: HTMLElement;
  panel: atom$Panel;
  el: HTMLElement;
  editorElement: atom$TextEditorElement;

  constructor() {
    this.panel = atom.workspace.addBottomPanel({
      visible: false,
      item: this.renderInput(),
    });
  }

  captureKeystroke(cb: (key: string|null) => void): void {
    const editor = this.editorElement.getModel();
    const subs = new CompositeDisposable();

    // returns null and clears all of the subscriptions
    const clear = () => {
      subs.dispose();
      cb(null);
    };

    // listen to any of the editors for a scroll event
    for (let e of getVisibleEditors()) {
      subs.add(atom.views.getView(e).onDidChangeScrollTop(clear));
    }

    // bail if they switch tabs via the keyboard
    subs.add(atom.workspace.onDidStopChangingActivePaneItem(clear));

    // if we leave the input, cancel the action
    subs.add(atom.commands.add(this.editorElement, {
      'core:cancel': clear,
      'blur': clear,
      'click': clear,
    }));

    // intercept inserting text, capture it, and return
    subs.add(editor.onWillInsertText(({text, cancel}) => {
      cancel();
      subs.dispose();
      cb(text);
    }));

    // start capturing
    this.panel.show();
    this.editorElement.focus();
  }

  renderInput(): HTMLElement {
    this.el = document.createElement('div');
    this.el.className = 'editor-container jump-to-line';

    this.editorElement = (document.createElement('atom-text-editor'): any);
    this.editorElement.className = 'editor jump-to-line-input';
    this.editorElement.setAttribute('mini', '');

    this.el.appendChild(this.editorElement);

    return this.el;
  }

  destroy(): void {
    this.panel.destroy();
    this.el.remove();
  }
}

export default CaptureKeystrokeInput;
