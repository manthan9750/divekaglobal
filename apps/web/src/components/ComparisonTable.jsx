import React from 'react';

const ComparisonTable = () => {
  const features = [
    {
      metric: 'Processing Method',
      sugar: 'Highly refined and bleached, stripping away molasses and natural minerals.',
      jaggery: 'Unrefined, boiled down naturally to retain pure molasses and essence.'
    },
    {
      metric: 'Nutritional Content',
      sugar: 'Empty calories. No significant minerals or vitamins retained.',
      jaggery: 'Retains natural iron, magnesium, potassium, and calcium.'
    },
    {
      metric: 'Energy Release',
      sugar: 'Causes rapid spikes and crashes in blood glucose levels.',
      jaggery: 'Digests slower, providing a more sustained and stable energy release.'
    },
    {
      metric: 'Taste Profile',
      sugar: 'One-dimensional intense sweetness.',
      jaggery: 'Complex, rich caramel notes with earthy undertones.'
    },
    {
      metric: 'Traditional Heritage',
      sugar: 'Industrial product introduced relatively recently to local diets.',
      jaggery: 'Used for millennia in Indian households as a staple culinary ingredient.'
    }
  ];

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-border shadow-sm">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-secondary">
            <th className="p-4 font-semibold text-foreground w-1/4 border-b border-border">Attribute</th>
            <th className="p-4 font-bold text-muted-foreground w-3/8 border-b border-l border-border bg-card">Refined White Sugar</th>
            <th className="p-4 font-bold text-primary w-3/8 border-b border-l border-border">Pure Jaggery (Gud)</th>
          </tr>
        </thead>
        <tbody className="bg-card">
          {features.map((feature, idx) => (
            <tr key={idx} className="hover:bg-secondary/30 transition-colors">
              <td className="p-4 font-medium text-foreground border-b border-border">
                {feature.metric}
              </td>
              <td className="p-4 text-sm text-muted-foreground border-b border-l border-border">
                {feature.sugar}
              </td>
              <td className="p-4 text-sm text-foreground/90 border-b border-l border-border bg-primary/5">
                {feature.jaggery}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
