import React, {forwardRef} from 'react';
import Rive, {RiveRef} from "rive-react-native";
// @ts-ignore
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

type RiveComponentProps = Omit<React.ComponentProps<typeof Rive>, 'url' | 'resourceName'> & {
  source: any
}

// detects if it is a http or file url
const stringIsUrl = (uri: string) => {
  return uri.startsWith('http') || uri.startsWith('file');
}

export const RiveAnimation = forwardRef<RiveRef, RiveComponentProps>(
  (props, ref) => {

    const {source, ...riveProps} = props;
    const resolved = resolveAssetSource(source);

    const uriIsUrl = stringIsUrl(resolved.uri);

    return (
      <Rive
        ref={ref}
        {...riveProps}
        resourceName={!uriIsUrl ? resolved.uri : undefined}
        url={uriIsUrl ? resolved.uri : undefined}
      />
    );
  }
);
