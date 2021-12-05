import useTranslation from 'next-translate/useTranslation';

export const Logo: React.FC = () => {
  const { t } = useTranslation();
  return <span className="font-bold text-2xl">{t('common:app_name')}</span>;
};
