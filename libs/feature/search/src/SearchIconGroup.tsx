interface SearchInputGroupProps {
  icon: React.ReactNode;
  title: string;
}

export const SearchIconGroup: React.FC<SearchInputGroupProps> = ({
  icon,
  title,
  children,
}) => {
  return (
    <div className="flex h-12 items-center md:flex-1">
      <div className="w-8 h-8 bg-gray-100 p-2 rounded-full text-amber-400 mr-3 grid place-items-center">
        {icon}
      </div>
      <div className="md:flex-1 flex flex-col">
        <label className="text-sm mb-1">{title}</label>
        {children}
      </div>
    </div>
  );
};
