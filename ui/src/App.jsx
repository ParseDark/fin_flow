import { useEffect } from "react";
import { CSS_CONTENT } from "../../src/pages/css.js";
import { ChartPanel } from "./components/ChartPanel.jsx";
import { ConceptPanel } from "./components/ConceptPanel.jsx";
import { Controls } from "./components/Controls.jsx";
import { Hero } from "./components/Hero.jsx";
import { MetricGrid } from "./components/MetricGrid.jsx";
import { StockDrawer } from "./components/StockDrawer.jsx";
import { startLegacyController } from "./legacyController.js";
import { useFinanceSnapshot } from "./hooks/useFinanceSnapshot.js";
import { useStatusBridge } from "./hooks/useStatusBridge.js";

export default function App() {
  const status = useStatusBridge();
  const finance = useFinanceSnapshot();

  useEffect(() => {
    startLegacyController().catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <>
      <style>{CSS_CONTENT}</style>
      <main className="page">
        <Hero status={status} />
        <Controls />
        <MetricGrid data={finance.data} sample={finance.sample} loading={finance.loading} />
        <ChartPanel loading={finance.loading} />
        <ConceptPanel sample={finance.sample} loading={finance.loading} />
      </main>
      <StockDrawer />
    </>
  );
}
