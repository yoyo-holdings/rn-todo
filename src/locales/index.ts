import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import { memoize } from 'lodash';
import { I18nManager } from 'react-native';

export const translationGetters = {
  id: () => require('./id.json'),
  en: () => require('./en.json'),
};

export const t = memoize(
  (key: i18n.Scope, config?: i18n.TranslateOptions) => i18n.t(key, config),
  (key: i18n.Scope, config?: i18n.TranslateOptions) =>
    config ? key + JSON.stringify(config) : key,
);

export const getDefaultLanguage = () => {
  const localize = RNLocalize.findBestAvailableLanguage(
    Object.keys(translationGetters),
  );
  return localize?.languageTag;
};

export const setI18nDefaultConfig = () => {
  const localize = RNLocalize.findBestAvailableLanguage(
    Object.keys(translationGetters),
  );
  t.cache.clear!();
  I18nManager.forceRTL(localize?.isRTL || false);
  i18n.translations = {
    [localize?.languageTag || 'id']:
      translationGetters[localize?.languageTag || 'id'](),
  };
  i18n.locale = localize?.languageTag || 'id';
};

export const setI18nConfig = (language: string, isRtl: boolean) => {
  const fallback = { languageTag: language, isRTL: isRtl };
  const { languageTag, isRTL } = fallback;
  t.cache.clear!();
  I18nManager.forceRTL(isRTL);
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};
