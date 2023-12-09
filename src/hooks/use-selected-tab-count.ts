import * as browser from "webextension-polyfill";
import { useState, useEffect } from "react";

import { TabService, WindowService } from "@services";

export default (): [selectedCount: number] => {
  const [selectedCount, setSelectedCount] = useState(1);

  const updateSelectedCount = () => {
    WindowService.getCurrentWindow()
      .then((win) => TabService.getSelectedTabs(win.id))
      .then((tabs) => setSelectedCount(tabs.length));
  };

  useEffect(() => {
    browser.tabs.onHighlighted.addListener(updateSelectedCount);

    updateSelectedCount();

    return () => {
      browser.tabs.onHighlighted.removeListener(updateSelectedCount);
    };
  }, []);

  return [selectedCount];
};
