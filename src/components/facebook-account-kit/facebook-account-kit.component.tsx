import * as React from 'react';

const { useState, useEffect, useCallback } = React;

interface initialFuncProps {
  appId: string;
  csrf: string;
  version: string;
  debug?: boolean;
  display?: 'popup' | 'modal';
  redirect?: string;
  language?: string;
}

interface OptionsType {
  loginType?: 'PHONE' | 'EMAIL';
  countryCode?: string;
  phoneNumber?: string;
  emailAddress?: string;
}

export interface ChildrenParams {
  disabled?: boolean;
  onClick(): void;
}

export interface FbAccountKitResType {
  code: string;
  state: string;
  status: 'PARTIALLY_AUTHENTICATED' | 'NOT_AUTHENTICATED' | 'BAD_PARAMS';
}

interface PropsType extends initialFuncProps, OptionsType {
  disabled?: boolean;
  validation?: () => boolean;
  children(params: ChildrenParams): React.ReactNode;
  onResponse(params: FbAccountKitResType): void;
}

const initializeAccountKit = (
  props: initialFuncProps,
  callback: () => void,
) => {
  (cb => {
    const tag = document.createElement('script');
    tag.setAttribute(
      'src',
      `https://sdk.accountkit.com/${props.language}/sdk.js`,
    );
    tag.setAttribute('id', 'account-kit');
    tag.setAttribute('type', 'text/javascript');
    tag.onload = cb;
    document.head.appendChild(tag);
  })(() => {
    (window as any).AccountKit_OnInteractive = () => {
      const { appId, csrf, version, debug, display, redirect } = props;
      (window as any).AccountKit.init({
        appId,
        state: csrf,
        version,
        debug,
        display,
        redirect,
        fbAppEventsEnabled: false,
      });
      callback();
    };
  });
};

const FacebookAccountKitComponent = ({
  appId,
  csrf,
  disabled = false,
  display = 'popup',
  children,
  version,
  language = 'ko_KR',
  onResponse,
  loginType = 'PHONE',
  debug = false,
  redirect,
  countryCode,
  phoneNumber,
  emailAddress,
  validation,
}: PropsType): any => {
  const [initialized, setInitialized] = useState(!!(window as any).AccountKit);

  const signIn = useCallback(() => {
    if (disabled) {
      return;
    }

    const options: OptionsType = {};

    if (countryCode) {
      options.countryCode = countryCode;
    } else {
      options.countryCode = undefined;
    }

    if (loginType === 'PHONE' && phoneNumber) {
      options.phoneNumber = phoneNumber;
    } else if (loginType === 'EMAIL' && emailAddress) {
      options.emailAddress = emailAddress;
    } else {
      options.loginType = 'PHONE';
      options.phoneNumber = '';
    }

    // eslint-disable-next-line max-len
    (window as any).AccountKit.login(
      loginType,
      options,
      (res: FbAccountKitResType) => onResponse(res),
    );
  }, [countryCode, disabled, emailAddress, loginType, onResponse, phoneNumber]);

  useEffect(() => {
    if (!initialized) {
      initializeAccountKit(
        {
          appId,
          csrf,
          version,
          debug,
          display,
          redirect,
          language,
        },
        () => setInitialized(true),
      );
    }
  }, []);

  return children({
    onClick: () => {
      if (validation) {
        if (validation()) {
          signIn();
        }
      } else {
        signIn();
      }
    },
    disabled,
  });
};

export default FacebookAccountKitComponent;
