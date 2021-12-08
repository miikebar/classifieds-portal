import { AuthContainer } from '../container/AuthContainer';

export const AuthSignUpForm: React.FC = () => {
  const renderHeader = () => {
    return (
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold">
          Utwórz konto.
          <br />
          List jest i zawsze będzie darmowy
        </h2>
        <p>
          Listic to platforma z ogłoszeniami, na której możesz sprzedawać oraz
          wyszukiwać ogłoszenia z ofertami sprzedaży. Przeglądaj kategorię i
          oferty aby znaleźć coś dla siebie!
        </p>
      </div>
    );
  };

  return <AuthContainer header={renderHeader()} />;
};
