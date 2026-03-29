import { useSearchParams } from "react-router-dom";

interface Tab {
  key: string;
  label: string;
}

interface TabNavProps {
  tabs: Tab[];
}

export default function TabNav({ tabs }: TabNavProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || tabs[0].key;

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="flex gap-1 overflow-x-auto border-b border-dark-700/50 pb-px scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSearchParams({ tab: tab.key })}
            className={`relative whitespace-nowrap px-4 py-3 text-xs font-medium tracking-wider uppercase transition-colors md:px-6 md:py-4 md:text-sm ${
              activeTab === tab.key
                ? "text-brand-400"
                : "text-dark-500 hover:text-dark-300"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <div className="absolute inset-x-0 -bottom-px h-[2px] bg-brand-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function useActiveTab(defaultTab: string) {
  const [searchParams] = useSearchParams();
  return searchParams.get("tab") || defaultTab;
}
