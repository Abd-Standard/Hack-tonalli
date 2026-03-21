import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../i18n/translations';
import type { TranslationKey } from '../i18n/translations';

export function useT() {
  const { language } = useLanguageStore();
  return (key: TranslationKey): string => {
    return translations[language][key] ?? translations.es[key] ?? key;
  };
}
