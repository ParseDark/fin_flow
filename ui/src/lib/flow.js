export function sortedFlowSources(concepts, sample) {
  const inflowSource = sample.leaders?.length
    ? sample.leaders
    : concepts.filter((item) => item.mainFundDiff > 0);
  const outflowSource = sample.laggards?.length
    ? sample.laggards
    : concepts.filter((item) => item.mainFundDiff < 0);

  return {
    inflow: inflowSource
      .filter((item) => item.mainFundDiff > 0)
      .sort((a, b) => b.mainFundDiff - a.mainFundDiff),
    outflow: outflowSource
      .filter((item) => item.mainFundDiff < 0)
      .sort((a, b) => a.mainFundDiff - b.mainFundDiff),
  };
}

export function filteredFlowGroups(sample, filter = "limit10") {
  const concepts = sample.concepts?.length
    ? sample.concepts
    : [...(sample.leaders || []), ...(sample.laggards || [])];
  const sorted = sortedFlowSources(concepts, sample);

  if (filter === "top3") {
    return {
      inflow: sorted.inflow.slice(0, 3),
      outflow: sorted.outflow.slice(0, 3),
    };
  }

  if (filter === "bottom3") {
    return {
      inflow: sorted.inflow.slice(-3),
      outflow: sorted.outflow.slice(-3),
    };
  }

  if (filter === "inflow") {
    return { inflow: sorted.inflow.slice(0, 10), outflow: [] };
  }

  if (filter === "outflow") {
    return { inflow: [], outflow: sorted.outflow.slice(0, 10) };
  }

  return {
    inflow: sorted.inflow.slice(0, 10),
    outflow: sorted.outflow.slice(0, 10),
  };
}

export function concentrationMeta(sample, filter = "limit10") {
  const { inflow, outflow } = filteredFlowGroups(sample, filter);

  const inflowTop3Abs = inflow.slice(0, 3).reduce((sum, item) => sum + item.mainFundDiff, 0);
  const outflowTop3Abs = outflow.slice(0, 3).reduce((sum, item) => sum + Math.abs(item.mainFundDiff || 0), 0);
  const inflowTotal = inflow.reduce((sum, item) => sum + item.mainFundDiff, 0);
  const outflowTotal = outflow.reduce((sum, item) => sum + Math.abs(item.mainFundDiff || 0), 0);

  const inflowShare = inflowTotal > 0 ? inflowTop3Abs / inflowTotal : 0;
  const outflowShare = outflowTotal > 0 ? outflowTop3Abs / outflowTotal : 0;

  return {
    inflowTop3Abs,
    outflowTop3Abs,
    inflowShare,
    outflowShare,
    inflowLabel: concentrationLabel(inflowShare),
    outflowLabel: concentrationLabel(outflowShare),
  };
}

function concentrationLabel(share) {
  if (share > 0.45) return "高集中";
  if (share >= 0.3) return "中等集中";
  return "分散";
}

