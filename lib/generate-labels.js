'use babel';
// @flow

const defaultChars = 'zyxwvutsrqponmlkjihgfedcbaABCDEFGHIJKLMNOPQRSTUVWXYZ';
const defaultAltLabel = ';';

// generates `num` labels with the sequence of characters in `labelChars`
// centered around the `center` index. The idea is to keep labels close
// to the cursor single letters, with the labels farther away all being
// the `altLabel` character.
function getLabels(
  num: number,
  center: number,
  labelChars: string = defaultChars,
  altLabel: string = defaultAltLabel,
): Array<string> {
  // calculate the number of alt characters before the labelChars
  const half = Math.floor(labelChars.length / 2);
  const before = Math.max(center - half - 1, 0);
  return [
    // $FlowFixMe you can spread strings, but flow doesn't know this yet
    ...altLabel.repeat(before),
    // $FlowFixMe you can spread strings, but flow doesn't know this yet
    ...labelChars.slice(0, num),
    // $FlowFixMe you can spread strings, but flow doesn't know this yet
    ...altLabel.repeat(Math.max(num - before - labelChars.length, 0)),
  ];
}

export default getLabels;
